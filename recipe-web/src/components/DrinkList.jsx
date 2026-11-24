export default function DrinkList({ drinks, onDelete, onSelect }) {
  if (drinks.length === 0) return <p className="empty">No drinks yet. Add one.</p>;

  return (
    <ul className="cards">
      {drinks.map((drink) => (
        <li key={drink.id} className="card">
          <div className="card-top">
            <h3>
              {drink.emoji} {drink.name}
            </h3>
            <button className="ghost small" onClick={() => onDelete(drink.id)} aria-label={`Remove ${drink.name}`}>
              Remove
            </button>
          </div>
          <p className="meta">
            {drink.category} &middot; ${Number(drink.price).toFixed(2)}
          </p>
          {drink.description && <p>{drink.description}</p>}
          <div className="tags">
            {drink.customizable && <span className="tag">customizable</span>}
          </div>
          <button className="add-button" onClick={() => onSelect(drink)}>
            {drink.customizable ? "Customize & add" : "Add to order"}
          </button>
        </li>
      ))}
    </ul>
  );
}
