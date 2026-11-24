// services/drinks-sample.js: the cook, using a plain array in memory.
// Same function names and same answers as the Supabase version,
// so the routes cannot tell the difference.
//
// Heads up: on Vercel this array starts fresh whenever Vercel starts a new copy
// of the API, so drinks you add here will not stick around. Supabase fixes that.

import { sampleDrinks } from "../data/sample-drinks.js";

let drinks = sampleDrinks.map((drink) => ({ ...drink }));
let nextId = drinks.length + 1;

export async function listDrinks() {
  return drinks;
}

export async function getDrink(id) {
  return drinks.find((drink) => drink.id === id) ?? null;
}

export async function createDrink(drink) {
  const saved = { id: nextId++, ...drink };
  drinks.push(saved);
  return saved;
}

export async function deleteDrink(id) {
  const before = drinks.length;
  drinks = drinks.filter((drink) => drink.id !== id);
  return drinks.length < before;
}
