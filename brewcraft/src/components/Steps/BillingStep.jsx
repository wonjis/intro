import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import Button from '../UI/Button';
import './Steps.css';

const BillingStep = () => {
    const { formData, updateNestedData, nextStep, prevStep } = useOnboarding();
    const { billingDetails } = formData;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        updateNestedData('billingDetails', name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation could go here
        nextStep();
    };

    return (
        <div className="step-container animate-fade-in">
            <h2 className="step-title text-center mb-lg">Finalize your subscription</h2>

            <form onSubmit={handleSubmit} className="billing-form">
                <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        className="form-input"
                        value={billingDetails.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Contact Person</label>
                    <input
                        type="text"
                        name="contactPerson"
                        className="form-input"
                        value={billingDetails.contactPerson}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Billing Address</label>
                    <input
                        type="text"
                        name="billingAddress"
                        className="form-input"
                        value={billingDetails.billingAddress}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="flex-center" style={{ justifyContent: 'flex-start' }}>
                        <input
                            type="checkbox"
                            name="sameAsBilling"
                            checked={billingDetails.sameAsBilling}
                            onChange={handleChange}
                            style={{ marginRight: '8px' }}
                        />
                        <span>Delivery address same as billing</span>
                    </label>
                </div>

                {!billingDetails.sameAsBilling && (
                    <div className="form-group animate-fade-in">
                        <label className="form-label">Delivery Address</label>
                        <input
                            type="text"
                            name="deliveryAddress"
                            className="form-input"
                            value={billingDetails.deliveryAddress}
                            onChange={handleChange}
                        />
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">Preferred Delivery Day</label>
                    <select
                        name="deliveryDay"
                        className="form-input"
                        value={billingDetails.deliveryDay}
                        onChange={handleChange}
                    >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Payment Method</label>
                    <div className="payment-placeholder p-md border rounded bg-light">
                        {/* Placeholder for Stripe/Payment Element */}
                        <p className="text-muted text-center" style={{ padding: '1rem', border: '1px dashed #ccc', borderRadius: '4px' }}>
                            Credit Card Input (Secure Integration)
                        </p>
                    </div>
                </div>

                <div className="actions">
                    <Button variant="ghost" onClick={prevStep}>Back</Button>
                    <Button type="submit">Complete Setup</Button>
                </div>
            </form>
        </div>
    );
};

export default BillingStep;
