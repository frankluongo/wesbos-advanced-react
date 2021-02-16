import { useQuery } from '@apollo/client';

import { ALL_PRODUCTS_QUERY } from '@lib/queries';
import styled from 'styled-components';
import Product from './Product';

const ProductsListStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <ProductsListStyles>
      {data.allProducts.map((pd) => (
        <Product key={pd.id} product={pd} />
      ))}
    </ProductsListStyles>
  );
}
