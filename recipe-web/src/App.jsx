import { useEffect, useState } from "react";
import { API_URL, getHealth, getDrinks, addDrink, deleteDrink } from "./api.js";
import ConnectionPanel from "./components/ConnectionPanel.jsx";
import Problem from "./components/Problem.jsx";
import DrinkList from "./components/DrinkList.jsx";
import AddDrinkForm from "./components/AddDrinkForm.jsx";
import DrinkCustomizer from "./components/DrinkCustomizer.jsx";
import OrderCart from "./components/OrderCart.jsx";
import AuthBox from "./AuthBox.jsx";
import { supabase } from "./supabase.js";

export default function App() {
  // The Three States Pattern: every async screen is loading, error, OR ready.
  const [status, setStatus] = useState("loading");
  const [problem, setProblem] = useState(null);
  const [health, setHealth] = useState(null);
  const [drinks, setDrinks] = useState([]);
  const [session, setSession] = useState(null);
  const [order, setOrder] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  async function load() {
    if (!API_URL) {
      setProblem({ kind: "missing-url" });
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const [healthData, drinkData] = await Promise.all([getHealth(), getDrinks()]);
      setHealth(healthData);
      setDrinks(drinkData);
      setStatus("ready");
    } catch (error) {
      setProblem({ kind: error.kind, message: error.message });
      setStatus("error");
    }
  }

  useEffect(() => {
    load();

    const {data} = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event)
        setSession(session);
      }
      
    )
    return () => data.subscription.unsubscribe();
  }, []);

  async function handleAdd(drink) {
    const saved = await addDrink(drink); // throws on a 400, the form shows the message
    setDrinks((current) => [...current, saved]);
  }

  async function handleDelete(id) {
    await deleteDrink(id);
    setDrinks((current) => current.filter((drink) => drink.id !== id));
  }

  // Customizable drinks open the popup; the rest go straight into the order.
  function handleSelect(drink) {
    if (drink.customizable) setSelectedDrink(drink);
    else addToOrder({ ...drink, price: Number(drink.price) });
  }

  // Each different set of choices is its own cart line (cartId).
  function addToOrder(drink) {
    const cartId = drink.cartId ?? String(drink.id);
    setOrder((current) =>
      current.some((item) => item.cartId === cartId)
        ? current.map((item) => (item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item))
        : [...current, { ...drink, cartId, quantity: 1 }]
    );
  }

  function changeQuantity(cartId, amount) {
    setOrder((current) =>
      current
        .map((item) => (item.cartId === cartId ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromOrder(cartId) {
    setOrder((current) => current.filter((item) => item.cartId !== cartId));
  }

  return (
    <div className="page">
      <header className="top">
        <h1>Coffee Shop</h1>
        <p className="sub">A React site talking to your own Express API</p>
      </header>

      {session ? (
        <p>
          logged in as {session.user.email}{" "}
          <button onClick={() => supabase.auth.signOut()}>
            log out
          </button>
        </p>
      ) : (
        <AuthBox />
      )}
      <ConnectionPanel health={health} status={status} />

      {status === "loading" && <p className="loading">Asking the API for drinks...</p>}

      {status === "error" && <Problem problem={problem} onRetry={load} />}

      {status === "ready" && session && (
        <main className="grid">
          <section>
            <h2>
              Drinks <span className="count">{drinks.length}</span>
            </h2>
            <DrinkList drinks={drinks} onDelete={handleDelete} onSelect={handleSelect} />
          </section>
          <aside>
            <OrderCart
              order={order}
              onRemove={removeFromOrder}
              onChangeQuantity={changeQuantity}
              onClear={() => setOrder([])}
            />
            <h2>Add a drink</h2>
            <AddDrinkForm onAdd={handleAdd} />
          </aside>
        </main>
      )}

      {selectedDrink && (
        <DrinkCustomizer
          key={selectedDrink.id}
          drink={selectedDrink}
          onAdd={addToOrder}
          onClose={() => setSelectedDrink(null)}
        />
      )}
    </div>
  );
}
