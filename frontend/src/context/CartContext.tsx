import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Toast } from 'bootstrap';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);

      if (existingItem) {
        return prevCart.map((c) =>
          c.bookID === item.bookID ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    // Show Bootstrap toast notification when an item is added
    const toastElement = document.getElementById('cartToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  };

  const removeFromCart = (bookID: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.bookID === bookID
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const UseCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
