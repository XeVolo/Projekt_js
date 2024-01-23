import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CreateAnnouncement.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

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
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [announcementSubmitted, setAnnouncementSubmitted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

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

    useEffect(() => {
        fetchSubcategories();
    }, []);

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
                console.log('Announcement submitted successfully.');
                setAnnouncementSubmitted(true);
                openModal();
            } else {
                console.error('Failed to submit announcement.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAnnouncementSubmitted(false);
        navigate('/api/Announcements');
    };

    return (
        <div>
            <h2>Create New Announcement</h2>
            {announcementSubmitted && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Announcement Submitted"
                >
                    <div>
                        <p>Dodano ogłoszenie!</p>
                        <button onClick={closeModal}>OK</button>
                    </div>
                </Modal>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nazwa:</label>
                <input type="text" name="name" value={announcementData.name} onChange={handleInputChange} />
                <span style={{ color: 'red' }}>{nameError}</span>

                {/* Lista rozwijana z checkboxami dla subkategorii */}
                <label htmlFor="subcategories">Select Subcategories:</label>
                <select multiple onChange={(e) => setSelectedSubcategories(Array.from(e.target.selectedOptions, (option) => option.value))} value={selectedSubcategories}>
                    {subcategories.map(subcategory => (
                        <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                    ))}
                </select>

                <label htmlFor="quantity">Ilość:</label>
                <input type="number" name="quantity" value={announcementData.quantity} onChange={handleInputChange} />

                <label htmlFor="price">Cena:</label>
                <input type="number" name="price" value={announcementData.price} onChange={handleInputChange} />

                <label htmlFor="size">Rozmiar:</label>
                <input name="size" value={announcementData.size} onChange={handleInputChange} />

                <label htmlFor="description">Opis:</label>
                <textarea name="description" value={announcementData.description} onChange={handleInputChange} />

                <label htmlFor="condition">Stan:</label>
                <input type="text" name="condition" value={announcementData.condition} onChange={handleInputChange} />

                <label htmlFor="photoURL">Photo URL:</label>
                <input type="text" name="photoURL" value={announcementData.photoURL} onChange={handleInputChange} />

                <button type="submit">Submit Announcement</button>
            </form>

            {/* Przycisk powrotu do listy ogłoszeń */}
            <Link to="/api/Announcements">Go back to Announcements</Link>
        </div>
    );
};

export default CreateAnnouncement;
