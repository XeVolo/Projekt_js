import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            name,
            lastName,
            email,
            phoneNumber,
            zipCode,
            city,
            street,
        };

        // Wywo³aj funkcjê onSubmit, aby przekazaæ dane rodzicowi (np. do App)
        onSubmit(orderData);

        // Przygotuj obiekt zamówienia do wys³ania na serwer
        const orderToSend = {
            ...orderData,
            announcements: [], // Dodaj odpowiednie og³oszenia z koszyka
        };

        try {
            // Wyœlij obiekt zamówienia na serwer
            const response = await fetch('api/Order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderToSend),
            });

            if (response.ok) {
                console.log('Zamówienie zosta³o przes³ane na serwer.');
                // Tutaj mo¿esz obs³u¿yæ odpowiedŸ od serwera (jeœli wymagane)
            } else {
                console.error('B³¹d podczas przesy³ania zamówienia na serwer.');
            }
        } catch (error) {
            console.error('B³¹d podczas komunikacji z serwerem:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Imie:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                Nazwisko:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Numer telefonu:
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </label>
            <label>
                Kod pocztowy:
                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
            </label>
            <label>
                Miasto:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
            </label>
            <label>
                Ulica:
                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
            </label>
            <button type="submit">Zloz zamowienie</button>
        </form>
    );
};

const Order = ({ cartItems, onSubmit }) => {
    const handleOrderSubmit = (orderData) => {
        // Obs³uga danych zamówienia, na przyk³ad wys³anie ich do serwera
        console.log('Dane zamówienia:', orderData);
    };

    return (
        <div>
            <h2>Zamówienie</h2>
            <OrderForm onSubmit={handleOrderSubmit} />
        </div>
    );
};

export default Order;
