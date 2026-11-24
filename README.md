CSC 436 GOING LIVE STARTER
Deploy the API, then connect the frontend

Two folders, two separate projects:

  recipe-api   The Recipe Box API (Express). It is ready to deploy to Vercel.
  recipe-web   A small React site (Vite) that shows recipes from the API.

You do not need to change any code today. Every step is a command or a setting.

NEED: Node 22 or newer (check with: node -v)


FIRST TIME SETUP (two terminals)

  Terminal 1:
    cd recipe-api
    npm install
    npm run dev
    -> Galley open at http://localhost:3000
    -> open http://localhost:3000/api/health in your browser

  Terminal 2:
    cd recipe-web
    npm install
    npm run dev
    -> open http://localhost:5173

No Supabase keys? That is fine. The API uses 8 sample recipes.
Want your own data? See recipe-api/.env.example.


DEPLOY (the short version, full steps are in the slides and the code-along guide)

  npx vercel login                 once per computer

  cd recipe-api
  npx vercel --prod --yes          first deploy of the API
  (Vercel: add SUPABASE_URL, SUPABASE_SECRET_KEY, CORS_ORIGINS)
  npx vercel --prod                redeploy so the settings apply

  cd ../recipe-web
  npx vercel --prod --yes          first deploy of the site
  (Vercel: add VITE_API_URL = your API address)
  npx vercel --prod                redeploy so Vite builds with it

  Then add the site's address to the API's CORS_ORIGINS and redeploy the API.

The same three moves every time: deploy, set an environment variable, redeploy.
