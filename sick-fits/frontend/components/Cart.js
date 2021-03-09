import PropTypes from 'prop-types';

import { useUser } from '@hooks';
import styled from 'styled-components';
import formatMoney from '@lib/formatMoney';
import calcCartTotal from '@lib/calcCartTotal';
import { useCartContext } from '@context';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CartToggle from './CartToggle';
import DeleteCartItem from './DeleteCartItem';
import Checkout from './Checkout';
import getSrc from '@lib/getSrc';

const CartItemStyles = styled.li`
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: 1rem 0;

  border-bottom: 1px solid var(--lightGrey);

  img {
    margin-right: 1rem;
  }

  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ item }) {
  if (!item) return null;
  const { product } = item;
  return (
    <CartItemStyles>
      <img src={getSrc(product)} alt={product?.name} width="100" />
      <div>
        <h3>
          {product?.name} x {item.quantity}
        </h3>
        <p>
          {formatMoney(product.price * item.quantity)}
          <br />
          <em>
            {' '}
            {item.quantity} &times; {formatMoney(product.price)}
          </em>
        </p>
      </div>
      <div>
        <DeleteCartItem id={item.id} />
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const { open } = useCartContext();
  const me = useUser();
  if (!me) return null;
  return (
    <CartStyles open={open}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CartToggle>&times;</CartToggle>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcCartTotal(me.cart))}</p>
      </footer>
      <Checkout />
    </CartStyles>
  );
}

CartItem.propTypes = {
  item: PropTypes.object,
};
