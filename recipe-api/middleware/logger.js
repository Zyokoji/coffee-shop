// middleware/logger.js: prints one line per request, like
//   GET /api/drinks -> 200 (12ms)
// It goes FIRST in app.js so it also sees the OPTIONS requests that cors() answers.

export function logger(req, res, next) {
  const started = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - started}ms)`);
  });
  next();
}
