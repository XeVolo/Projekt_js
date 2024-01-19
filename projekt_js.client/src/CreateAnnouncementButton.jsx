/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import CreateAnnouncement from './CreateAnnouncement';

const CreateAnnouncementButton = () => {
    return (
        <div className="create-announcement-button">
            <Link to="/CreateAnnouncement">Create Announcement</Link>
        </div>
    );
};

export default CreateAnnouncementButton;