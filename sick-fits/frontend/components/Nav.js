import React from 'react';
import Link from 'next/link';
import { useUser } from '@hooks';
import countCartItems from '@lib/countCartItems';
import NavStyles from './styles/NavStyles';
import SignOut from './SignOut';
import CartToggle from './CartToggle';
import CartCount from './CartCount';

export default function Nav() {
  const hasUser = useUser();
  const count = countCartItems(hasUser?.cart);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {hasUser && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <CartToggle>
            My Cart
            <CartCount count={count} />
          </CartToggle>
        </>
      )}
      {!hasUser && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
