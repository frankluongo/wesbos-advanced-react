import formatMoney from '@lib/formatMoney';
import Link from 'next/link';
import PropTypes from 'prop-types';

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
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.any,
};
