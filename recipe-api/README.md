COFFEE SHOP API

Run on your laptop:   npm install, then npm run dev
Health check:         http://localhost:3000/api/health

Database (once): Supabase dashboard, SQL Editor, New query, paste supabase/setup.sql, Run.

Endpoints
  GET    /api/drinks       the menu
  GET    /api/drinks/3     one drink
  POST   /api/drinks       add a drink      (login needed)
  DELETE /api/drinks/3     remove a drink   (login needed)

Files
  app.js              builds the API and does `export default app` (Vercel uses this)
  server.js           calls listen() on your laptop (Vercel never runs it)
  config/env.js       the only file that reads process.env
  routes/             req, res, status codes
  services/           the data (Supabase if keys are set, sample drinks if not)
  middleware/         logger, validation, errors, login check
  supabase/setup.sql  creates the drinks table with the 6 menu drinks
  .vercelignore       keeps .env on your laptop when you deploy

Environment variables (set them in Vercel: your project, Settings, Environment Variables)
  SUPABASE_URL          optional, your Supabase project URL          (type: Config)
  SUPABASE_SECRET_KEY   optional, starts with sb_secret_             (type: Secret)
  CORS_ORIGINS          websites allowed to call the API, comma separated, no slash at the end
                        example: http://localhost:5173,https://recipe-web-yourname.vercel.app

After changing any of them on Vercel, redeploy:  npx vercel --prod
