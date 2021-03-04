/* eslint-disable react/prop-types */
import { useToggle } from '@hooks';
import { createContext, useContext } from 'react';

const defValues = {
  open: false,
  setOpen: () => {},
};

export const CartContext = createContext(defValues);

export function CartProvider({ children }) {
  const [open, setOpen] = useToggle(false);
  return (
    <CartContext.Provider value={{ open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
