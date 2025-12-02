import React, { useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import Button from '../UI/Button';
import Card from '../UI/Card';
import { Sparkles, Settings, Coffee, Leaf, Plus, Trash2, Check } from 'lucide-react';
import './PreferenceStep.css';

// Mock Bean Data
const AVAILABLE_BEANS = [
    { id: 'ethiopia-yirg', name: 'Ethiopia Yirgacheffe', roast: 'Light', flavor: 'Floral, Citrus' },
    { id: 'colombia-huila', name: 'Colombia Huila', roast: 'Medium', flavor: 'Nutty, Caramel' },
    { id: 'brazil-santos', name: 'Brazil Santos', roast: 'Medium-Dark', flavor: 'Chocolate, Nutty' },
    { id: 'sumatra-mand', name: 'Sumatra Mandheling', roast: 'Dark', flavor: 'Earthy, Spicy' },
    { id: 'guatemala-ant', name: 'Guatemala Antigua', roast: 'Medium', flavor: 'Spicy, Cocoa' },
    { id: 'kenya-aa', name: 'Kenya AA', roast: 'Light-Medium', flavor: 'Berry, Wine' },
];

const PreferenceStep = () => {
    const { formData, updateData, updateNestedData, nextStep, prevStep } = useOnboarding();
    const [isAddingBean, setIsAddingBean] = useState(false);

    // --- Handlers ---

    const handlePathwaySelect = (pathway) => {
        updateData('preferencePathway', pathway);
    };

    // Recommendation Handlers
    const handleRecTypeSelect = (type) => {
        updateData('recommendationType', type);
    };

    const toggleRecDecaf = () => {
        updateData('includeDecaf', !formData.includeDecaf);
    };

    // Custom Handlers
    const handleVarietyCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        if (count > 0) updateData('customVarietiesCount', count);
    };

    const setRoast = (level) => {
        updateNestedData('customPreferences', 'roastLevel', level);
    };

    const toggleFlavor = (flavor) => {
        const current = formData.customPreferences.flavors;
        const updated = current.includes(flavor)
            ? current.filter(f => f !== flavor)
            : [...current, flavor];
        updateNestedData('customPreferences', 'flavors', updated);
    };

    const addBean = (bean) => {
        const current = formData.customPreferences.selectedBeans;
        if (!current.find(b => b.id === bean.id)) {
            updateNestedData('customPreferences', 'selectedBeans', [...current, bean]);
        }
        setIsAddingBean(false);
    };

    const removeBean = (beanId) => {
        const current = formData.customPreferences.selectedBeans;
        updateNestedData('customPreferences', 'selectedBeans', current.filter(b => b.id !== beanId));
    };

    // --- Render Helpers ---

    const renderRecommendationPath = () => (
        <div className="animate-fade-in">
            <h3 className="text-center mb-md">Choose your style</h3>
            <div className="grid-cards mb-lg">
                <Card
                    selected={formData.recommendationType === 'classic'}
                    onClick={() => handleRecTypeSelect('classic')}
                >
                    <Coffee size={24} className="icon" />
                    <h3>Simple & Classic</h3>
                    <p>Comforting, nutty, chocolatey notes.</p>
                </Card>
                <Card
                    selected={formData.recommendationType === 'unique'}
                    onClick={() => handleRecTypeSelect('unique')}
                >
                    <Leaf size={24} className="icon" />
                    <h3>Unique & Premium</h3>
                    <p>Fruity, floral, and complex flavors.</p>
                </Card>
            </div>

            <div className="decaf-option text-center mb-xl">
                <label className="flex-center" style={{ cursor: 'pointer', gap: '10px' }}>
                    <input
                        type="checkbox"
                        checked={formData.includeDecaf}
                        onChange={toggleRecDecaf}
                        style={{ width: '20px', height: '20px' }}
                    />
                    <span>Include Non-Caffeine Options</span>
                </label>
            </div>
        </div>
    );

    const renderCustomPath = () => (
        <div className="animate-fade-in custom-options-container">

            {/* 1. Variety Count */}
            <div className="form-group mb-lg">
                <label className="form-label">Number of Varieties</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    className="form-input"
                    value={formData.customVarietiesCount}
                    onChange={handleVarietyCountChange}
                    style={{ maxWidth: '100px' }}
                />
            </div>

            {/* 2. Roast Level */}
            <div className="mb-lg">
                <h4 className="mb-sm">Preferred Roast Level</h4>
                <div className="flex-gap">
                    {['Light', 'Medium', 'Dark'].map(level => (
                        <Button
                            key={level}
                            variant={formData.customPreferences.roastLevel === level ? 'primary' : 'outline'}
                            onClick={() => setRoast(level)}
                            className="mr-sm"
                        >
                            {level}
                        </Button>
                    ))}
                </div>
            </div>

            {/* 3. Flavors */}
            <div className="mb-lg">
                <h4 className="mb-sm">Desired Flavors (Multi-select)</h4>
                <div className="flex-gap flex-wrap">
                    {['Nutty', 'Floral', 'Fruity', 'Chocolatey', 'Spicy'].map(flavor => (
                        <Button
                            key={flavor}
                            variant={formData.customPreferences.flavors.includes(flavor) ? 'secondary' : 'outline'}
                            onClick={() => toggleFlavor(flavor)}
                            className="mr-sm mb-sm"
                        >
                            {flavor}
                        </Button>
                    ))}
                </div>
            </div>

            {/* 4. Bean Selection List */}
            <div className="mb-lg">
                <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4>Selected Beans</h4>
                    <Button variant="ghost" onClick={() => setIsAddingBean(true)} disabled={isAddingBean}>
                        <Plus size={16} style={{ marginRight: '4px' }} /> Add Bean
                    </Button>
                </div>

                {/* Selected List */}
                <div className="selected-beans-list mb-md">
                    {formData.customPreferences.selectedBeans.length === 0 && (
                        <p className="text-muted text-sm">No beans selected. We will recommend based on your preferences.</p>
                    )}
                    {formData.customPreferences.selectedBeans.map(bean => (
                        <div key={bean.id} className="bean-item">
                            <div>
                                <strong>{bean.name}</strong>
                                <span className="text-muted text-sm"> ({bean.roast}, {bean.flavor})</span>
                            </div>
                            <button className="icon-btn-danger" onClick={() => removeBean(bean.id)}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add Bean Modal/Dropdown Area */}
                {isAddingBean && (
                    <div className="bean-selector-dropdown animate-fade-in">
                        <h5>Select a bean to add:</h5>
                        <div className="bean-options-list">
                            {AVAILABLE_BEANS.map(bean => (
                                <div
                                    key={bean.id}
                                    className="bean-option"
                                    onClick={() => addBean(bean)}
                                >
                                    <span>{bean.name}</span>
                                    <span className="text-muted text-sm">{bean.roast}</span>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" onClick={() => setIsAddingBean(false)} className="mt-sm">Cancel</Button>
                    </div>
                )}
            </div>

            {/* 5. Non-Caffeine */}
            <div className="mb-lg">
                <label className="flex-center" style={{ justifyContent: 'flex-start', cursor: 'pointer', gap: '10px' }}>
                    <input
                        type="checkbox"
                        checked={formData.includeDecaf}
                        onChange={toggleRecDecaf} // Reusing the same toggle as it updates the same field
                        style={{ width: '20px', height: '20px' }}
                    />
                    <span>Include Non-Caffeine Options</span>
                </label>
            </div>

        </div>
    );

    return (
        <div className="step-container animate-fade-in">
            <h2 className="step-title text-center mb-lg">Customize your coffee experience</h2>

            {/* Main Pathway Selection */}
            <div className="grid-cards mb-xl">
                <Card
                    selected={formData.preferencePathway === 'recommendation'}
                    onClick={() => handlePathwaySelect('recommendation')}
                >
                    <Sparkles size={32} className="icon" />
                    <h3>Get Recommendations</h3>
                    <p>We'll curate the best beans for you.</p>
                </Card>
                <Card
                    selected={formData.preferencePathway === 'custom'}
                    onClick={() => handlePathwaySelect('custom')}
                >
                    <Settings size={32} className="icon" />
                    <h3>Custom Your Own</h3>
                    <p>You know what you want. Build your profile.</p>
                </Card>
            </div>

            {/* Render Sub-Content based on Pathway */}
            {formData.preferencePathway === 'recommendation' && renderRecommendationPath()}
            {formData.preferencePathway === 'custom' && renderCustomPath()}

            <div className="actions">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button
                    onClick={nextStep}
                    disabled={
                        !formData.preferencePathway ||
                        (formData.preferencePathway === 'recommendation' && !formData.recommendationType)
                    }
                >
                    See Pricing
                </Button>
            </div>
        </div>
    );
};

export default PreferenceStep;
