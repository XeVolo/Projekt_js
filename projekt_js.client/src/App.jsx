/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Announcement from './Announcement';
import CreateAnnouncement from './CreateAnnouncement';
import CreateAnnouncementButton from './CreateAnnouncementButton';
import './App.css';
import Cart from './Cart';
import Order from './Order';

function CartButton() {
    return (
        <Link to="/cart">
            <button>Przejdz do koszyka</button>
        </Link>
    );
}

function App() {
    const [announcements, setAnnouncements] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [sortByPrice, setSortByPrice] = useState(null);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Pobierz og³oszenia
        populateAnnouncementData();
        // Pobierz dostêpne podkategorie
        fetchSubcategories();
    }, []);

    const handleSubcategoryInputChange = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setSelectedSubcategories(selectedIds);
    };

    const handleClearSubcategories = () => {
        populateAnnouncementData();
    };

    const handleFilterBySubcategories = async () => {
        try {
            const response = await fetch('api/Announcements/SearchByCategories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedSubcategories),
            });

            const data = await response.json();
            setAnnouncements(data);
        } catch (error) {
            console.error('B³¹d podczas filtrowania po podkategorii', error);
        }
    };

    const handleAddToCart = (announcement) => {
        setCartItems([...cartItems, announcement.id]);
    };

    const populateAnnouncementData = async () => {
        try {
            const response = await fetch('api/Announcements');
            const data = await response.json();
            setAnnouncements(data);
        } catch (error) {
            console.error('B³¹d podczas pobierania og³oszeñ', error);
        }
    };

    const fetchSubcategories = async () => {
        try {
            const response = await fetch('api/SubCategory');
            const data = await response.json();
            setSubcategories(data);
        } catch (error) {
            console.error('B³¹d podczas pobierania podkategorii', error);
        }
    };

    const getSortedAnnouncements = () => {
        if (sortByPrice === 'asc') {
            return announcements.slice().sort((a, b) => a.price - b.price);
        } else if (sortByPrice === 'desc') {
            return announcements.slice().sort((a, b) => b.price - a.price);
        } else {
            return announcements.slice();
        }
    };

    return (
        <Router>
            <header>
                <h1 id="StoreName">Lumpeks pumpeks</h1>
            </header>
            <div>                            
                <CreateAnnouncementButton />
                <div className="grid-container">
                    <div className="narrow-column subcategory-container">
                        <h2>Kategorie</h2>
                        <select id="subcategorySelect" multiple value={selectedSubcategories} onChange={handleSubcategoryInputChange}>
                            {subcategories.map(subcategory => (
                                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                            ))}
                        </select>
                        <div className="button-container">
                            <button onClick={handleFilterBySubcategories}>Filtruj</button>
                            <button onClick={handleClearSubcategories}>Wyczysc filtry</button>
                        </div>
                    </div>

                    <div className="regular-column subcategory-container">
                        {/* Kolumna 2 - Analogiczny kod jak dla pierwszej kolumny */}
                    </div>

                    <div className="narrow-column subcategory-container">
                        <h2>Sortowanie</h2>
                        <div className="button-container">
                            <button onClick={() => setSortByPrice('asc')}>Sortuj od najnizszej ceny</button>
                            <button onClick={() => setSortByPrice('desc')}>Sortuj od najwyzszej ceny</button>
                            <button onClick={() => setSortByPrice(null)}>Wyczysc sortowanie</button>
                        </div>
                    </div>

                </div>                     

                <Routes>
                    <Route path="/CreateAnnouncement" element={<CreateAnnouncement />} />
                    <Route
                        path="/Cart"
                        element={<Cart cartItems={cartItems} announcements={getSortedAnnouncements()} />}
                    />
                    <Route path="/Order" element={<Order />} />
                </Routes>

                <CartButton />

                {announcements === undefined ? (
                    <p><em>£adowanie produktów</em></p>
                ) : (
                    <div className="annoucement-container">
                            {selectedAnnouncement ? (
                                <div>
                                    <Announcement announcement={selectedAnnouncement} />
                                    <button onClick={() => setSelectedAnnouncement(null)}>Back to Announcements</button>
                                </div>
                            ) : (
                                <div>
                                    <h2>Produkty</h2>

                                        <ul className="announcement-list">
                                        {getSortedAnnouncements().map(announcement => (
                                            <li key={announcement.id}>
                                                <Link
                                                    to={`/api/Announcements/${announcement.id}`}
                                                    onClick={() => setSelectedAnnouncement(announcement)}
                                                >
                                                    <h3>{announcement.name}</h3>
                                                </Link>
                                                <p>Description: {announcement.description}</p>
                                                <p>Condition: {announcement.condition}</p>
                                                <p>Price: {announcement.price}</p>
                                                <p>Date: {announcement.date}</p>
                                                <p>State: {announcement.state}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
            </div>
            <footer>
                <p>&copy; 2024 Lumpeks pumpeks. Wszelkie prawa zastrze¿one.</p>
            </footer>
            </Router>
        );
    }

export { App as default, CartButton };
