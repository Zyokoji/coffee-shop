// config/env.js: the ONLY file that reads process.env.
//
// Every setting the API needs comes through here. On your laptop the values
// come from .env. On Vercel they come from Project Settings, Environment Variables.
// Same code, different settings: that is the whole idea of an environment variable.

function read(name) {
  const value = process.env[name];
  if (value === undefined || value.trim() === "") return null;
  return value.trim();
}

// "http://localhost:5173, https://my-site.vercel.app/"
//   -> ["http://localhost:5173", "https://my-site.vercel.app"]
function originList(name, fallback) {
  const raw = read(name) ?? fallback;
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((origin) => {
      if (origin.endsWith("/")) {
        console.warn(`[config] ${name}: removed the slash at the end of "${origin}". Origins never end with a slash.`);
        return origin.replace(/\/+$/, "");
      }
      return origin;
    });
}

const supabaseUrl = read("SUPABASE_URL");
const supabaseSecretKey = read("SUPABASE_SECRET_KEY");

// Half a set of keys is almost always a typo, so stop and say which one is missing.
if (supabaseUrl && !supabaseSecretKey) {
  throw new Error("SUPABASE_URL is set but SUPABASE_SECRET_KEY is missing. Add both, or neither.");
}
if (supabaseSecretKey && !supabaseUrl) {
  throw new Error("SUPABASE_SECRET_KEY is set but SUPABASE_URL is missing. Add both, or neither.");
}

export const config = Object.freeze({
  supabaseUrl,
  supabaseSecretKey,
  // No Supabase keys? The API still works, using built-in sample drinks.
  useSupabase: Boolean(supabaseUrl && supabaseSecretKey),
  port: Number(read("PORT") ?? 3000),
  // Which websites may read our responses from a browser (CORS).
  corsOrigins: originList("CORS_ORIGINS", "http://localhost:5173"),
});
