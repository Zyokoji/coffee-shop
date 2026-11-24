COFFEE SHOP WEBSITE (recipe-web)

Run on your laptop:   npm install, then npm run dev, then open http://localhost:5173
                      (the API must be running too: npm run dev in recipe-api)
Log in to see the menu.

What you can do
  - see the drinks from the API
  - add, edit, and remove drinks (the form on the right; Edit and Remove on each card)
  - customize a drink (size, milk, sweetness, extras) and add it to the order cart

Components (src/components)
  DrinkList.jsx        the drink cards, with Edit, Remove, and Add to order buttons
  AddDrinkForm.jsx     the add/edit form, with character counters and limits
  DrinkCustomizer.jsx  the size / milk / sweetness / extras popup
  OrderCart.jsx        the order with quantities and the total (browser only, not saved)
  ConnectionPanel.jsx  shows whether the API is reachable
  Problem.jsx          step-by-step help when the API can't be reached

Where does the site find the API and Supabase?
  src/api.js reads import.meta.env.VITE_API_URL
  src/supabase.js reads VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (for login)
  npm run dev  -> .env.development
  Vercel       -> the recipe-web project's Environment Variables

VITE_ values are pasted into the JavaScript when Vite builds the site.
  1. They are public. Never put a secret in a VITE_ variable.
  2. Changing one on Vercel does nothing until you redeploy:  npx vercel --prod
