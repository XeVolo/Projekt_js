/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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
    });
    const [nameError, setNameError] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncementData({ ...announcementData, [name]: value });
    };

    const validateForm = () => {
        if (!announcementData.name.trim()) {
            setNameError('Name cannot be empty');
            return false;
        }
        setNameError('');
        return true;
    };

    const fetchSubcategories = async () => {
        try {
            const response = await fetch('api/SubCategory');
            const data = await response.json();
                setSubcategories(data);
            
             
        } catch (error) {
            console.error('Error:', error);
        }
    };
    console.log(subcategories);
    {
        subcategories.map(subcategory => (
            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
        ))
    }

    useEffect(() => {
        fetchSubcategories();
    }, []); // Fetch subcategories when the component mounts

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
                body: JSON.stringify({ ...announcementData, categoryConnectors: selectedSubcategories }),
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

                {/* Lista rozwijana z checkboxami dla subkategorii */}
                <label htmlFor="subcategories">Select Subcategories:</label>
                <select multiple onChange={(e) => setSelectedSubcategories(Array.from(e.target.selectedOptions, (option) => option.value))} value={selectedSubcategories}>
                    {subcategories.map(subcategory => (
                        <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                    ))}
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
