// src/api.js: the ONLY file that knows where the API lives.
//
// import.meta.env.VITE_API_URL comes from:
//   npm run dev  -> the .env.development file  (http://localhost:3000)
//   Vercel       -> the VITE_API_URL environment variable on the recipe-web project
//
// Vite pastes the value into the JavaScript when it BUILDS the site.
// Change it on Vercel? You must redeploy so Vite builds again.
// It is public: never put a secret in a VITE_ variable.

import { supabase } from "./supabase.js";

const raw = import.meta.env.VITE_API_URL;
export const API_URL = raw ? raw.trim().replace(/\/+$/, "") : null;

// One helper for every request, so every request fails the same readable way.
async function request(path, options = {}) {
  let response;

  // Attach the logged-in user's Supabase token (if any) so the API knows who is asking.
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  const headers = { ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    response = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    // fetch() only throws when the browser could not get a readable answer:
    // the server is off, the address is wrong, or CORS blocked it.
    const error = new Error("Could not reach the API");
    error.kind = "unreachable";
    throw error;
  }

  if (response.status === 204) return null;

  let body;
  try {
    body = await response.json();
  } catch {
    const error = new Error("The API address answered, but not with JSON");
    error.kind = "not-json";
    throw error;
  }

  if (!response.ok) {
    const error = new Error(body.error ?? `Request failed with status ${response.status}`);
    error.kind = "http";
    throw error;
  }
  return body;
}

export const getHealth = () => request("/api/health");

export const getDrinks = () => request("/api/drinks");

export const addDrink = (drink) =>
  request("/api/drinks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(drink),
  });

export const deleteDrink = (id) => request(`/api/drinks/${id}`, { method: "DELETE" });
