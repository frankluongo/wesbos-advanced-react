import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import { ALL_PRODUCTS_PAGINATED_QUERY } from '@lib/queries';
import styled from 'styled-components';
import { perPage } from '@config';
import Product from './Product';

const ProductsListStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_PAGINATED_QUERY, {
    variables: {
      skip: page * perPage,
      first: perPage,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;
  return (
    <ProductsListStyles>
      {data?.allProducts.map((pd) => (
        <Product key={pd.id} product={pd} />
      ))}
    </ProductsListStyles>
  );
}

Products.propTypes = {
  page: PropTypes.number,
};
