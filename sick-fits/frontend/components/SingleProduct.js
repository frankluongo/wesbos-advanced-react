/* eslint-disable jsx-a11y/img-redundant-alt */
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { SINGLE_ITEM_QUERY } from '@lib/queries';
import DisplayError from './ErrorMessage';
import getSrc from '@lib/getSrc';

const ProductStyles = styled.div`
  align-items: top;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  gap: 2rem;
  justify-content: center;
  max-width: var(--max-width);

  img {
    width: 100%;

    object-fit: contain;
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  const alt = Product?.photo?.altText || Product?.name;
  return (
    <ProductStyles className="details">
      <Head>
        <title>Sick Fits | {Product?.name}</title>
      </Head>
      <img src={getSrc(Product)} alt={alt} />
      <div className="details">
        <h2>{Product?.name}</h2>
        <p>{Product?.description}</p>
      </div>
    </ProductStyles>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string,
};
