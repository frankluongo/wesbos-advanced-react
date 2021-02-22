import PropTypes from 'prop-types';
import SingleProduct from '@components/SingleProduct';

export default function SingleProductPage({ query }) {
  const id = query?.id || '60296acb31a4c27e3b78a48b';
  return <SingleProduct id={id} />;
}

SingleProductPage.propTypes = {
  query: PropTypes.object,
};
