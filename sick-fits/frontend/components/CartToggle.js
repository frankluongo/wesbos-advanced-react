import { useCartContext } from '@context';
import PropTypes from 'prop-types';

export default function CartToggle({ children }) {
  const { setOpen } = useCartContext();
  function onCartToggle() {
    setOpen();
  }

  return (
    <button onClick={onCartToggle} type="button">
      {children}
    </button>
  );
}

CartToggle.propTypes = {
  children: PropTypes.any,
};

CartToggle.defaultProps = {
  children: 'Cart',
};
