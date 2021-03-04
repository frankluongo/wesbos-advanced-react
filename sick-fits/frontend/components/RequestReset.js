import { useState } from 'react';
import { useForm } from '@hooks';
import { useMutation } from '@apollo/client';
import { REQUEST_RESET_MUTATION } from '@lib/queries';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';

export default function RequestReset() {
  const { inputs, onChange, reset } = useForm({
    email: '',
  });
  const [vError, setVError] = useState(null);
  const [request, { error, loading, data }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  const success = data?.sendUserPasswordResetLink === null;

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await request();
      if (res?.data?.sendUserPasswordResetLink?.code) {
        setVError(res?.data?.sendUserPasswordResetLink);
      } else {
        setVError(null);
      }
      reset();
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <FormStyles onSubmit={onSubmit} method="POST">
      <DisplayError error={error || vError} />
      <h2>Request Password Reset</h2>
      <fieldset disabled={loading} aria-disabled={loading}>
        {success && <p>Reset Request Successful! Check Your Email</p>}
        <label htmlFor="email">
          <span className="label">Email: </span>
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={onChange}
          />
        </label>
      </fieldset>
      <button type="submit">Request Reset</button>
    </FormStyles>
  );
}
