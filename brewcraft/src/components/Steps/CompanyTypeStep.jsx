import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import Card from '../UI/Card';
import { Briefcase, Scissors, ShoppingBag, Hotel, Palette, Utensils, Rocket } from 'lucide-react';
import './Steps.css'; // Shared step styles

const COMPANY_TYPES = [
    { id: 'startup', label: 'Startup', icon: Rocket },
    { id: 'professional', label: 'Professional Services', icon: Briefcase },
    { id: 'beauty', label: 'Beauty & Wellness', icon: Scissors },
    { id: 'retail', label: 'Retail & Lifestyle', icon: ShoppingBag },
    { id: 'hospitality', label: 'Hospitality', icon: Hotel },
    { id: 'creative', label: 'Creatives & Studios', icon: Palette },
    { id: 'fnb', label: 'Non-Cafe F&B', icon: Utensils },
];

const CompanyTypeStep = () => {
    const { formData, updateData, nextStep } = useOnboarding();

    const handleSelect = (id) => {
        updateData('companyType', id);
        // Add a small delay for better UX before moving next
        setTimeout(() => nextStep(), 300);
    };

    return (
        <div className="step-container animate-fade-in">
            <h2 className="step-title text-center mb-lg">What type of business are you?</h2>
            <div className="grid-cards">
                {COMPANY_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                        <Card
                            key={type.id}
                            selected={formData.companyType === type.id}
                            onClick={() => handleSelect(type.id)}
                        >
                            <Icon size={32} className="icon" />
                            <h3>{type.label}</h3>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default CompanyTypeStep;
