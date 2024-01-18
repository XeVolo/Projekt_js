import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Announcement from './Announcement'; // Importuj komponent Announcement
import './App.css';

function App() {
    const [announcements, setAnnouncements] = useState();

    useEffect(() => {
        populateAnnouncementData();
    }, []);

    const contents = announcements === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : (
            <div>
                <h2>Announcements</h2>
                <ul>
                    {announcements.map(announcement =>
                        <li key={announcement.id}>
                            <Link to={`/announcement/${announcement.id}`}>
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
        );

    return (
        <Router>
            <div>
                <h1 id="tabelLabel">Advertisement Board</h1>
                <p>This component demonstrates fetching announcement data from the server.</p>

                {/* Dodaj Routa do komponentu Announcement */}
                <Route path="/announcement/:id" component={Announcement} />

                {contents}
            </div>
        </Router>
    );

    async function populateAnnouncementData() {
        const response = await fetch('api/Announcements'); // U¿yj odpowiedniego endpointu na serwerze ASP.NET Core
        const data = await response.json();
        setAnnouncements(data);
    }
}

export default App;
