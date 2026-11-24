// services/drinks-supabase.js: the cook, using your real Supabase table.
// No req, no res, no status codes. Just "get me the data" and "save this".

import { supabase } from "../data/supabase.js";

const COLUMNS = "id, name, category, description, price, emoji, customizable, created_at";

export async function listDrinks() {
  const { data, error } = await supabase.from("drinks").select(COLUMNS).order("id");
  if (error) throw error;
  return data;
}

export async function getDrink(id) {
  const { data, error } = await supabase.from("drinks").select(COLUMNS).eq("id", id).maybeSingle();
  if (error) throw error;
  return data; // null when there is no drink with that id
}

export async function createDrink(drink) {
  const { data, error } = await supabase.from("drinks").insert(drink).select(COLUMNS).single();
  if (error) throw error;
  return data;
}

export async function deleteDrink(id) {
  const { data, error } = await supabase.from("drinks").delete().eq("id", id).select("id");
  if (error) throw error;
  return data.length > 0; // true if something was deleted
}
