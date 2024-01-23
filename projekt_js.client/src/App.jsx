/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Announcement from './Announcement';
import CreateAnnouncement from './CreateAnnouncement';
import CreateAnnouncementButton from './CreateAnnouncementButton';
import './App.css';
import Cart from './Cart';
import Order from './Order';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';

Modal.setAppElement('#root'); // Ustaw element g³ówny (zmieñ '#root' na odpowiedni selektor dla Twojej aplikacji)

function CartButton() {
    return (
        <Link to="/cart" style={{ float: 'right', marginRight: '50px' }}>
            <button>
                <img src="/src/assets/shopping-cart.png" alt="Koszyk" style={{ width: '20px', height: '20px', marginRight: '5px'}} />
            </button>
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
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        populateAnnouncementData();
        fetchSubcategories();
        console.log('cartItems updated:', cartItems);
    }, [cartItems]);

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

    const handleBackButtonClick = () => {
        setSelectedAnnouncement(null);
    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    const removeFromCart = (itemId) => {
        console.log('Removing item with ID:', itemId);

        const index = cartItems.indexOf(itemId);
        if (index !== -1) {
            console.log('Index of item to remove:', index);

            const updatedCart = [...cartItems];
            updatedCart.splice(index, 1);

            console.log('Updated cart after removal:', updatedCart);
            setCartItems(updatedCart);
        }
    };

    const handleSearch = async (searchTerm) => {      
        if (!searchTerm || searchTerm.trim() === '') {
            console.error('Puste wyszukiwanie.');
            return;
        }
        try {
            const response = await fetch(`api/Announcements/SearchByName?searchTerm=${encodeURIComponent(searchTerm)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setAnnouncements(data);
        } catch (error) {
            console.error('B³¹d podczas wyszukiwania', error);
        }
    };

    return (
        <Router>
            <header>
                <Link to="/" onClick={handleBackButtonClick}>
                <h1>
                
                    <span id="StoreName" style={{ cursor: 'pointer' }}>
                        <img src="/src/assets/logo.png" alt="Logo" />
                    </span>               
                    <CartButton />
                </h1>
                </Link>
            </header>
            <div>                            
                <CreateAnnouncementButton />
                <Routes>
                    <Route path="/CreateAnnouncement" element={<CreateAnnouncement />} />
                    <Route
                        path="/Cart"
                        element={<Cart cartItems={cartItems} announcements={getSortedAnnouncements()} removeFromCart={removeFromCart} />}
                    />
                    <Route path="/Order" element={<Order cartItems={cartItems} announcements={getSortedAnnouncements()} />} />
                </Routes>
                <div className="grid-container">
                    <div className="narrow-column subcategory-container">
                        <h2>Kategorie</h2>
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
                        <div className="button-container">
                            <button onClick={handleFilterBySubcategories}>Filtruj</button>
                            <button onClick={handleClearSubcategories}>Wyczysc filtry</button>
                        </div>
                    </div>

                    <div className="regular-column">
                        <h2 style={{ display: 'inline-block' }}>Wyszukaj</h2> <br />
                        <input
                            type="text"
                            placeholder="Wyszukaj ogloszenia..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            onKeyPress={handleEnterPress}
                            style={{
                                width: '80%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc', 
                            }}
                        />
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

               

                

                {announcements === undefined ? (
                    <p><em>Ladowanie produktow</em></p>
                ) : (
                    <div className="annoucement-container">
                            {selectedAnnouncement ? (
                                <div>
                                    <Announcement announcement={selectedAnnouncement} />
                                    <button onClick={handleBackButtonClick}>Cofnij do strony glownej</button>
                                </div>
                            ) : (
                                <div>
                                    <h2>Nasze produkty</h2>
                                        <ul className="announcement-list">
                                            {getSortedAnnouncements().map(announcement => (
                                            <li key={announcement.id}>
                                                    <h2>{announcement.name}</h2>
                                                      <Link onClick={() => setSelectedAnnouncement(announcement)}>
                                                       <img
                                                           src={announcement.photoUrl}
                                                           alt={`Zdjecie ${announcement.name}`}
                                                           style={{ maxWidth: '125px', maxHeight: '250px' }}
                                                        />    
                                                    </Link>    
                                                    <p>Rozmiar: { announcement.size}</p>
                                                    <p>Cena: {announcement.price}zl</p>  
                                                
                                                <button onClick={() => handleAddToCart(announcement)}>Dodaj do koszyka</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
            </div>
            <footer>
                <p>&copy; 2024 Lumpeks pumpeks. Wszelkie prawa zastrzezone.</p>
            </footer>
            </Router>
        );
    }

export { App as default, CartButton };
