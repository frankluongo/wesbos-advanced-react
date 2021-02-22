import formatMoney from '@lib/formatMoney';
import Link from 'next/link';
import PropTypes from 'prop-types';
import DeleteProduct from './DeleteProduct';

import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';

export default function Product({ product }) {
  const photo = product?.photo?.image?.publicUrlTransformed;
  const { name, price, description } = product;
  return (
    <ItemStyles>
      <img src={photo} alt={name} />
      <Title>
        <Link href={`/product/${product.id}`}>{name}</Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{description}</p>
      <div className="buttonList">
        <Link href={{ pathname: 'update', query: { id: product.id } }}>
          Edit
        </Link>
        <DeleteProduct id={product.id}>Delete Me</DeleteProduct>
      </div>
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.any,
};
