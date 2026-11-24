import { useState } from "react";

const EMPTY = { name: "", category: "", price: "", description: "", emoji: "", customizable: true };

export default function AddDrinkForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  function update(event) {
    const { name, type, value, checked } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
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
        Name
        <input name="name" value={form.name} onChange={update} placeholder="Mocha" />
      </label>
      <label>
        Category
        <input name="category" value={form.category} onChange={update} placeholder="Hot Coffee" />
      </label>
      <label>
        Price
        <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={update} placeholder="4.95" />
      </label>
      <label>
        Description
        <input name="description" value={form.description} onChange={update} placeholder="Espresso with chocolate and steamed milk." />
      </label>
      <label>
        Emoji
        <input name="emoji" value={form.emoji} onChange={update} placeholder="☕" />
      </label>
      <label>
        <input name="customizable" type="checkbox" checked={form.customizable} onChange={update} /> Customizable
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Add drink"}
      </button>
    </form>
  );
}
