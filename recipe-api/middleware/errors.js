// middleware/errors.js: the last two stops in app.js.

// Nothing matched the URL.
export function notFound(req, res) {
  res.status(404).json({ error: `Nothing at ${req.method} ${req.originalUrl}` });
}

// Something threw: a database error, a bug, or bad JSON in the request body.
// Express knows this is an error handler because it has FOUR parameters.
export function errorHandler(err, req, res, next) {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "The request body is not valid JSON" });
  }
  console.error("[error]", err.message ?? err);
  res.status(500).json({ error: "Something went wrong on the server. Check the logs." });
}
