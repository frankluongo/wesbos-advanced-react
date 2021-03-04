export default function calcCartTotal(cartItems) {
  function reducer(acc, current) {
    if (!current?.product) return acc;
    return acc + current.quantity * current.product.price;
  }
  return cartItems.reduce(reducer, 0);
}
