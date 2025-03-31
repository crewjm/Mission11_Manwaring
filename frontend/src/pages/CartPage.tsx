import { useNavigate } from "react-router-dom";
import { UseCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart } = UseCart();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <div className="bg-image">
                <h2 style={{color: "white"}}>Cart</h2>
            </div>
            <div>
                {cart.length === 0 ? (
                    <p>Empty!</p>
                ) : (
                    <ul>
                        {cart.map((item: CartItem) => (
                            <li className="list-unstyled" key={item.bookID}>
                                {item.quantity}x {item.title} | ${(item.price * item.quantity).toFixed(2)}
                                <button
                                    className="btn btn-danger"
                                    onClick={() => removeFromCart(item.bookID)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="btn btn-success" onClick={() => clearCart()}>Finish checkout</button>
            <button className="btn btn-danger" onClick={() => clearCart()}>Clear</button>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>Back to Shop</button>
        </div>
    );
}

export default CartPage;