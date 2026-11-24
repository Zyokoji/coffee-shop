RECIPE-WEB

Run on your laptop:   npm install, then npm run dev, then open http://localhost:5173
                      (the API must be running too: npm run dev in recipe-api)

Where does the site find the API?
  src/api.js reads import.meta.env.VITE_API_URL
  npm run dev  -> .env.development  (http://localhost:3000)
  Vercel       -> VITE_API_URL in the recipe-web project's Environment Variables

VITE_ values are pasted into the JavaScript when Vite builds the site.
  1. They are public. Never put a secret in a VITE_ variable.
  2. Changing one on Vercel does nothing until you redeploy:  npx vercel --prod
