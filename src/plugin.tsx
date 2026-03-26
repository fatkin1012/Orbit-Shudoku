import React from "react";
import { createRoot, type Root } from "react-dom/client";
import type { IPlugin, IAppContext } from "@toolbox/sdk";
import { App } from "./App";
import styles from "./styles.css?inline";

const PLUGIN_ID = "plugin-sudoku";
const CONTAINER_ID = `plugin-${PLUGIN_ID}`;

let root: Root | null = null;
let hostContainer: HTMLElement | null = null;
let scopedContainer: HTMLElement | null = null;
let reactMountNode: HTMLDivElement | null = null;
let styleTag: HTMLStyleElement | null = null;
const cleanupFns: Array<() => void> = [];

function registerCleanup(cleanup: () => void): void {
  cleanupFns.push(cleanup);
}

const plugin: IPlugin = {
  id: PLUGIN_ID,
  name: "Sudoku Master",
  version: "1.0.0",
  mount(container: HTMLElement, context: IAppContext) {
    hostContainer = container;

    scopedContainer = document.createElement("div");
    scopedContainer.id = CONTAINER_ID;
    scopedContainer.style.minHeight = "100%";

    reactMountNode = document.createElement("div");
    reactMountNode.style.minHeight = "100%";

    styleTag = document.createElement("style");
    styleTag.setAttribute("data-plugin-style", PLUGIN_ID);
    styleTag.textContent = styles;
    scopedContainer.appendChild(styleTag);
    scopedContainer.appendChild(reactMountNode);

    container.appendChild(scopedContainer);

    root = createRoot(reactMountNode);
    root.render(<App context={context} registerCleanup={registerCleanup} />);
  },
  unmount() {
    cleanupFns.splice(0).forEach((cleanup) => {
      try {
        cleanup();
      } catch {
        // Ignore cleanup errors during teardown.
      }
    });

    if (root) {
      root.unmount();
      root = null;
    }

    if (scopedContainer) {
      scopedContainer.innerHTML = "";
      scopedContainer.remove();
      scopedContainer = null;
    }

    reactMountNode = null;

    if (hostContainer) {
      hostContainer.innerHTML = "";
      hostContainer = null;
    }

    styleTag = null;
  }
};

export default plugin;