import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentStep, totalSteps }) => {
    const progress = ((currentStep) / (totalSteps - 1)) * 100;

    return (
        <div className="progress-container container">
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="steps-indicator flex-center">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                        key={index}
                        className={`step-dot ${index <= currentStep ? 'active' : ''}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;
