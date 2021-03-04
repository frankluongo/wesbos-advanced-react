import { useState } from 'react';
import { useForm } from '@hooks';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY, SIGN_UP_MUTATION } from '@lib/queries';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';

export default function SignUp() {
  const { inputs, onChange, reset } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [vError, setVError] = useState(null);
  const [signup, { error, loading, data }] = useMutation(SIGN_UP_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await signup();
      if (res?.data?.createUser?.code === 'FAILURE') {
        setVError(res?.data?.createUser);
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
      <h2>Sign Up For An Account</h2>
      <fieldset disabled={loading} aria-disabled={loading}>
        {data?.createUser && <p>Sign up successful! Please sign in</p>}
        <label htmlFor="name">
          <span className="label">Name: </span>
          <input
            type="name"
            id="name"
            name="name"
            value={inputs.name}
            onChange={onChange}
          />
        </label>
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
      <button type="submit">Sign Up</button>
    </FormStyles>
  );
}
