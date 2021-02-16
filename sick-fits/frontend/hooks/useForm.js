import { useState } from 'react';

export function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function onChange(e) {
    let { name, type, value } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    if (name === 'price') {
      console.log(value);
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function reset() {
    setInputs(initial);
  }

  function clear() {
    const blank = { ...inputs };
    Object.keys(inputs).forEach((key) => (blank[key] = ''));
    setInputs(blank);
  }

  return { clear, inputs, onChange, reset };
}
