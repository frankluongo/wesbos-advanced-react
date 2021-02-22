import { useState, useEffect } from 'react';

export function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial);

  function onChange(e) {
    let { name, type, value } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
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

  function onDataUpdate() {
    setInputs(initial);
  }

  useEffect(onDataUpdate, [initialValues]);
  return { clear, inputs, onChange, reset };
}
