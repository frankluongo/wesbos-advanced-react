import { useState } from 'react';
import { useForm } from '@hooks';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY, SIGN_IN_MUTATION } from '@lib/queries';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';
import Link from 'next/link';

export default function SignIn() {
  const { inputs, onChange, reset } = useForm({
    email: '',
    password: '',
  });
  const [vError, setVError] = useState(null);
  const [signin, { error, loading }] = useMutation(SIGN_IN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await signin();
      if (res?.data?.authenticateUserWithPassword?.code === 'FAILURE') {
        setVError(res?.data?.authenticateUserWithPassword);
      } else {
        setVError(null);
      }
      reset();
    } catch (err) {
      throw new Error(err);
    }
  }
  return (
    <FormStyles onSubmit={onSubmit} method="POST">
      <DisplayError error={error || vError} />
      <h2>Sign In To Your Account</h2>
      <fieldset disabled={loading} aria-disabled={loading}>
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
        <label htmlFor="password">
          <span className="label">Password: </span>
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password}
            onChange={onChange}
          />
        </label>
      </fieldset>
      <div style={{ marginBottom: '15px' }}>
        <Link href="/requestreset">Forgot Your Password?</Link>
      </div>
      <button type="submit">Sign In</button>
    </FormStyles>
  );
}
