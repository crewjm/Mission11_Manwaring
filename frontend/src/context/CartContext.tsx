import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../types/CartItem';
import { Toast } from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Define the shape of our cart context
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

// Create a new context for the cart
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component wraps children in CartContext
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Adds an item to the cart, or increments quantity if already present
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const match = prev.find((i) => i.bookID === item.bookID);

      if (match) {
        return prev.map((i) =>
          i.bookID === item.bookID
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });

    showToast();
  };

  // Remove one unit of an item; if quantity hits 0, remove it entirely
  const removeFromCart = (bookID: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.bookID === bookID
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  // Clears the entire cart
  const clearCart = () => setCart([]);

  // Shows toast notification using Bootstrap
  const showToast = () => {
    const toastEl = document.getElementById('cartToast');
    if (toastEl) {
      const toast = new Toast(toastEl);
      toast.show();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for accessing cart context
export const UseCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('UseCart must be wrapped in a <CartProvider> component');
  }
  return ctx;
};

