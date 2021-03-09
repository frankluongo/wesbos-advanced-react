import PropTypes from 'prop-types';
import Order from '@components/Order';

export default function OrderPage({ query }) {
  const id = query?.id;
  if (!id) return <p>Oh nerr. You need an ID to see your order!</p>;
  return <Order id={id} />;
}

OrderPage.propTypes = {
  query: PropTypes.object,
};
