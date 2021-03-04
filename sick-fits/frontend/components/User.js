import { useUser } from '@hooks';

export default function User() {
  const user = useUser();
  return <div>i am the user</div>;
}
