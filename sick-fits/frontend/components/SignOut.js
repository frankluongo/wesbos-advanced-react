import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY, END_SESSION } from '@lib/queries';
import { useMutation } from '@apollo/client';

export default function SignOut({ children }) {
  const [endSesh] = useMutation(END_SESSION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  function onSignOut() {
    endSesh();
  }
  return (
    <button onClick={onSignOut} type="button">
      {children}
    </button>
  );
}

SignOut.propTypes = {
  children: PropTypes.any,
};

SignOut.defaultProps = {
  children: 'Sign Out',
};
