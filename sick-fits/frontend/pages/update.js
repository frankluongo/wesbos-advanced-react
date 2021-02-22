import UpdateProduct from '@components/UpdateProduct';

export default function Update({ query }) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
