import plugin from "./plugin";
import type { IAppContext } from "@toolbox/sdk";

type Handler = (payload?: unknown) => void;

class LocalEventBus {
  private buckets = new Map<string, Set<Handler>>();

  emit(event: string, payload?: unknown): void {
    const handlers = this.buckets.get(event);
    handlers?.forEach((handler) => handler(payload));
  }

  on(event: string, handler: Handler): () => void {
    const handlers = this.buckets.get(event) ?? new Set<Handler>();
    handlers.add(handler);
    this.buckets.set(event, handlers);

    return () => {
      handlers.delete(handler);
    };
  }
}

const STORAGE_KEY = "plugin-sudoku:tasks";

const devContext: IAppContext = {
  storage: {
    async get() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }

      return raw;
    },
    async save(_key, data, version) {
      const envelope = {
        version,
        data
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
    }
  },
  eventBus: new LocalEventBus()
};

const mountNode = document.getElementById("dev-root");

if (!mountNode) {
  throw new Error("Cannot find #dev-root for development mode.");
}

plugin.mount(mountNode, devContext);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    plugin.unmount();
  });
}