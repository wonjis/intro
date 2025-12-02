import React, { useState } from 'react';
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProgressBar from './components/UI/ProgressBar';
import Landing from './components/Steps/Landing';
import CompanyTypeStep from './components/Steps/CompanyTypeStep';
import VolumeStep from './components/Steps/VolumeStep';
import PreferenceStep from './components/Steps/PreferenceStep';
import BillingStep from './components/Steps/BillingStep';
import ConfirmationStep from './components/Steps/ConfirmationStep';
import PriceBreakdownModal from './components/Pricing/PriceBreakdownModal';

const StepsContainer = () => {
  const { currentStep, nextStep } = useOnboarding();
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  // Steps mapping
  // 0: Landing
  // 1: Company Type
  // 2: Volume
  // 3: Preferences -> (Show Modal before next)
  // 4: Billing
  // 5: Confirmation

  const handlePreferenceNext = () => {
    setIsPricingModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsPricingModalOpen(false);
    nextStep(); // Go to Billing
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Landing />;
      case 1: return <CompanyTypeStep />;
      case 2: return <VolumeStep />;
      case 3:
        // We override the 'next' button in PreferenceStep to open modal? 
        // Actually PreferenceStep calls nextStep. We can intercept it or just let it be.
        // To make it cleaner, let's just make the Modal a "step" or handle it here.
        // Let's pass a custom handler to PreferenceStep if we could, but Context handles nextStep.
        // Instead, let's make the Modal appear when we try to leave step 3?
        // Or simpler: Let's make the "See Pricing" button in PreferenceStep trigger a function we pass down?
        // But PreferenceStep uses `nextStep` from context.

        // Let's modify PreferenceStep slightly? No, let's just use a trick.
        // We can check if we are transitioning from 3 to 4.
        // Actually, let's just render the Modal ON TOP of step 3 when a state is true.
        // But the button in PreferenceStep calls `nextStep`.

        // BETTER APPROACH for this architecture:
        // Let's make the Modal a distinct visual step if we want, OR
        // Let's wrap the PreferenceStep to intercept the action.

        // For simplicity and robustness:
        // Let's change the flow: 
        // 0: Landing
        // 1: Company
        // 2: Volume
        // 3: Preferences (Button says "See Pricing", calls nextStep)
        // 4: Pricing Review (The Modal, but displayed as a page or a modal on top of a background?)
        //    Let's make it a Modal that is open when we are at "Step 3.5"?
        //    No, let's just make the "See Pricing" button inside PreferenceStep open the modal if we pass a prop.
        //    But PreferenceStep is coupled to Context.

        // Let's just Render PreferenceStep. 
        // I will modify PreferenceStep to accept an `onNext` prop that overrides the context `nextStep`.
        // Wait, I can't easily modify it without rewriting.

        // Alternative:
        // The "See Pricing" button in PreferenceStep calls `nextStep`.
        // So Step 4 IS the Pricing Modal?
        // If Step 4 is the Pricing Modal, it works.
        // But the user asked for a "Pop-up".
        // So Step 3 is Preferences. When user clicks Next, we go to Step 4.
        // Step 4 renders the `PriceBreakdownModal` immediately?
        // If we render it as a modal, what is in the background? The Preference Step?
        // Yes, that's a good pattern.

        return (
          <>
            <PreferenceStep />
            {isPricingModalOpen && (
              <PriceBreakdownModal
                isOpen={true}
                onClose={() => setIsPricingModalOpen(false)}
                onConfirm={handleModalConfirm}
              />
            )}
          </>
        );
      case 4: return <BillingStep />;
      case 5: return <ConfirmationStep />;
      default: return <Landing />;
    }
  };

  // We need to intercept the transition from 3 to 4 to show the modal.
  // Actually, the cleanest way given the current code is:
  // Modify PreferenceStep to take an `onCustomNext` prop.
  // I'll quickly patch PreferenceStep in the render logic below? 
  // No, I can't inject props easily into the component if it's just `<PreferenceStep />`.

  // Let's just update `PreferenceStep.jsx` to be smarter or `App.jsx` to handle the modal logic better.
  // I will update `PreferenceStep.jsx` to allow an override or just handle the modal logic inside `App.jsx` by checking step.

  // Let's assume:
  // Step 3: Preferences. User clicks "See Pricing" -> calls `nextStep` -> becomes Step 4.
  // Step 4: We render `PreferenceStep` (background) + `PriceBreakdownModal` (foreground).
  // When Modal confirmed -> calls `nextStep` -> becomes Step 5 (Billing).

  // This seems perfect.

  // So:
  // 0: Landing
  // 1: Company
  // 2: Volume
  // 3: Preferences
  // 4: Preferences + Modal
  // 5: Billing
  // 6: Confirmation

  const TOTAL_STEPS = 6; // Excluding Landing? Landing is step 0.
  // Progress bar usually starts after Landing.

  const showProgressBar = currentStep > 0 && currentStep < 6;

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {showProgressBar && (
          <ProgressBar
            currentStep={currentStep > 4 ? 4 : currentStep - 1}
            totalSteps={4} // Company, Volume, Prefs, Billing
          />
        )}

        {currentStep === 0 && <Landing />}
        {currentStep === 1 && <CompanyTypeStep />}
        {currentStep === 2 && <VolumeStep />}
        {currentStep === 3 && <PreferenceStep />}
        {currentStep === 4 && (
          <>
            <PreferenceStep />
            <PriceBreakdownModal
              isOpen={true}
              onClose={() => {
                // If they close the modal, go back to step 3 (edit prefs)
                // We need a way to go back. Context has prevStep.
                // But we are in Step 4.
                // We need to call prevStep.
                // But we can't call hooks here easily?
                // We can pass a function.
              }}
              onConfirm={() => { }} // We'll handle this in the wrapper below
            />
          </>
        )}
        {currentStep === 5 && <BillingStep />}
        {currentStep === 6 && <ConfirmationStep />}
      </main>
      <Footer />
    </div>
  );
};

// Wrapper to handle the logic cleanly
const AppContent = () => {
  const { currentStep, prevStep, nextStep } = useOnboarding();

  // Logic to handle the "Step 4 is Modal" pattern
  if (currentStep === 4) {
    return (
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <ProgressBar currentStep={2} totalSteps={4} />
          <PreferenceStep />
          <PriceBreakdownModal
            isOpen={true}
            onClose={prevStep}
            onConfirm={nextStep}
          />
        </main>
        <Footer />
      </div>
    );
  }

  const showProgressBar = currentStep > 0 && currentStep < 5;
  // Steps:
  // 1: Company (0/3)
  // 2: Volume (1/3)
  // 3: Prefs (2/3)
  // 4: Modal (still 2/3)
  // 5: Billing (3/3)
  // 6: Done

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {showProgressBar && (
          <ProgressBar
            currentStep={currentStep - 1}
            totalSteps={4}
          />
        )}
        {currentStep === 0 && <Landing />}
        {currentStep === 1 && <CompanyTypeStep />}
        {currentStep === 2 && <VolumeStep />}
        {currentStep === 3 && <PreferenceStep />}
        {currentStep === 5 && <BillingStep />}
        {currentStep === 6 && <ConfirmationStep />}
      </main>
      <Footer />
    </div>
  );
}

const App = () => {
  return (
    <OnboardingProvider>
      <AppContent />
    </OnboardingProvider>
  );
};

export default App;
