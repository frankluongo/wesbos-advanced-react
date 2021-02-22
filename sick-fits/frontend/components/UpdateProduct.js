import { useMutation, useQuery } from '@apollo/client';

import {
  UPDATE_PRODUCT_MUTATION,
  ALL_PRODUCTS_QUERY,
  SINGLE_ITEM_QUERY,
} from '@lib/queries';
import { useForm } from '@hooks';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';
import PriceInput from './PriceInput';

export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  const { inputs, onChange, reset } = useForm(
    data?.Product || {
      name: '',
      price: 0,
      description: '',
    }
  );
  const [
    updateProduct,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await updateProduct();
    } catch (err) {
      throw new Error(err);
    }
  }

  if (loading) return <p>loading...</p>;
  return (
    <FormStyles onSubmit={onSubmit}>
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          <span className="label">Name: </span>
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={onChange}
          />
        </label>
        <PriceInput value={inputs.price} onChange={onChange} />
        <label htmlFor="description">
          <span className="label">Description: </span>
          <textarea
            id="description"
            name="description"
            placeholder="description..."
            value={inputs.description}
            onChange={onChange}
          />
        </label>
        <div>
          <button type="submit">Update Product</button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
      </fieldset>
    </FormStyles>
  );
}
