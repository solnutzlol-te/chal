import { Hono } from "hono";
import { createExampleRoute } from "./example";

export function setupRoutes(app: Hono) {
  const routes = new Hono().route("/example", createExampleRoute());

  const entry = app.route("/api", routes);

  return entry;
}

export type AppType = ReturnType<typeof setupRoutes>;
