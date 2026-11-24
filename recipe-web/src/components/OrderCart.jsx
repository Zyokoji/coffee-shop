// components/OrderCart.jsx: the order list with quantities and a total.
// Brought over from the original coffee-shop site. The cart lives in the
// browser only; nothing is saved to the API.

export default function OrderCart({ order, onRemove, onChangeQuantity, onClear }) {
  const itemCount = order.reduce((sum, item) => sum + item.quantity, 0);
  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>
        Your Order <span className="count">{itemCount}</span>
      </h2>

      {order.length === 0 ? (
        <p className="empty">Your cart is empty. Add something delicious!</p>
      ) : (
        <>
          <ul className="cart-items">
            {order.map((item) => (
              <li key={item.cartId} className="cart-item">
                <div className="cart-item-info">
                  <strong>
                    {item.emoji} {item.name}
                  </strong>
                  {item.size && (
                    <span className="meta">
                      {[item.size, item.milk, item.sweetness, ...item.extras].join(" · ")}
                    </span>
                  )}
                  <span className="meta">${item.price.toFixed(2)} each</span>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="ghost small"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => onChangeQuantity(item.cartId, -1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="ghost small"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => onChangeQuantity(item.cartId, 1)}
                  >
                    +
                  </button>
                  <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
                  <button
                    className="ghost small"
                    aria-label={`Remove ${item.name} from order`}
                    onClick={() => onRemove(item.cartId)}
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div className="cart-buttons">
            <button onClick={() => alert("Checkout coming soon!")}>Checkout</button>
            <button className="ghost" onClick={onClear}>
              Clear Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
