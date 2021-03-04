/* eslint-disable no-restricted-globals */
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY, DELETE_CART_ITEM_MUTATION } from '@lib/queries';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

const BigButton = styled.button`
  font-size: 3rem;

  appearance: none;
  background: none;
  border: 0;
  cursor: pointer;
  transition: transform 200ms ease-in-out;
  transform-origin: center center;

  &:hover,
  &:focus {
    color: var(--red);
    transform: scale(1.15);
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function DeleteCartItem({ id }) {
  const [deleteCartItem] = useMutation(DELETE_CART_ITEM_MUTATION, {
    variables: {
      id,
    },
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
    update,
  });

  function onDelClick() {
    const youSure = confirm(
      'Whoa Nelly! You sure want to remove ALL of these from your cart?'
    );
    if (!youSure) return;
    deleteCartItem();
  }

  return (
    <BigButton
      type="button"
      onClick={onDelClick}
      title="Remove this item from your cart"
    >
      &times;
    </BigButton>
  );
}

DeleteCartItem.propTypes = {
  id: PropTypes.string,
};
