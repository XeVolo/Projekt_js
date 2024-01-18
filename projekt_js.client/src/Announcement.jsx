import React from 'react';
import { Link } from 'react-router-dom';
import './Announcement.css';

const Announcement = ({ announcement }) => {
    return (
        <div>
            <h2>Announcement Details</h2>
            <p>Name: {announcement.name}</p>
            <p>Description: {announcement.description}</p>
            <p>Condition: {announcement.condition}</p>
            <p>Price: {announcement.price}</p>
            <p>Date: {announcement.date}</p>
            <p>State: {announcement.state}</p>

            {/* Przycisk powrotu do listy og³oszeñ */}
            <Link to="/api/Announcement">Back to Announcements</Link>
        </div>
    );
};

export default Announcement;
