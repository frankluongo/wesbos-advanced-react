import { useState } from 'react';

export function useToggle(defState = false) {
  const [toggle, setToggle] = useState(defState);

  function updateToggle(input) {
    if (typeof input !== 'undefined') {
      setToggle(input);
    } else {
      setToggle(!toggle);
    }
  }

  return [toggle, updateToggle];
}
