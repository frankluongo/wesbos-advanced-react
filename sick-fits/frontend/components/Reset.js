import PropTypes from 'prop-types';

import { useForm } from '@hooks';
import { RESET_MUTATION } from '@lib/queries';
import { useMutation } from '@apollo/client';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';

export default function Reset({ token }) {
  const { inputs, onChange, reset } = useForm({
    email: '',
    password: '',
    token,
  });
  const [resetPass, { error, loading, data }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  function isFail() {
    if (!data || !data?.redeemUserPasswordResetToken) return null;
    const { code, message } = data.redeemUserPasswordResetToken;
    if (code) return { code, message };
  }

  const fail = isFail();
  const success = data?.redeemUserPasswordResetToken === null;

  async function onSubmit(e) {
    e.preventDefault();
    try {
      resetPass();
      reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <FormStyles onSubmit={onSubmit} method="POST">
      <DisplayError error={error || fail} />
      <h2>Reset Password</h2>
      {success && <p>Success! You can now sign in</p>}
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
          <span className="label">New Password: </span>
          <input
            type="password"
            id="password"
            name="password"
            minLength="8"
            autoComplete="password"
            value={inputs.password}
            onChange={onChange}
          />
        </label>
      </fieldset>
      <button type="submit">Reset Password</button>
    </FormStyles>
  );
}

Reset.propTypes = {
  token: PropTypes.string,
};
