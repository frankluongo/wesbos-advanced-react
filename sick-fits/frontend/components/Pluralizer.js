import React from 'react';

export default function Pluralizer({ count, children }) {
  const plur = count > 1 ? 's' : '';
  return (
    <>
      {children}
      {plur}
    </>
  );
}
