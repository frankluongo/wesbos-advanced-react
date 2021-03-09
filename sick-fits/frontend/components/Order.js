import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { ORDER_QUERY } from '@lib/queries';
import PropTypes from 'prop-types';
import { useUser } from '@hooks';
import formatMoney from '@lib/formatMoney';
import DisplayError from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import getSrc from '@lib/getSrc';

export default function Order({ id }) {
  const { data, error, loading } = useQuery(ORDER_QUERY, {
    variables: { id },
  });
  const user = useUser();
  const order = data?.Order;
  console.dir(data);

  // No User
  if (!user) return <p>You must be logged in to view this page!</p>;
  const { id: curUserId } = user;
  const orderUserId = data?.Order?.user?.id;
  // Not the right user
  if (curUserId !== orderUserId) return <p>Whoa now! This ain't your order!</p>;
  // Handle Error
  if (error) return <DisplayError error={error} />;
  // Display the page!
  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - {order.id}</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Order Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Items Ordered:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={getSrc(item)} alt={item.name} width="50" />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}

Order.propTypes = {
  id: PropTypes.string,
};
