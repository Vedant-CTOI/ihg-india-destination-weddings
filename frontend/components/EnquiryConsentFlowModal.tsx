import React, { useState } from 'react';
import { InquiryFormData } from '../types';
import { ArrowRight } from 'lucide-react';

interface EnquiryConsentFlowModalProps {
  isOpen: boolean;
  step: 'consent' | 'none';
  data: InquiryFormData | null;
  onAcceptConsent: () => void;
  onCancelConsent: () => void;
}

export const EnquiryConsentFlowModal: React.FC<EnquiryConsentFlowModalProps> = ({
  isOpen,
  step,
  data,
  onAcceptConsent,
  onCancelConsent,
  onAcknowledgeNotification
}) => {
  const [consentCommunication, setConsentCommunication] = useState<boolean>(true);
  const [consentDataProcessing, setConsentDataProcessing] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>('');

  if (!isOpen || step === 'none' || !data) return null;

  const handleConsentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentCommunication || !consentDataProcessing) {
      setValidationError('Please agree to the authorization terms to proceed with registration.');
      return;
    }
    setValidationError('');
    onAcceptConsent();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-opacity animate-fade-in font-sans">
      
      {/* POPUP 1: CONSENT FORM POPUP */}
      {step === 'consent' && (
        <div 
          className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-9 border border-neutral-300 shadow-2xl space-y-6 my-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Guest Consent & Data Authorization"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-neutral-200 pb-5">
            <div>
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-1">
                <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
                <span>IHG Governance &amp; Data Safeguards</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black">
                Consent &amp; Authorization
              </h2>
              <p className="text-xs text-neutral-500 font-light mt-1">
                Please review and authorize the consultation mandate for your celebration.
              </p>
            </div>

            <button
              type="button"
              onClick={onCancelConsent}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Cancel consent"
            >
              <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
            </button>
          </div>

          {/* Inquiry Snapshot */}
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
              Enquiry Summary:
            </span>
            <div className="flex justify-between items-center text-neutral-700">
              <span className="text-neutral-500">Contact:</span>
              <strong className="text-black font-medium">{data.primaryContactName} ({data.decisionRole})</strong>
            </div>
            <div className="flex justify-between items-center text-neutral-700">
              <span className="text-neutral-500">Selected Sanctuaries:</span>
              <strong className="text-black font-medium text-right truncate max-w-[240px]">
                {data.selectedHotelNames && data.selectedHotelNames.length > 0 
                  ? data.selectedHotelNames.join(', ')
                  : data.destinations.join(', ')}
              </strong>
            </div>
            <div className="flex justify-between items-center text-neutral-700">
              <span className="text-neutral-500">Dates:</span>
              <strong className="text-black font-medium">{data.targetWindow}</strong>
            </div>
          </div>

          {/* Consent Checkboxes Form */}
          <form onSubmit={handleConsentSubmit} className="space-y-4 text-xs font-sans">
            <div className="space-y-3">
              <label className="flex items-start space-x-3 p-3.5 rounded-xl border border-neutral-200 hover:border-black cursor-pointer bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={consentCommunication}
                  onChange={(e) => {
                    setConsentCommunication(e.target.checked);
                    if (e.target.checked && consentDataProcessing) setValidationError('');
                  }}
                  className="mt-0.5 w-4 h-4 accent-black rounded cursor-pointer"
                />
                <span className="text-neutral-700 font-light leading-relaxed">
                  I authorize an assigned <strong className="text-black font-medium">IHG Luxury Destination Wedding Director</strong> to contact me via phone, email, and messaging to review room inventory, auspicious date holds, and banquet floorplans.
                </span>
              </label>

              <label className="flex items-start space-x-3 p-3.5 rounded-xl border border-neutral-200 hover:border-black cursor-pointer bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={consentDataProcessing}
                  onChange={(e) => {
                    setConsentDataProcessing(e.target.checked);
                    if (e.target.checked && consentCommunication) setValidationError('');
                  }}
                  className="mt-0.5 w-4 h-4 accent-black rounded cursor-pointer"
                />
                <span className="text-neutral-700 font-light leading-relaxed">
                  I acknowledge and accept the processing of our celebration specifications under the <strong className="text-black font-medium">IHG Privacy Protocol</strong>.
                </span>
              </label>
            </div>

            {validationError && (
              <div className="flex items-center space-x-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 font-medium">
                <span aria-hidden="true" className="w-4 h-4 shrink-0 inline-block border border-current"></span>
                <span>{validationError}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onCancelConsent}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-300 hover:border-black text-black text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
              >
                Go Back &amp; Edit
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white px-7 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Accept &amp; Confirm Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* POPUP 2: NOTIFICATION POPUP */}

    </div>
  );
};
