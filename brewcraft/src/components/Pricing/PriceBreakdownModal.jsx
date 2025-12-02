import React, { useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import Button from '../UI/Button';
import SignaturePad from '../UI/SignaturePad';
import { X, Check, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import './Pricing.css';

const PriceBreakdownModal = ({ isOpen, onClose, onConfirm }) => {
  const { pricing, formData } = useOnboarding();
  const [isContractVisible, setIsContractVisible] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><X size={24} /></button>

        <h2 className="text-center mb-lg">Review & Sign</h2>

        <div className="price-display text-center mb-lg">
          <span className="currency">$</span>
          <span className="amount">{pricing.monthlyTotal}</span>
          <span className="period">/ month</span>
        </div>

        <div className="plan-details mb-lg">
          <div className="detail-row">
            <span>Weekly Volume</span>
            <strong>{formData.weeklyVolume} kg</strong>
          </div>
          <div className="detail-row">
            <span>Price per kg</span>
            <strong>${pricing.pricePerKg}</strong>
          </div>
        </div>

        {/* Contract Toggle */}
        <div className="mb-lg">
          <button
            className="flex-center w-100 p-sm border rounded bg-light"
            onClick={() => setIsContractVisible(!isContractVisible)}
            style={{ justifyContent: 'space-between', background: 'var(--color-accent-dark)', border: 'none', cursor: 'pointer' }}
          >
            <span className="flex-center" style={{ gap: '8px', fontWeight: 500 }}>
              <FileText size={18} /> View Full Contract
            </span>
            {isContractVisible ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {isContractVisible && (
            <div className="contract-text p-md border rounded mt-sm animate-fade-in">
              <h4>Service Agreement</h4>
              <p>1. <strong>Supply:</strong> BrewCraft agrees to supply roasted coffee beans...</p>
              <p>2. <strong>Payment:</strong> Invoiced monthly...</p>
              <p>3. <strong>Cancellation:</strong> 14 days notice required...</p>
              <p className="text-muted text-sm mt-sm">... (Full legal text would go here) ...</p>
            </div>
          )}
        </div>

        {/* Signature Pad */}
        <SignaturePad onSign={setIsSigned} />

        <Button
          onClick={onConfirm}
          className="w-100"
          disabled={!isSigned}
        >
          Sign Contract & Setup Billing
        </Button>
      </div>
    </div>
  );
};

export default PriceBreakdownModal;
