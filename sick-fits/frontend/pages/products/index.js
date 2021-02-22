import Pagination from '@components/Pagination';
import Products from '@components/Products';

export default function ProductsPage() {
  return (
    <div>
      <Pagination page={1} />
      <Products page={0} />
      <Pagination page={1} />
    </div>
  );
}
