/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './Announcement.css';

const Announcement = ({ announcement }) => {
    const announcementDate = new Date(announcement.date);

    // Formatowanie daty
    const formattedDate = announcementDate.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <div>
            <h2>{announcement.name}</h2>
            <img id="annoucement-photo"
                src={announcement.photoUrl}
                alt={`Zdjecie ${announcement.name}`}
                style={{ maxWidth: '125px', maxHeight: '250px' }}
            />  
            <div id="product-info">
            <p>Cena: {announcement.price}zl</p>
                <p>Stan: {announcement.condition}</p>
                <p>Rozmiar: { announcement.size}</p>
                <p>Data dodania: {formattedDate}</p>               
            <p>Opis produktu: {announcement.description}</p>
            </div>
        </div>
    );
};

export default Announcement;
