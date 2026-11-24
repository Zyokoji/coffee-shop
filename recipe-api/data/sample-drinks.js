// data/sample-drinks.js: the same 6 drinks as supabase/setup.sql.
// Used only when there are no Supabase keys.

export const sampleDrinks = [
  { id: 1, name: "Cappuccino", category: "Hot Coffee", description: "Espresso with steamed milk and a thick layer of foam.", price: 4.5, emoji: "☕", customizable: true },
  { id: 2, name: "Latte", category: "Hot Coffee", description: "Espresso mixed with smooth steamed milk.", price: 4.75, emoji: "☕", customizable: true },
  { id: 3, name: "Americano", category: "Hot Coffee", description: "Espresso combined with hot water for a smooth, bold coffee.", price: 3.5, emoji: "☕", customizable: true },
  { id: 4, name: "Iced Latte", category: "Cold Coffee", description: "Espresso and cold milk served over ice.", price: 5.0, emoji: "🧊", customizable: true },
  { id: 5, name: "Caramel Iced Coffee", category: "Cold Coffee", description: "Iced coffee with milk and sweet caramel.", price: 5.25, emoji: "🥤", customizable: true },
  { id: 6, name: "Hot Chocolate", category: "Other Drinks", description: "Rich chocolate blended with warm steamed milk.", price: 4.0, emoji: "🍫", customizable: true },
];
