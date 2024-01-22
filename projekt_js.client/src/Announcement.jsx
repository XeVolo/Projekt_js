/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './Announcement.css';

const Announcement = ({ announcement }) => {
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
            <p>Data dodania: {announcement.date}</p>
            <p>Opis produktu: {announcement.description}</p>
            </div>
        </div>
    );
};

export default Announcement;
