import PropTypes from 'prop-types';
import Reset from '@components/Reset';
import RequestReset from '@components/RequestReset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Bummer dude, you need a token to be here</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={query?.token} />
    </div>
  );
}

ResetPage.propTypes = {
  query: PropTypes.object,
};
