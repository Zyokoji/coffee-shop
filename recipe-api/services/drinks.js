// services/drinks.js: picks which cook the routes talk to.
//
// Supabase keys set?  -> drinks-supabase.js (your real table)
// No keys?            -> drinks-sample.js   (6 built-in drinks)
//
// The routes import from THIS file, so they never change either way.
// That is Tuesday's route/service split paying off.

import { config } from "../config/env.js";
import * as fromSupabase from "./drinks-supabase.js";
import * as fromSample from "./drinks-sample.js";

const source = config.useSupabase ? fromSupabase : fromSample;

export const { listDrinks, getDrink, createDrink, updateDrink, deleteDrink } = source;
