import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Announcement from './Announcement';
import CreateAnnouncement from './CreateAnnouncement';
import CreateAnnouncementButton from './CreateAnnouncementButton';
import './App.css';

function App() {
    const [announcements, setAnnouncements] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [sortByPrice, setSortByPrice] = useState(null);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

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
        setSelectedSubcategories([]);
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
            <div>
                <h1 id="tabelLabel">Advertisement Board</h1>
                <CreateAnnouncementButton />
                <p>This component demonstrates fetching announcement data from the server.</p>

                <label>
                    Wybierz podkategorie:
                    <select multiple value={selectedSubcategories} onChange={handleSubcategoryInputChange}>
                        {subcategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>
                </label>

                <button onClick={handleFilterBySubcategories}>Filtruj po podkategorii</button>
                <button onClick={handleClearSubcategories}>Wyczyœæ podkategorie</button>

                <Routes>
                    <Route path="/CreateAnnouncement" element={<CreateAnnouncement />} />
                </Routes>

                {announcements === undefined ? (
                    <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
                ) : (
                        <div>
                            {selectedAnnouncement ? (
                                <div>
                                    <Announcement announcement={selectedAnnouncement} />
                                    <button onClick={() => setSelectedAnnouncement(null)}>Back to Announcements</button>
                                </div>
                            ) : (
                                <div>
                                    <h2>Announcements</h2>
                                    <div>
                                        <button onClick={() => setSortByPrice('asc')}>Sortuj od najnizszej ceny</button>
                                        <button onClick={() => setSortByPrice('desc')}>Sortuj od najwyzszej ceny</button>
                                        <button onClick={() => setSortByPrice(null)}>Wyczysc sortowanie</button>
                                    </div>
                                    <ul>
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
            </Router>
        );
    }

    export default App;
