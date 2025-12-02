import React from 'react';
import './Card.css';

const Card = ({
    children,
    selected = false,
    onClick,
    className = ''
}) => {
    return (
        <div
            className={`selection-card ${selected ? 'selected' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
