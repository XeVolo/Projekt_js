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
    const [quantityError, setQuantityError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [sizeError, setSizeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [conditionError, setConditionError] = useState('');
    const [photoURLError, setPhotoURLError] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [announcementSubmitted, setAnnouncementSubmitted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncementData({ ...announcementData, [name]: value });
    };
    const handleSubcategoryInputChange = (e) => {
        const clickedSubcategoryId = parseInt(e.target.value);
        const updatedSubcategories = [...selectedSubcategories];

        if (e.target.checked) {

            updatedSubcategories.push(clickedSubcategoryId);
        } else {

            const index = updatedSubcategories.indexOf(clickedSubcategoryId);
            if (index !== -1) {
                updatedSubcategories.splice(index, 1);
            }
        }

        setSelectedSubcategories(updatedSubcategories);
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

                <label htmlFor="subcategories">Wybierz kategorie:</label>
                {subcategories.map(subcategory => (
                    <label key={subcategory.id}>
                        <input
                            type="checkbox"
                            id={`subcategoryCheckbox_${subcategory.id}`}
                            value={subcategory.id}
                            checked={selectedSubcategories.includes(subcategory.id)}
                            onChange={handleSubcategoryInputChange}
                        />
                        {subcategory.name}
                    </label>
                ))}

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
