import React, { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import type { IAppContext, IDataEnvelope } from "@toolbox/sdk";
import { PUZZLES, cloneBoard, type Difficulty } from "./puzzles";

const STORAGE_KEY = "tasks";
const STORAGE_VERSION = "1.0.0";
const EVENT_TASK_COUNT_CHANGED = "TASK_COUNT_CHANGED";

const BoardSchema = z
  .array(z.array(z.number().int().min(0).max(9)).length(9))
  .length(9);

const TaskSchema = z.object({
  id: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  currentBoard: BoardSchema,
  bestTime: z.number().nonnegative().nullable(),
  elapsedTime: z.number().nonnegative(),
  createdAt: z.number().int().nonnegative(),
  updatedAt: z.number().int().nonnegative()
});

const TaskListSchema = z.array(TaskSchema);

type SudokuTask = z.infer<typeof TaskSchema>;

type RestoreResult = {
  tasks: SudokuTask[];
  source: string;
  extractedPath: string;
  preview: string;
};

type AppProps = {
  context: IAppContext;
  registerCleanup: (cleanup: () => void) => void;
};

function createTask(difficulty: Difficulty): SudokuTask {
  const now = Date.now();
  return {
    id: `save-${now}-${Math.random().toString(36).slice(2, 7)}`,
    difficulty,
    currentBoard: cloneBoard(PUZZLES[difficulty].puzzle),
    bestTime: null,
    elapsedTime: 0,
    createdAt: now,
    updatedAt: now
  };
}

function previewValue(value: unknown): string {
  try {
    return JSON.stringify(value).slice(0, 180);
  } catch {
    return String(value).slice(0, 180);
  }
}

function normalizeOff(candidate: unknown): () => void {
  if (typeof candidate === "function") {
    return candidate as () => void;
  }

  if (candidate && typeof candidate === "object") {
    const obj = candidate as { off?: () => void; cleanup?: () => void };
    if (typeof obj.off === "function") {
      return obj.off;
    }

    if (typeof obj.cleanup === "function") {
      return obj.cleanup;
    }
  }

  return () => {};
}

function tryParseJson(raw: unknown): unknown {
  if (typeof raw !== "string") {
    return raw;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function extractTaskCandidates(input: unknown, path: string): Array<{ value: unknown; path: string }> {
  const value = tryParseJson(input);
  const candidates: Array<{ value: unknown; path: string }> = [{ value, path }];

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const envelope = value as IDataEnvelope<unknown> & Record<string, unknown>;
    if ("data" in envelope) candidates.push({ value: envelope.data, path: `${path}.data` });
    if ("value" in envelope) candidates.push({ value: envelope.value, path: `${path}.value` });
    if ("payload" in envelope) candidates.push({ value: envelope.payload, path: `${path}.payload` });
    if ("tasks" in envelope) candidates.push({ value: envelope.tasks, path: `${path}.tasks` });
  }

  return candidates;
}

function parseRestoredTasks(raw: unknown): RestoreResult {
  const queue: Array<{ value: unknown; path: string }> = [{ value: raw, path: "raw" }];
  const visited = new Set<string>();
  const initialPreview = previewValue(raw);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      break;
    }

    const signature = `${current.path}:${previewValue(current.value)}`;
    if (visited.has(signature)) {
      continue;
    }

    visited.add(signature);

    const expanded = extractTaskCandidates(current.value, current.path);
    for (const candidate of expanded) {
      const candidateValue = tryParseJson(candidate.value);
      if (Array.isArray(candidateValue)) {
        const parsed = TaskListSchema.safeParse(candidateValue);
        if (parsed.success) {
          return {
            tasks: parsed.data,
            source: "validated-array",
            extractedPath: candidate.path,
            preview: initialPreview
          };
        }

        return {
          tasks: [],
          source: "invalid-array-downgrade",
          extractedPath: candidate.path,
          preview: initialPreview
        };
      }

      if (candidateValue && typeof candidateValue === "object") {
        queue.push({ value: candidateValue, path: candidate.path });
      }
    }
  }

  return {
    tasks: [],
    source: "not-array-downgrade",
    extractedPath: "none",
    preview: initialPreview
  };
}

function countFilledCells(board: number[][]): number {
  return board.reduce((sum, row) => sum + row.filter((value) => value !== 0).length, 0);
}

function getConflicts(board: number[][]): Set<string> {
  const conflicts = new Set<string>();

  const markGroup = (cells: Array<{ row: number; col: number; value: number }>) => {
    const byValue = new Map<number, Array<{ row: number; col: number }>>();
    for (const cell of cells) {
      if (cell.value === 0) continue;
      const list = byValue.get(cell.value) ?? [];
      list.push({ row: cell.row, col: cell.col });
      byValue.set(cell.value, list);
    }

    byValue.forEach((list) => {
      if (list.length > 1) {
        for (const item of list) {
          conflicts.add(`${item.row}-${item.col}`);
        }
      }
    });
  };

  for (let row = 0; row < 9; row += 1) {
    markGroup(board[row].map((value, col) => ({ row, col, value })));
  }

  for (let col = 0; col < 9; col += 1) {
    const group = [];
    for (let row = 0; row < 9; row += 1) {
      group.push({ row, col, value: board[row][col] });
    }
    markGroup(group);
  }

  for (let boxRow = 0; boxRow < 3; boxRow += 1) {
    for (let boxCol = 0; boxCol < 3; boxCol += 1) {
      const group = [];
      for (let r = 0; r < 3; r += 1) {
        for (let c = 0; c < 3; c += 1) {
          const row = boxRow * 3 + r;
          const col = boxCol * 3 + c;
          group.push({ row, col, value: board[row][col] });
        }
      }
      markGroup(group);
    }
  }

  return conflicts;
}

function boardsEqual(a: number[][], b: number[][]): boolean {
  return a.every((row, r) => row.every((value, c) => value === b[r][c]));
}

export function App({ context, registerCleanup }: AppProps): JSX.Element {
  const [tasks, setTasks] = useState<SudokuTask[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState("載入中...");
  const [errorCells, setErrorCells] = useState<Set<string>>(new Set());
  const firstPersistRef = useRef(true);

  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activeTaskId) ?? tasks[0] ?? null,
    [tasks, activeTaskId]
  );

  const board = activeTask?.currentBoard ?? cloneBoard(PUZZLES.easy.puzzle);
  const solution = activeTask ? PUZZLES[activeTask.difficulty].solution : PUZZLES.easy.solution;
  const fixedMask = useMemo(
    () => (activeTask ? PUZZLES[activeTask.difficulty].puzzle.map((row) => row.map((value) => value !== 0)) : []),
    [activeTask]
  );
  const solved = activeTask ? boardsEqual(board, solution) && getConflicts(board).size === 0 : false;

  useEffect(() => {
    const off = normalizeOff(
      context.eventBus.on(EVENT_TASK_COUNT_CHANGED, (payload) => {
        if (typeof payload === "number") {
          setMessage(`存檔數量已更新：${payload}`);
        }
      })
    );

    registerCleanup(off);
    return off;
  }, [context, registerCleanup]);

  useEffect(() => {
    let cancelled = false;

    const restore = async () => {
      try {
        console.info("[task-board] restore start");
        const restored = await context.storage.get<unknown>(STORAGE_KEY);
        const parsed = parseRestoredTasks(restored);
        console.info("[task-board] restore payload", {
          preview: parsed.preview,
          extractedPath: parsed.extractedPath
        });

        if (cancelled) {
          return;
        }

        if (parsed.tasks.length > 0) {
          setTasks(parsed.tasks);
          setActiveTaskId(parsed.tasks[0].id);
          setMessage("已還原上次進度");
        } else {
          const nextTask = createTask("easy");
          setTasks([nextTask]);
          setActiveTaskId(nextTask.id);
          setMessage("建立新的數獨局");
        }

        console.info("[task-board] restore success", {
          count: parsed.tasks.length,
          source: parsed.source
        });
      } catch (error) {
        console.error("[task-board] restore failed", error);
        if (!cancelled) {
          const fallback = createTask("easy");
          setTasks([fallback]);
          setActiveTaskId(fallback.id);
          setMessage("還原失敗，已建立新局");
        }
      } finally {
        if (!cancelled) {
          setHydrated(true);
        }
      }
    };

    void restore();

    return () => {
      cancelled = true;
    };
  }, [context]);

  useEffect(() => {
    context.eventBus.emit(EVENT_TASK_COUNT_CHANGED, tasks.length);
  }, [context, tasks.length]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (firstPersistRef.current) {
      firstPersistRef.current = false;
      return;
    }

    console.info("[task-board] save triggered", { count: tasks.length });

    const persist = async () => {
      try {
        const parsed = TaskListSchema.parse(tasks);
        await context.storage.save(STORAGE_KEY, parsed, STORAGE_VERSION);
      } catch (error) {
        console.error("[task-board] save failed", error);
      }
    };

    void persist();
  }, [context, hydrated, tasks]);

  useEffect(() => {
    if (!activeTask || solved) {
      return;
    }

    const timer = window.setInterval(() => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === activeTask.id
            ? {
                ...task,
                elapsedTime: task.elapsedTime + 1,
                updatedAt: Date.now()
              }
            : task
        )
      );
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [activeTask, solved]);

  useEffect(() => {
    if (!activeTask || !solved) {
      return;
    }

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== activeTask.id) {
          return task;
        }

        const bestTime = task.bestTime === null ? task.elapsedTime : Math.min(task.bestTime, task.elapsedTime);
        return {
          ...task,
          bestTime,
          updatedAt: Date.now()
        };
      })
    );
    setMessage("恭喜完成！已更新最佳時間");
  }, [activeTask, solved]);

  const updateBoardCell = (row: number, col: number, value: number) => {
    if (!activeTask || fixedMask[row]?.[col]) {
      return;
    }

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== activeTask.id) {
          return task;
        }

        const nextBoard = cloneBoard(task.currentBoard);
        nextBoard[row][col] = value;
        return {
          ...task,
          currentBoard: nextBoard,
          updatedAt: Date.now()
        };
      })
    );
  };

  const checkErrors = () => {
    const conflicts = getConflicts(board);
    setErrorCells(conflicts);
    if (conflicts.size === 0) {
      setMessage("目前沒有衝突，繼續加油！");
    } else {
      setMessage(`發現 ${conflicts.size} 個衝突格`);
    }
  };

  const giveHint = () => {
    if (!activeTask) {
      return;
    }

    for (let row = 0; row < 9; row += 1) {
      for (let col = 0; col < 9; col += 1) {
        if (board[row][col] === 0) {
          updateBoardCell(row, col, solution[row][col]);
          setMessage(`提示：已填入 R${row + 1}C${col + 1}`);
          setErrorCells(new Set());
          return;
        }
      }
    }

    setMessage("盤面已填滿");
  };

  const newGame = (difficulty: Difficulty) => {
    if (!activeTask) {
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === activeTask.id
          ? {
              ...task,
              difficulty,
              currentBoard: cloneBoard(PUZZLES[difficulty].puzzle),
              elapsedTime: 0,
              updatedAt: Date.now()
            }
          : task
      )
    );
    setErrorCells(new Set());
    setMessage(`已開始 ${difficulty} 新局`);
  };

  const addSaveSlot = () => {
    if (!activeTask) {
      return;
    }

    const next = createTask(activeTask.difficulty);
    setTasks((prev) => [next, ...prev]);
    setActiveTaskId(next.id);
    setErrorCells(new Set());
    setMessage("已新增一筆存檔");
  };

  return (
    <div className="sudoku-app" role="application" aria-label="Sudoku Master">
      <div className="app-shell">
        <header className="header">
          <h1>數獨 Sudoku</h1>
        </header>

        <main className="content">
          <section className="status-row" aria-live="polite">
            <div className="chip">難度：{activeTask?.difficulty ?? "easy"}</div>
            <div className="chip">已填格數：{countFilledCells(board)}/81</div>
            <div className="chip">目前時間：{activeTask?.elapsedTime ?? 0}s</div>
            <div className="chip">最佳時間：{activeTask?.bestTime ?? "--"}</div>
          </section>

          <section className="control-row">
            <button className="btn" type="button" onClick={checkErrors}>
              檢查錯誤
            </button>
            <button className="btn primary" type="button" onClick={giveHint}>
              提示
            </button>
            <button className="btn" type="button" onClick={addSaveSlot}>
              新增存檔
            </button>
            <select
              className="select"
              value={activeTask?.difficulty ?? "easy"}
              onChange={(event) => newGame(event.target.value as Difficulty)}
              aria-label="選擇難度"
            >
              <option value="easy">簡單</option>
              <option value="medium">普通</option>
              <option value="hard">困難</option>
            </select>
          </section>

          <section className="board" aria-label="9x9 數獨棋盤">
            {board.map((row, rowIndex) =>
              row.map((value, colIndex) => {
                const fixed = fixedMask[rowIndex]?.[colIndex] ?? false;
                const key = `${rowIndex}-${colIndex}`;
                const classes = [
                  "cell",
                  fixed ? "fixed" : "",
                  errorCells.has(key) ? "error" : "",
                  colIndex === 2 || colIndex === 5 ? "subgrid-right" : "",
                  rowIndex === 2 || rowIndex === 5 ? "subgrid-bottom" : ""
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <input
                    key={key}
                    className={classes}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    aria-label={`第 ${rowIndex + 1} 列第 ${colIndex + 1} 格`}
                    value={value === 0 ? "" : String(value)}
                    disabled={fixed}
                    onChange={(event) => {
                      const raw = event.target.value.replace(/[^1-9]/g, "");
                      updateBoardCell(rowIndex, colIndex, raw ? Number(raw) : 0);
                    }}
                  />
                );
              })
            )}
          </section>

          <div className={`message ${solved ? "ok" : ""}`}>{message}</div>

          <section className="saves" aria-label="存檔列表">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                className={`save-card ${task.id === activeTask?.id ? "active" : ""}`}
                onClick={() => {
                  setActiveTaskId(task.id);
                  setErrorCells(new Set());
                  setMessage("已切換存檔");
                }}
              >
                <span>{task.id}</span>
                <span>
                  {task.difficulty} / {task.elapsedTime}s
                </span>
              </button>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}