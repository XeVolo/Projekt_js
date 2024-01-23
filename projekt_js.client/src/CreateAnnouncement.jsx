﻿/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CreateAnnouncement.css';
import { useNavigate } from 'react-router-dom';

const CreateAnnouncement = () => {
    const [announcementData, setAnnouncementData] = useState({
        name: '',
        categoryConnectors: [],
        quantity: 0,
        price: 0,
        size: '',
        description: '',
        condition: '',
        state: '',
        photoURL: '',
    });
    const [nameError, setNameError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [sizeError, setSizeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [conditionError, setConditionError] = useState('');
    const [stateError, setStateError] = useState('');
    const [photoURLError, setPhotoURLError] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncementData({ ...announcementData, [name]: value });
    };

    const validateForm = () => {
        let valid = true;

        if (!announcementData.name.trim()) {
            setNameError('Nazwa nie może być pusta');
            valid = false;
        } else {
            setNameError('');
        }

        if (isNaN(announcementData.quantity) || parseInt(announcementData.quantity) <= 0) {
            setQuantityError('Ilość musi być liczbą większą od zera');
            valid = false;
        } else {
            setQuantityError('');
        }

        if (isNaN(announcementData.price) || parseFloat(announcementData.price) <= 0) {
            setPriceError('Cena musi być liczbą większą od zera');
            valid = false;
        } else {
            setPriceError('');
        }

        if (!announcementData.size.trim()) {
            setSizeError('Rozmiar nie może być pusty');
            valid = false;
        } else {
            setSizeError('');
        }

        if (!announcementData.description.trim()) {
            setDescriptionError('Opis nie może być pusty');
            valid = false;
        } else {
            setDescriptionError('');
        }

        if (!announcementData.condition.trim()) {
            setConditionError('Stan nie może być pusty');
            valid = false;
        } else {
            setConditionError('');
        }

        if (!announcementData.state.trim()) {
            setStateError('State nie może być pusty');
            valid = false;
        } else {
            setStateError('');
        }

        if (!announcementData.photoURL.trim()) {
            setPhotoURLError('Photo URL nie może być pusty');
            valid = false;
        } else {
            setPhotoURLError('');
        }

        return valid;
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
                navigate('/api/Announcements');
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
            <h2>Dodaj nowe ogłoszenie</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nazwa:</label>
                <input type="text" name="name" value={announcementData.name} onChange={handleInputChange} />
                <span style={{ color: 'red' }}>{nameError}</span>

                <label htmlFor="subcategories">Select Subcategories:</label>
                <select multiple onChange={(e) => setSelectedSubcategories(Array.from(e.target.selectedOptions, (option) => option.value))} value={selectedSubcategories}>
                    {subcategories.map(subcategory => (
                        <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                    ))}
                </select>

                <label htmlFor="quantity">Ilość:</label>
                <input type="number" name="quantity" value={announcementData.quantity} onChange={handleInputChange} />
                <span style={{ color: 'red' }}>{quantityError}</span>

                <label htmlFor="price">Cena:</label>
                <input type="number" step="0.01" name="price" value={announcementData.price} onChange={handleInputChange} />
                <span style={{ color: 'red' }}>{priceError}</span>

                <label htmlFor="size">Rozmiar:</label>
                <input name="size" value={announcementData.size} onChange={handleInputChange} />
                <span style={{ color: 'red' }}>{sizeError}</span>

                <label htmlFor="description">Opis:</label>
                <textarea name="description" value={announcementData.description} onChange={handleInputChange} />
                <span style={{ color: 'red' }}>{descriptionError}</span>

                <label htmlFor="condition">Stan:</label>
                <input type="text" name="condition" value={announcementData.condition} onChange={handleInputChange} />
                <span style={{ color: 'red' }}>{conditionError}</span>

                <label htmlFor="state">State:</label>
                <input type="text" name="state" value={announcementData.state} onChange={handleInputChange} />
                <span style={{ color: 'red' }}>{stateError}</span>

                <label htmlFor="photoURL">Photo URL:</label>
                <input type="text" name="photoURL" value={announcementData.photoURL} onChange={handleInputChange} />
                <span style={{ color: 'red' }}>{photoURLError}</span>

                <button type="submit">Submit Announcement</button>
            </form>

            {/* Przycisk powrotu do listy ogłoszeń */}
            <Link to="/api/Announcements">Go back to Announcements</Link>
        </div>
    );
};

export default CreateAnnouncement;
