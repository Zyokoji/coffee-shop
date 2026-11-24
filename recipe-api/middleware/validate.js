// middleware/validate.js: bouncers that check a request before the route runs.

// /api/drinks/7 is fine. /api/drinks/two is not.
export function checkId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(404).json({ error: `No drink with id "${req.params.id}"` });
  }
  req.drinkId = id;
  next();
}

// Longest allowed values. The website's form uses the same numbers
// (recipe-web/src/components/AddDrinkForm.jsx), but THIS is the real guard:
// anyone can skip the website and call the API directly.
export const LIMITS = { name: 40, category: 30, description: 150, emoji: 4, price: 100 };

// Counts what a person sees: "☕" is 1, even though JavaScript's .length says 2 for some emoji.
const charCount = (text) => [...text].length;

// A new drink needs a name, a category, and a price.
// Description, emoji, and customizable are optional.
export function validateDrink(req, res, next) {
  const { name, category, price, description = "", emoji = "☕", customizable = true } = req.body ?? {};

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "name is required" });
  }
  if (charCount(name.trim()) > LIMITS.name) {
    return res.status(400).json({ error: `name can be at most ${LIMITS.name} characters` });
  }
  if (typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({ error: "category is required" });
  }
  if (charCount(category.trim()) > LIMITS.category) {
    return res.status(400).json({ error: `category can be at most ${LIMITS.category} characters` });
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price < 0 || price > LIMITS.price) {
    return res.status(400).json({ error: `price must be a number from 0 to ${LIMITS.price}` });
  }
  if (typeof description !== "string") {
    return res.status(400).json({ error: "description must be text" });
  }
  if (charCount(description.trim()) > LIMITS.description) {
    return res.status(400).json({ error: `description can be at most ${LIMITS.description} characters` });
  }
  if (typeof emoji !== "string") {
    return res.status(400).json({ error: "emoji must be text" });
  }
  if (charCount(emoji.trim()) > LIMITS.emoji) {
    return res.status(400).json({ error: `emoji can be at most ${LIMITS.emoji} characters` });
  }
  if (typeof customizable !== "boolean") {
    return res.status(400).json({ error: "customizable must be true or false" });
  }

  req.drink = {
    name: name.trim(),
    category: category.trim(),
    price: Math.round(price * 100) / 100, // keep it to cents
    description: description.trim(),
    emoji: emoji.trim() || "☕",
    customizable,
  };
  next();
}
