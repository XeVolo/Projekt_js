/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateAnnouncement.css';

const CreateAnnouncement = () => {
    const [announcementData, setAnnouncementData] = useState({
        name: '',
        categoryConnectors: [],
        quantity: 0,
        price: 0,
        description: '',
        condition: '',
        
        state: '',
         // Początkowo pusta lista kategorii
    });
    const [nameError, setNameError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncementData({ ...announcementData, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
        setAnnouncementData({ ...announcementData, categoryConnectors: selectedCategories });
    };

    const validateForm = () => {
        if (!announcementData.name.trim()) {
            setNameError('Name cannot be empty');
            return false;
        }
        setNameError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('api/Announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(announcementData),
            });

            if (response.ok) {
                // Pomyślnie wysłano ogłoszenie na serwer
                console.log('Announcement submitted successfully.');
                // Tutaj możesz dodać przekierowanie na inną stronę lub wykonać inne działania po wysłaniu ogłoszenia
            } else {
                // Błąd podczas wysyłania ogłoszenia
                console.error('Failed to submit announcement.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Create New Announcement</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={announcementData.name} onChange={handleInputChange} />
                <span style={{ color: 'red' }}>{nameError}</span>

                {/* Lista rozwijana z checkboxami dla kategorii */}
                <label htmlFor="category">Select Categories:</label>
                <select multiple onChange={handleCategoryChange} value={announcementData.categoryConnectors}>
                    {/* Wstaw kategorie z backendu lub zdefiniuj stałe */}
                    <option value="1">Electronics</option>
                    <option value="2">Furniture</option>
                    {/* ... dodaj więcej opcji według potrzeb */}
                </select>

                <label htmlFor="quantity">Quantity:</label>
                <input type="number" name="quantity" value={announcementData.quantity} onChange={handleInputChange} />

                <label htmlFor="price">Price:</label>
                <input type="number" name="price" value={announcementData.price} onChange={handleInputChange} />

                <label htmlFor="description">Description:</label>
                <textarea name="description" value={announcementData.description} onChange={handleInputChange} />

                <label htmlFor="condition">Condition:</label>
                <input type="text" name="condition" value={announcementData.condition} onChange={handleInputChange} />

                

                <label htmlFor="state">State:</label>
                <input type="text" name="state" value={announcementData.state} onChange={handleInputChange} />

                

                <button type="submit">Submit Announcement</button>
            </form>

            {/* Przycisk powrotu do listy ogłoszeń */}
            <Link to="/api/Announcements">Go back to Announcements</Link>
        </div>
    );
};

export default CreateAnnouncement;
