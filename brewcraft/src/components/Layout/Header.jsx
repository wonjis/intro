import React from 'react';
import { Coffee } from 'lucide-react';
import './Header.css';

const Header = () => {
    return (
        <header className="site-header">
            <div className="container flex-center">
                <div className="logo flex-center">
                    <Coffee size={28} className="logo-icon" />
                    <span className="logo-text">BrewCraft</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
