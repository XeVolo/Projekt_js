import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, announcements }) => {
    // Funkcja do zsumowania cen og�osze� w koszyku
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
                <p>Tw�j koszyk jest pusty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((itemId) => {
                            const announcement = announcements.find(a => a.id === itemId);
                            return (
                                <li key={itemId}>
                                    {announcement ? (
                                        <div>
                                            <p>Nazwa: {announcement.name}</p>
                                            <p>ID: {itemId}</p>
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
                        <button>Z�� zam�wienie</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;