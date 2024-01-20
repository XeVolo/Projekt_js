/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './Announcement.css';

const Announcement = ({ announcement }) => {
    return (
        <div>
            <h2>{announcement.name}</h2>
            <p>Zdjêcie: {announcement.photoURL}</p>
            <p>Opis produktu: {announcement.description}</p>
            <p>Stan: {announcement.condition}</p>
            <p>Cena: {announcement.price}</p>
            <p>Data dodania: {announcement.date}</p>

        </div>
    );
};

export default Announcement;
