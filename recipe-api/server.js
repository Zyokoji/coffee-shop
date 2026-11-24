// server.js: STARTS the API on your laptop. The only file that calls listen().
// Run it with: npm run dev
//
// Vercel never runs this file. It imports app.js directly.

import app from "./app.js";
import { config } from "./config/env.js";

// Leave a note so /api/health can tell your laptop apart from Vercel.
app.locals.startedBy = "server.js";

app.listen(config.port, (error) => {
  // Express 5 hands startup errors (like a busy port) to this callback.
  if (error) {
    console.error(`Could not start on port ${config.port}: ${error.code ?? error.message}`);
    console.error("Is another server already running? Find that terminal and press Ctrl + C.");
    process.exit(1);
  }
  console.log(`Coffee Shop API open at http://localhost:${config.port}`);
  console.log(`Database: ${config.useSupabase ? "supabase" : "sample drinks (no Supabase keys found)"}`);
  console.log(`CORS allows: ${config.corsOrigins.join(", ")}`);
});
