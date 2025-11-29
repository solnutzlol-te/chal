/**
 * Rsbuild Configuration for Node.js Server
 * 
 * This configuration builds the Node.js-compatible production server.
 * Use this instead of rsbuild.config.server.ts for Vercel deployment.
 */

import { defineConfig } from "@rsbuild/core";
import { resolve } from "path";

export default defineConfig({
  source: {
    entry: {
      server: "./src/server/app.node.ts",
    },
  },
  output: {
    target: "node",
    cleanDistPath: false,
    filename: {
      js: "[name].cjs",
    },
    legalComments: "none",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
