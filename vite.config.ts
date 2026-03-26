import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ jsxRuntime: "classic" })],
  resolve: {
    alias: {
      "@toolbox/sdk": "/sdk/index.ts"
    }
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "src/plugin.tsx",
      formats: ["es"],
      fileName: () => "plugin.js"
    },
    rollupOptions: {
      external: ["react", "react-dom/client", "@toolbox/sdk"],
      output: {
        inlineDynamicImports: true
      }
    }
  }
});