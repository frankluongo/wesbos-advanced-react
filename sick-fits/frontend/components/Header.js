/* eslint-disable no-use-before-define */
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

export default function Header() {
  const { HeaderStyled, Logo } = styles();
  return (
    <HeaderStyled>
      <div className="bar">
        <Logo>
          <Link href="/">Sick Fits</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <Search />
      </div>
      <Cart />
    </HeaderStyled>
  );
}

function styles() {
  const HeaderStyled = styled.header`
    .bar {
      align-items: stretch;
      display: grid;
      grid-template-columns: auto 1fr;
      justify-content: space-between;

      border-bottom: 10px solid var(--black, black);
    }

    .sub-bar {
      display: grid;
      grid-template-columns: 1fr auto;
      padding: 0 1rem;

      border-bottom: 1px solid var(--black, black);
    }
  `;

  const Logo = styled.h1`
    position: relative;

    margin-left: 2rem;

    font-size: 4rem;

    background-color: red;
    transform: skew(-7deg);

    a {
      color: white;
      text-decoration: none;
      text-transform: uppercase;
      padding: 0.5rem 1rem;
    }
  `;

  return { HeaderStyled, Logo };
}
