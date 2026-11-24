import { useState } from "react";

const EMPTY = { name: "", category: "", price: "", description: "", emoji: "", customizable: true };

// Same limits as the API (recipe-api/middleware/validate.js). Keep them in sync.
// The API is the real guard; these just stop typing early so nobody hits an error.
const LIMITS = { name: 40, category: 30, description: 150, emoji: 4, price: 100 };

// Counts what a person sees, so one emoji counts as 1 character.
const chars = (text) => [...text];

// "Name   12/40", turning red at the limit.
function Counted({ label, value, limit }) {
  const used = chars(value).length;
  return (
    <span className="field-head">
      {label}
      <span className={used >= limit ? "counter full" : "counter"}>
        {used}/{limit}
      </span>
    </span>
  );
}

// Used for both adding and editing. Pass `initial` (a drink) to edit it.
export default function AddDrinkForm({ onAdd, initial, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? {
          name: initial.name,
          category: initial.category,
          price: String(initial.price),
          description: initial.description ?? "",
          emoji: initial.emoji ?? "",
          customizable: initial.customizable,
        }
      : EMPTY
  );
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  function update(event) {
    const { name, type, value, checked } = event.target;
    if (type === "checkbox") return setForm({ ...form, [name]: checked });
    // Text fields stop at their limit (also trims anything pasted in that is too long).
    const limit = name === "price" ? null : LIMITS[name];
    setForm({ ...form, [name]: limit ? chars(value).slice(0, limit).join("") : value });
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onAdd({
        name: form.name,
        category: form.category,
        price: Number(form.price),
        description: form.description,
        emoji: form.emoji,
        customizable: form.customizable,
      });
      setForm(EMPTY);
    } catch (err) {
      setError(err.message); // the API's own message, like "category is required"
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>
        <Counted label="Name" value={form.name} limit={LIMITS.name} />
        <input name="name" value={form.name} onChange={update} placeholder="Mocha" required />
      </label>
      <label>
        <Counted label="Category" value={form.category} limit={LIMITS.category} />
        <input name="category" value={form.category} onChange={update} placeholder="Hot Coffee" required />
      </label>
      <label>
        Price (max ${LIMITS.price})
        <input
          name="price"
          type="number"
          min="0"
          max={LIMITS.price}
          step="0.01"
          value={form.price}
          onChange={update}
          placeholder="4.95"
          required
        />
      </label>
      <label>
        <Counted label="Description" value={form.description} limit={LIMITS.description} />
        <textarea
          name="description"
          rows="3"
          value={form.description}
          onChange={update}
          placeholder="Espresso with chocolate and steamed milk."
        />
      </label>
      <label>
        <Counted label="Emoji" value={form.emoji} limit={LIMITS.emoji} />
        <input name="emoji" value={form.emoji} onChange={update} placeholder="☕" />
      </label>
      <label>
        <input name="customizable" type="checkbox" checked={form.customizable} onChange={update} /> Customizable
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : initial ? "Save changes" : "Add drink"}
      </button>
      {onCancel && (
        <button type="button" className="ghost" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
