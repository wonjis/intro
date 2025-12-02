import React, { createContext, useContext, useState, useEffect } from 'react';

const OnboardingContext = createContext();

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyType: '',
    weeklyVolume: 5, // Default 5kg
    preferencePathway: '', // 'recommendation' or 'custom'
    // Recommendation Path
    recommendationType: '', // 'classic' or 'unique'
    includeDecaf: false,
    // Custom Path
    customVarietiesCount: 1,
    customPreferences: {
      roastLevel: '',
      flavors: [],
      selectedBeans: [], // Array of bean objects
    },
    billingDetails: {
      companyName: '',
      contactPerson: '',
      billingAddress: '',
      deliveryAddress: '',
      sameAsBilling: true,
      paymentMethod: 'credit_card',
      deliveryDay: 'Monday',
    },
  });

  const [pricing, setPricing] = useState({
    monthlyTotal: 0,
    pricePerKg: 0,
  });

  // Simple pricing logic for demo purposes
  useEffect(() => {
    let basePricePerKg = 25; // Base price

    // Adjust based on volume (bulk discount)
    if (formData.weeklyVolume >= 10) basePricePerKg -= 2;
    if (formData.weeklyVolume >= 20) basePricePerKg -= 4;

    // Adjust based on premium selection
    if (formData.preferencePathway === 'recommendation' && formData.recommendationType === 'unique') {
      basePricePerKg += 5;
    }
    if (formData.preferencePathway === 'custom') {
      basePricePerKg += 3; // Custom handling fee
      // Add cost for multiple varieties?
      if (formData.customVarietiesCount > 1) {
        basePricePerKg += (formData.customVarietiesCount - 1) * 1;
      }
    }

    const weeklyCost = basePricePerKg * formData.weeklyVolume;
    const monthlyCost = weeklyCost * 4; // Approx 4 weeks

    setPricing({
      monthlyTotal: monthlyCost,
      pricePerKg: basePricePerKg,
    });
  }, [formData.weeklyVolume, formData.preferencePathway, formData.subOption]);

  const updateData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedData = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));
  const goToStep = (step) => setCurrentStep(step);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        formData,
        pricing,
        updateData,
        updateNestedData,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
