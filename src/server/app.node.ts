/**
 * Node.js Production Server
 * 
 * This is the Node.js-compatible production server for Vercel deployment.
 * It replaces the Deno-specific app.prod.ts file.
 * 
 * Key features:
 * - Uses @hono/node-server instead of Deno.serve
 * - Serves static files from the web directory
 * - Handles SPA routing (returns index.html for non-API routes)
 * - Supports environment variable PORT configuration
 */

import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from "@hono/node-server";
import { setupRoutes } from "./routes";
import path from "path";

const app = new Hono();

// Paths that should be served as-is (not rewritten to /index.html)
const preservePaths = ["/static", "/favicon.svg", "/api"];

// Serve static files from the web directory
app.use(
  "*",
  serveStatic({
    root: path.join(process.cwd(), "web"),
    rewriteRequestPath(requestPath) {
      // If the path starts with a preserved path, serve it directly
      if (preservePaths.some((p) => requestPath.startsWith(p))) {
        return requestPath;
      }
      // For all other paths (SPA routing), return index.html
      return "/index.html";
    },
  }),
);

// Setup API routes
setupRoutes(app);

// Start the Node.js server
const port = Number(process.env.PORT) || 3000;
console.log(`🚀 Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
