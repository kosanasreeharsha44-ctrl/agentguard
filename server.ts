import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { executeAgentWorkflow, runHistory } from "./server/agentRunner";
import { calculateTool, webSearchTool } from "./server/tools";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      runtime: "online",
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Real-time Agent SSE Execution Stream
  app.post("/api/agent/run", async (req, res) => {
    const { goal, forceFailAttempt1, dataSource } = req.body || {};

    if (!goal || typeof goal !== "string") {
      res.status(400).json({ error: "Goal statement is required" });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    await executeAgentWorkflow(res, {
      goal,
      forceFailAttempt1: Boolean(forceFailAttempt1),
      dataSource: dataSource || "auto",
    });
  });

  // Recent Run History
  app.get("/api/agent/history", (_req, res) => {
    res.json({ runs: runHistory });
  });

  // Direct tool endpoints for interactive testing
  app.post("/api/tools/calculate", (req, res) => {
    const { expression, intentionalFlaw } = req.body || {};
    const result = calculateTool(expression || "2450 - (2450 * 0.17)", Boolean(intentionalFlaw));
    res.json(result);
  });

  app.post("/api/tools/websearch", async (req, res) => {
    const { query } = req.body || {};
    if (!query) {
      res.status(400).json({ error: "Query is required" });
      return;
    }
    const result = await webSearchTool(query);
    res.json(result);
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AgentGuard runtime running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
