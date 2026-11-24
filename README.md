# Coffee Shop

A coffee shop menu with a React website and an Express API. Drinks are stored in Supabase, and both parts are deployed on Vercel.

- **Website:** https://recipe-web-puce.vercel.app
- **API:** https://recipe-api-bay.vercel.app/api/drinks

## Features

- **Menu from the database.** Drinks load from a Supabase `drinks` table through the API.
- **Full CRUD.** Logged-in users can add, view, edit and remove drinks.
- **Drink customizer.** Customizable drinks open a popup to pick size, milk, sweetness and extras. The price updates as you choose.
- **Order cart.** Add drinks, change quantities, and see the total. The cart is kept in the browser and isn't saved.
- **Input limits.** The API rejects values that are too long or a price that is too high. The form shows character counters and stops typing at each limit.

| Field       | Limit                 |
|-------------|-----------------------|
| Name        | 40 characters, required |
| Category    | 30 characters, required |
| Description | 150 characters        |
| Emoji       | 4 characters          |
| Price       | $0 to $100            |

## Project layout

Two folders, each its own project and its own Vercel deployment:

| Folder       | What it is |
|--------------|------------|
| `recipe-api` | The Express API. Talks to Supabase. See [recipe-api/README.md](recipe-api/README.md). |
| `recipe-web` | The React site (Vite). Talks to the API. See [recipe-web/README.md](recipe-web/README.md). |

## Run it on your computer

You need Node 22 or newer (check with `node -v`).

**1. Set up the database (once).** In the Supabase dashboard, open the SQL Editor, paste in [recipe-api/supabase/setup.sql](recipe-api/supabase/setup.sql), and click Run. It creates the `drinks` table with 6 drinks.

**2. Add your keys.** Copy `recipe-api/.env.example` to `recipe-api/.env` and fill in your Supabase URL and secret key. Without keys, the API uses 6 built-in sample drinks instead.

**3. Start both parts** in two terminals:

```
cd recipe-api
npm install
npm run dev        # API at http://localhost:3000
```

```
cd recipe-web
npm install
npm run dev        # website at http://localhost:5173
```

Open http://localhost:3000/api/health to check the API and http://localhost:5173 to use the site. Log in to see the menu.

## Deploy to Vercel

```
npx vercel login                 # once per computer

cd recipe-api
npx vercel --prod                # deploy the API

cd ../recipe-web
npx vercel --prod                # deploy the website
```

Environment variables to set in each Vercel project (Settings, Environment Variables):

| Project      | Variable                        | Value |
|--------------|---------------------------------|-------|
| `recipe-api` | `SUPABASE_URL`                  | Your Supabase project URL |
| `recipe-api` | `SUPABASE_SECRET_KEY`           | Your Supabase secret key (starts with `sb_secret_`) |
| `recipe-api` | `CORS_ORIGINS`                  | The website's address, e.g. `https://recipe-web-puce.vercel.app` |
| `recipe-web` | `VITE_API_URL`                  | The API's address, e.g. `https://recipe-api-bay.vercel.app` |
| `recipe-web` | `VITE_SUPABASE_URL`             | Your Supabase project URL |
| `recipe-web` | `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable key |

After changing a variable, redeploy that project with `npx vercel --prod` so the change takes effect.

Never commit `recipe-api/.env`. It holds the secret key, and `.gitignore` already keeps it out of git.
