import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS_COUNT } from '@lib/queries';
import { perPage } from '@config';
import PaginationStyles from './styles/PaginationStyles';

import DisplayError from './ErrorMessage';

export default function Pagination({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_COUNT);
  const count = data?._allProductsMeta?.count;
  const pageCount = Math.ceil(count / perPage);
  if (loading) return null;
  if (error) return <DisplayError error={error} />;
  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits | Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page === 1} disabled={page === 1}>
          ⬅️ Prev
        </a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a disabled={page >= pageCount} aria-disabled={page >= pageCount}>
          Next ➡️
        </a>
      </Link>
    </PaginationStyles>
  );
}

Pagination.defaultProps = {
  page: 1,
};

Pagination.propTypes = {
  page: PropTypes.number,
};
