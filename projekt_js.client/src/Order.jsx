import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ onSubmit, cartItems, announcements }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();  // Use useNavigate instead of history


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

        // Wywo�aj funkcj� onSubmit, aby przekaza� dane rodzicowi (np. do App)
        onSubmit(orderData);

        // Przygotuj obiekt zam�wienia do wys�ania na serwer
        const orderToSend = {
            ...orderData,
            announcements: cartItems,
        };

        try {
            // Wy�lij obiekt zam�wienia na serwer
            const response = await fetch('api/Order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderToSend),
            });

            if (response.ok) {
                console.log('Zamowienie zostalo przeslane na serwer.');
                setOrderPlaced(true); // Update orderPlaced state to true
            } else {
                console.error('B��d podczas przesy�ania zam�wienia na serwer.');
            }
        } catch (error) {
            console.error('B��d podczas komunikacji z serwerem:', error);
        }
    };

    const closeModal = () => {
        setOrderPlaced(false);
        navigate('/App');  // Use navigate to redirect
    };

    return (
        <div>
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
            <Modal
                isOpen={orderPlaced}
                onRequestClose={closeModal}
                contentLabel="Order Placed Modal"
            >
                <p>Zamowienie zostalo zlozone!</p>
                <button onClick={closeModal}>OK</button>
            </Modal>
        </div>
    );
};

const Order = ({ cartItems, announcements }) => {
    const handleOrderSubmit = (orderData) => {
        // Obs�uga danych zam�wienia, na przyk�ad wys�anie ich do serwera
        console.log('Dane zam�wienia:', orderData);
    };

    return (
        <div>
            <h2>Zam�wienie</h2>
            <OrderForm onSubmit={handleOrderSubmit} cartItems={cartItems} announcements={announcements} />
        </div>
    );
};

export default Order;
