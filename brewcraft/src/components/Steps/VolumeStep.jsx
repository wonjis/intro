import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import Button from '../UI/Button';
import './VolumeStep.css';

const VolumeStep = () => {
    const { formData, updateData, nextStep, prevStep } = useOnboarding();

    const handleChange = (e) => {
        updateData('weeklyVolume', parseInt(e.target.value, 10));
    };

    return (
        <div className="step-container animate-fade-in text-center">
            <h2 className="step-title mb-md">How much coffee do you need weekly?</h2>
            <p className="step-subtitle">Estimate your team's consumption. You can adjust this later.</p>

            <div className="volume-control-container">
                <div className="volume-display">
                    <span className="volume-value">{formData.weeklyVolume}</span>
                    <span className="volume-unit">kg</span>
                </div>

                <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={formData.weeklyVolume}
                    onChange={handleChange}
                    className="volume-slider"
                />

                <div className="volume-labels">
                    <span>1kg</span>
                    <span>10kg</span>
                    <span>20kg+</span>
                </div>

                <div className="volume-insight">
                    <p>
                        {formData.weeklyVolume < 5
                            ? "Perfect for small teams (approx. 50-100 cups/week)"
                            : formData.weeklyVolume < 10
                                ? "Great for mid-sized offices (approx. 200-400 cups/week)"
                                : "High volume for bustling spaces (500+ cups/week)"}
                    </p>
                </div>
            </div>

            <div className="actions">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next</Button>
            </div>
        </div>
    );
};

export default VolumeStep;
