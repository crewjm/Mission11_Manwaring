import { useNavigate } from 'react-router-dom';
import { UseCart } from '../context/CartContext';

function CartSummary() {
  const navigate = useNavigate();
  const { cart } = UseCart();

  // Calculate total cost of all items
  const amountTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate number of items in cart
  const quantityTotal = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      onClick={() => navigate('/cart')}
      style={{
        position: 'fixed',
        top: '12px',
        right: '18px',
        backgroundColor: '#f0f0f5',
        padding: '12px 16px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
        cursor: 'pointer',
        fontSize: '15px',
        transition: 'background-color 0.2s ease',
      }}
    >
      <span style={{ marginRight: '8px' }}>🛒</span>
      <strong>
        {quantityTotal} items – ${amountTotal.toFixed(2)}
      </strong>
    </div>
  );
}

export default CartSummary;
