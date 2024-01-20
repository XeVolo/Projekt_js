const Cart = ({ cartItems, announcements }) => {
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
                </div>
            )}
        </div>
    );
};

export default Cart;
