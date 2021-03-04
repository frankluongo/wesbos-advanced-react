export default function countCartItems(cartItems) {
  if (!cartItems) return 0;
  function reducer(acc, current) {
    if (!current?.product) return acc;
    return acc + current.quantity;
  }
  return cartItems.reduce(reducer, 0);
}
