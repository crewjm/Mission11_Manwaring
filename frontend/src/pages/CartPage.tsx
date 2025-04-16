import { useNavigate } from 'react-router-dom';
import { UseCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = UseCart();

  // Calculate total price of items in the cart
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page-container">
      <header className="bg-image p-3 mb-3">
        <h2 className="text-white">Your Cart</h2>
      </header>

      <section>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-unstyled">
            {cart.map((item: CartItem) => (
              <li key={item.bookID} className="mb-2">
                <span>
                  {item.quantity} × <strong>{item.title}</strong> — ${(
                    item.price * item.quantity
                  ).toFixed(2)}
                </span>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => removeFromCart(item.bookID)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {cart.length > 0 && (
        <>
          <h4 className="mt-3">Total: ${total.toFixed(2)}</h4>

          <div className="btn-group mt-3 d-flex gap-2 flex-wrap">
            <button className="btn btn-success" onClick={clearCart}>
              Finish Checkout
            </button>
            <button className="btn btn-outline-danger" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              Back to Shopping!
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
