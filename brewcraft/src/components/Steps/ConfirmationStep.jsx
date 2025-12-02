import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import Button from '../UI/Button';
import { CheckCircle } from 'lucide-react';

const ConfirmationStep = () => {
    const { formData } = useOnboarding();

    return (
        <div className="step-container animate-fade-in text-center" style={{ marginTop: '4rem' }}>
            <div className="flex-center mb-lg">
                <CheckCircle size={64} color="var(--color-success)" />
            </div>

            <h2 className="step-title mb-md">Welcome to BrewCraft!</h2>
            <p className="step-subtitle mb-xl">
                Your subscription is set up. We're excited to fuel your team at <strong>{formData.billingDetails.companyName}</strong>.
            </p>

            <div className="confirmation-card p-lg border rounded mb-xl text-left" style={{ maxWidth: '500px', margin: '0 auto 2rem auto', backgroundColor: 'var(--color-white)' }}>
                <h4 className="mb-md border-bottom pb-sm">Next Steps</h4>
                <ul style={{ paddingLeft: '1.5rem' }}>
                    <li className="mb-sm">You will receive a confirmation email shortly.</li>
                    <li className="mb-sm">Your first delivery of <strong>{formData.weeklyVolume}kg</strong> is scheduled for next <strong>{formData.billingDetails.deliveryDay}</strong>.</li>
                    <li>Our account manager will reach out to schedule a machine calibration if needed.</li>
                </ul>
            </div>

            <Button onClick={() => window.location.reload()}>Return to Home</Button>
        </div>
    );
};

export default ConfirmationStep;
