import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import Button from '../UI/Button';
import { ArrowRight } from 'lucide-react';
import './Landing.css';

const Landing = () => {
    const { nextStep } = useOnboarding();

    return (
        <div className="landing-page animate-fade-in">
            <div className="hero-content text-center">
                <h1 className="hero-title mb-md">Premium Coffee for<br />Modern Businesses</h1>
                <p className="hero-subtitle mb-lg">
                    Elevate your office or business with freshly roasted, sustainably sourced coffee delivered weekly.
                    Tailored to your team's taste and volume.
                </p>
                <Button onClick={nextStep} className="hero-cta">
                    Get Started <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                </Button>
            </div>

            <div className="hero-features container">
                <div className="feature-item">
                    <h3>Freshly Roasted</h3>
                    <p>Roasted within 48 hours of delivery.</p>
                </div>
                <div className="feature-item">
                    <h3>Flexible Plans</h3>
                    <p>Adjust volume or pause anytime.</p>
                </div>
                <div className="feature-item">
                    <h3>Curated Origins</h3>
                    <p>Beans from the world's best farms.</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;
