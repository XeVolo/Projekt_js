/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Announcement from './Announcement';
import CreateAnnouncement from './CreateAnnouncement';
import CreateAnnouncementButton from './CreateAnnouncementButton'; // Import nowego komponentu
import './App.css';

function App() {
    const [announcements, setAnnouncements] = useState();
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    useEffect(() => {
        populateAnnouncementData();
    }, []);

    const handleAnnouncementClick = (announcement) => {
        setSelectedAnnouncement(announcement);
    };

    const handleBackToAnnouncementsClick = () => {
        setSelectedAnnouncement(null);
    };

    const contents = announcements === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : (
            <div>
                {selectedAnnouncement ? (
                    // Render Announcement details if an announcement is selected
                    <div>
                        <Announcement announcement={selectedAnnouncement} />
                        <button onClick={handleBackToAnnouncementsClick}>Back to Announcements</button>
                    </div>
                ) : (
                    // Render the list of announcements
                    <div>
                        <h2>Announcements</h2>
                        <ul>
                            {announcements.map(announcement =>
                                <li key={announcement.id}>
                                    <Link
                                        to={`/api/Announcements/${announcement.id}`}
                                        onClick={() => handleAnnouncementClick(announcement)}
                                    >
                                        <h3>{announcement.name}</h3>
                                    </Link>
                                    <p>Description: {announcement.description}</p>
                                    <p>Condition: {announcement.condition}</p>
                                    <p>Price: {announcement.price}</p>
                                    <p>Date: {announcement.date}</p>
                                    <p>State: {announcement.state}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        );

    return (
        <Router>
            <div>
                <h1 id="tabelLabel">Advertisement Board</h1>
                <CreateAnnouncementButton /> {/* Dodaj przycisk Create Announcement */}
                <p>This component demonstrates fetching announcement data from the server.</p>

                <Routes>
                    <Route path="/CreateAnnouncement" element={<CreateAnnouncement />} />
                </Routes>

                {contents}
            </div>
        </Router>
    );

    async function populateAnnouncementData() {
        const response = await fetch('api/Announcements');
        const data = await response.json();
        setAnnouncements(data);
    }
}

export default App;
