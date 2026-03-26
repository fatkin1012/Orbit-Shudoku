export type Difficulty = "easy" | "medium" | "hard";

type PuzzlePack = {
  puzzle: number[][];
  solution: number[][];
};

const SOLUTION: number[][] = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const EASY_PUZZLE: number[][] = [
  [5, 3, 0, 6, 0, 8, 9, 0, 2],
  [6, 0, 2, 0, 9, 0, 3, 4, 8],
  [0, 9, 8, 3, 0, 2, 0, 6, 7],
  [8, 5, 0, 7, 6, 1, 4, 0, 3],
  [4, 0, 6, 8, 5, 3, 7, 9, 0],
  [7, 1, 3, 0, 2, 4, 0, 5, 6],
  [9, 6, 0, 5, 3, 7, 2, 8, 4],
  [0, 8, 7, 4, 1, 9, 6, 0, 5],
  [3, 4, 5, 0, 8, 6, 1, 7, 0]
];

const MEDIUM_PUZZLE: number[][] = [
  [0, 3, 0, 6, 0, 8, 0, 0, 2],
  [6, 0, 2, 0, 0, 0, 3, 4, 0],
  [0, 9, 0, 3, 0, 2, 0, 0, 7],
  [8, 5, 0, 0, 6, 1, 0, 0, 3],
  [0, 0, 6, 8, 0, 3, 7, 0, 0],
  [7, 0, 3, 0, 2, 0, 0, 5, 6],
  [9, 0, 0, 5, 0, 7, 0, 8, 0],
  [0, 8, 7, 0, 1, 0, 6, 0, 5],
  [3, 0, 0, 0, 8, 6, 0, 7, 0]
];

const HARD_PUZZLE: number[][] = [
  [0, 0, 0, 6, 0, 0, 0, 0, 2],
  [0, 0, 2, 0, 0, 0, 3, 0, 0],
  [1, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 7, 6, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 9, 0],
  [0, 1, 0, 0, 2, 4, 0, 0, 0],
  [0, 0, 0, 5, 0, 0, 0, 0, 4],
  [0, 0, 7, 0, 0, 0, 6, 0, 0],
  [3, 0, 0, 0, 0, 6, 0, 0, 0]
];

export const PUZZLES: Record<Difficulty, PuzzlePack> = {
  easy: { puzzle: EASY_PUZZLE, solution: SOLUTION },
  medium: { puzzle: MEDIUM_PUZZLE, solution: SOLUTION },
  hard: { puzzle: HARD_PUZZLE, solution: SOLUTION }
};

export function cloneBoard(board: number[][]): number[][] {
  return board.map((row) => [...row]);
}