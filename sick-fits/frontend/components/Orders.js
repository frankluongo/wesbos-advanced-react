import { useQuery } from '@apollo/client';
import formatMoney from '@lib/formatMoney';
import getSrc from '@lib/getSrc';
import { ALL_ORDERS_QUERY } from '@lib/queries';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import Pluralizer from './Pluralizer';
import OrderItemStyles from './styles/OrderItemStyles';

const OrderList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 4rem;
`;

function countItems(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function Orders() {
  const { data, error, loading } = useQuery(ALL_ORDERS_QUERY);
  const allOrders = data?.allOrders || [];

  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} Orders</h2>
      <OrderList>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order?id=${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>
                    {countItems(order)}{' '}
                    <Pluralizer count={countItems(order)}>Item</Pluralizer>
                  </p>
                  <p>
                    {order.items.length}{' '}
                    <Pluralizer count={order.items.length}>Product</Pluralizer>
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      src={getSrc(item)}
                      key={item.photo.id}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderList>
    </div>
  );
}
