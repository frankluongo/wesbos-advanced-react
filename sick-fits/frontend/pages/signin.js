import SignIn from '@components/SignIn';
import SignUp from '@components/SignUp';
import styled from 'styled-components';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export default function SignInPage() {
  return (
    <Grid>
      <SignUp />
      <SignIn />
    </Grid>
  );
}
