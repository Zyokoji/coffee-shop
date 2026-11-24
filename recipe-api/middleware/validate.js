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

// A new drink needs a name, a category, and a price.
// Description, emoji, and customizable are optional.
export function validateDrink(req, res, next) {
  const { name, category, price, description = "", emoji = "☕", customizable = true } = req.body ?? {};

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "name is required" });
  }
  if (typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({ error: "category is required" });
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({ error: "price must be a number, 0 or more" });
  }
  if (typeof description !== "string") {
    return res.status(400).json({ error: "description must be text" });
  }
  if (typeof emoji !== "string") {
    return res.status(400).json({ error: "emoji must be text" });
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
