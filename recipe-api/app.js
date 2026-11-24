// app.js: BUILDS the API and hands it over. It never calls listen().
//
// On your laptop, server.js imports this file and calls listen().
// On Vercel, Vercel imports this file itself (it looks for app.js with
// `export default app`) and sends each request to it. server.js never runs there.

import express from "express";
import cors from "cors";
import { config } from "./config/env.js";
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errors.js";
import drinksRouter from "./routes/drinks.js";

const app = express();

// 1. Log every request (first, so we also see the OPTIONS requests cors() answers).
app.use(logger);

// 2. CORS: the guest list of websites allowed to read our responses in a browser.
//    The list comes from the CORS_ORIGINS environment variable.
app.use(cors({ origin: config.corsOrigins }));

// 3. Turn JSON request bodies into req.body.
app.use(express.json());

// 4. Routes.
app.get("/", (req, res) => {
  res.json({ name: "Coffee Shop API", tryThese: ["/api/health", "/api/drinks"] });
});

// The health check. Open it first after EVERY deploy.
// It shows settings, never secrets.
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    // server.js leaves a note on the app before it calls listen().
    // No note means nobody ran server.js, which means we are on Vercel.
    runningOn: req.app.locals.startedBy === "server.js" ? "your laptop" : "vercel",
    database: config.useSupabase ? "supabase" : "sample drinks (no Supabase keys found)",
    corsOrigins: config.corsOrigins,
    time: new Date().toISOString(),
  });
});

app.use("/api/drinks", drinksRouter);

// 5. Nothing matched.
app.use(notFound);

// 6. Something threw.
app.use(errorHandler);

export default app;
