import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from '@lib/queries';
import { useCartContext } from '@context';
import DisplayError from './ErrorMessage';

export default function AddToCart({ id }) {
  const { setOpen } = useCartContext();
  const [addToCart, { error, loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function onAtcClick() {
    addToCart();
    await new Promise((res) => setTimeout(() => res(), 400));
    setOpen(true);
  }

  return (
    <>
      <DisplayError error={error} />
      <button
        onClick={onAtcClick}
        type="button"
        disabled={loading}
        aria-disabled={loading}
      >
        Add{loading && 'ing'} To Cart 😍
      </button>
    </>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string,
};
