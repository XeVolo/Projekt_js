import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, announcements, removeFromCart }) => {
    // Funkcja do zsumowania cen og³oszeñ w koszyku
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, itemId) => {
            const announcement = announcements.find(a => a.id === itemId);
            return total + (announcement ? announcement.price : 0);
        }, 0);
    };

    return (
        <div>
            <h2>Koszyk</h2>
            {cartItems.length === 0 ? (
                <p>Twoj koszyk jest pusty.</p>
                

            ) : (
                <div>
                        <ul>
                            {cartItems.map((itemId) => {
                                const announcement = announcements.find((a) => a.id === itemId);
                                return (
                                    <li key={itemId}>
                                        {announcement ? (
                                            <div>
                                                <p>Nazwa: {announcement.name}</p>
                                                <p>Cena: {announcement.price}</p>
                                                <button onClick={() => removeFromCart(itemId)}>Usun</button>
                                            </div>
                                        ) : (
                                            <p>ID: {itemId}</p>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    <p>Suma cen: {calculateTotalPrice()} PLN</p>
                    <Link to="/Order">
                        <button>Zloz zamowienie</button>
                    </Link>
                    <br />
                    <Link to="/">
                        <button>Schowaj koszyk</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
