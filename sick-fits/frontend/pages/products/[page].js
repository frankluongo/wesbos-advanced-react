import Pagination from '@components/Pagination';
import Products from '@components/Products';

export default function ProductsPage({ query }) {
  const page = parseInt(query?.page) || 1;
  return (
    <div>
      <Pagination page={page} />
      <Products page={page - 1} />
      <Pagination page={page} />
    </div>
  );
}
