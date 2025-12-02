import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} BrewCraft Coffee Roasters. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
