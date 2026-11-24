// routes/drinks.js: the navigator. Owns req and res, picks status codes,
// and asks the service for data. It never talks to Supabase directly.

import { Router } from "express";
import { checkId, validateDrink } from "../middleware/validate.js";
import { listDrinks, getDrink, createDrink, deleteDrink } from "../services/drinks.js";
import { requireAuth } from "../middleware/require-auth.js";

const router = Router();

// GET /api/drinks
router.get("/", async (req, res) => {
  res.json(await listDrinks());
});

// GET /api/drinks/3
router.get("/:id", checkId, async (req, res) => {
  const drink = await getDrink(req.drinkId);
  if (!drink) return res.status(404).json({ error: `No drink with id ${req.drinkId}` });
  res.json(drink);
});

// POST /api/drinks   body: { "name": "Mocha", "category": "Hot Coffee", "price": 4.95,
//                            "description": "...", "emoji": "☕", "customizable": true }
router.post("/", requireAuth, validateDrink, async (req, res) => {
  res.status(201).json(await createDrink(req.drink));
});

// DELETE /api/drinks/3
router.delete("/:id", requireAuth, checkId, async (req, res) => {
  const deleted = await deleteDrink(req.drinkId);
  if (!deleted) return res.status(404).json({ error: `No drink with id ${req.drinkId}` });
  res.status(204).end();
});

export default router;
