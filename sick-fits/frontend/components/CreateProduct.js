import { useMutation } from '@apollo/client';
import Router from 'next/router';

import { CREATE_PRODUCT_MUTATION, ALL_PRODUCTS_QUERY } from '@lib/queries';
import { useForm } from '@hooks';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';
import PriceInput from './PriceInput';

export default function CreateProduct() {
  const { clear, inputs, onChange, reset } = useForm({
    name: 'Nice Shoes',
    price: 1234,
    description: 'these are nice shoes',
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await createProduct();
      clear();
      Router.push({
        pathname: `/product/${res?.data?.createProduct?.id}`,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <FormStyles onSubmit={onSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
          <span className="label">Image: </span>
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={onChange}
          />
        </label>
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
          <button type="submit">+ Add Product</button>
          <button type="button" onClick={clear}>
            Clear
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
      </fieldset>
    </FormStyles>
  );
}
