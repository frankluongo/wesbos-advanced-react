/* eslint-disable no-restricted-globals */

import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT_MUTATION } from '@lib/queries';
import PropTypes from 'prop-types';

function update(cache, payload) {
  cache.evict(cache.identify(payload?.data?.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });

  function onClick() {
    const bombsAway = confirm('Are you sure you want to do this?');
    if (!bombsAway) return;
    try {
      deleteProduct();
    } catch (err) {
      alert(err.message);
      throw new Error(err);
    }
  }

  return (
    <button type="button" onClick={onClick} disabled={loading}>
      {children}
    </button>
  );
}

DeleteProduct.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
};
