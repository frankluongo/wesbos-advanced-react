import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'RadNika Next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  :root {
    --red: #ff1234;
    --black: #393939;
    --gray: #3a4a4a;
    --grey: var(--gray);
    --lightGray: #e1e1e1;
    --lightGrey: var(--lightGray);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0, 0.09);

    --font-primary: 'RadNika Next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --font-size: 62.5%;

    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  html {
    font-size: var(--font-size);
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body, button, input {
    font-family: var(--font-primary, 'RadNika Next');
  }

  body {
    font-size: 1.5rem;
    line-height: 2;
  }

  a {
    color: var(--black, black);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default function Page({ children }) {
  const { InnerStyles } = styles();
  return (
    <>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </>
  );
}

function styles() {
  const InnerStyles = styled.main`
    max-width: var(--maxWidth);
    margin: 0 auto;
    padding: 2rem;
  `;

  return { InnerStyles };
}

Page.propTypes = {
  children: PropTypes.any,
};
