// components/DrinkCustomizer.jsx: the size / milk / sweetness / extras popup.
// Brought over from the original coffee-shop site.

import { useEffect, useState } from "react";

const SIZES = { Small: 0, Medium: 0.5, Large: 1.0 };
const MILKS = { "Whole Milk": 0, "Oat Milk": 0.75, "Almond Milk": 0.75 };
const SWEETNESS = ["None", "Light", "Regular", "Extra"];
const EXTRAS = { "Extra Shot": 1.0, Caramel: 0.5, "Whipped Cream": 0.5 };

export default function DrinkCustomizer({ drink, onAdd, onClose }) {
  const [size, setSize] = useState("Medium");
  const [milk, setMilk] = useState("Whole Milk");
  const [sweetness, setSweetness] = useState("Regular");
  const [extras, setExtras] = useState([]);

  // Escape closes the popup.
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function toggleExtra(extra) {
    setExtras((current) =>
      current.includes(extra) ? current.filter((item) => item !== extra) : [...current, extra]
    );
  }

  const extrasTotal = extras.reduce((total, extra) => total + EXTRAS[extra], 0);
  const finalPrice = Number(drink.price) + SIZES[size] + MILKS[milk] + extrasTotal;

  function handleAdd() {
    const sortedExtras = [...extras].sort();
    onAdd({
      ...drink,
      size,
      milk,
      sweetness,
      extras: sortedExtras,
      price: finalPrice,
      // Same drink with the same choices = same cart line.
      cartId: JSON.stringify([drink.id, size, milk, sweetness, sortedExtras]),
    });
    onClose();
  }

  return (
    <div className="customizer-overlay" onClick={onClose}>
      <section
        className="customizer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customizer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="customizer-title">
          Customize {drink.emoji} {drink.name}
        </h2>

        <label>
          Size
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            {Object.entries(SIZES).map(([option, cost]) => (
              <option key={option} value={option}>
                {option} (+${cost.toFixed(2)})
              </option>
            ))}
          </select>
        </label>

        <label>
          Milk
          <select value={milk} onChange={(e) => setMilk(e.target.value)}>
            {Object.entries(MILKS).map(([option, cost]) => (
              <option key={option} value={option}>
                {option} (+${cost.toFixed(2)})
              </option>
            ))}
          </select>
        </label>

        <label>
          Sweetness
          <select value={sweetness} onChange={(e) => setSweetness(e.target.value)}>
            {SWEETNESS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend>Extras</legend>
          {Object.entries(EXTRAS).map(([name, cost]) => (
            <label key={name} className="extra-option">
              <input type="checkbox" checked={extras.includes(name)} onChange={() => toggleExtra(name)} />
              {name} (+${cost.toFixed(2)})
            </label>
          ))}
        </fieldset>

        <p className="customizer-total">Total: ${finalPrice.toFixed(2)}</p>

        <div className="customizer-actions">
          <button type="button" className="ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="button" onClick={handleAdd}>
            Add to Order
          </button>
        </div>
      </section>
    </div>
  );
}
