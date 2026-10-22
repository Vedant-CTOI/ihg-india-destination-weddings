import React, { useState } from 'react';
import { InquiryFormData } from '../types';
import { ArrowRight } from 'lucide-react';

interface EnquiryConsentFlowModalProps {
  isOpen: boolean;
  step: 'notification' | 'none';
  data: InquiryFormData | null;
  onAcknowledgeNotification: () => void;
}

export const EnquiryConsentFlowModal: React.FC<EnquiryConsentFlowModalProps> = ({
  isOpen,
  step,
  data,
  onAcknowledgeNotification
}) => {

  if (!isOpen || step === 'none' || !data) return null;


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-opacity animate-fade-in font-sans">
      
      {/* POPUP 1: CONSENT FORM POPUP */}
      {/* POPUP: NOTIFICATION POPUP */}
      {step === 'notification' && (
        <div 
          className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-9 border border-neutral-300 shadow-2xl space-y-6 my-auto text-center animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Enquiry Registered Notification"
        >
          {/* Registered Icon */}
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-md">
            <span aria-hidden="true" className="w-8 h-8 stroke-[2.5] inline-block border border-current"></span>
          </div>

          {/* Title & Explicit Notification Statement */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block">
              Official Status Notice
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black">
              Request Has Been Registered
            </h2>
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
              Kindly await communication from <strong className="text-black font-semibold">IHG Hotels &amp; Resorts India</strong>. Your assigned Destination Wedding Director will reach out to you directly with auspicious date schedules and tailored sanctuary blueprints.
            </div>
          </div>

          {/* Registered Particulars */}
          <div className="text-xs text-neutral-600 bg-white p-4 rounded-2xl border border-neutral-200 text-left space-y-2">
            <div className="flex justify-between py-0.5 border-b border-neutral-100">
              <span className="text-neutral-400">Primary Contact:</span>
              <strong className="text-black font-medium">{data.primaryContactName}</strong>
            </div>
            <div className="flex justify-between py-0.5 border-b border-neutral-100">
              <span className="text-neutral-400">Phone:</span>
              <strong className="text-black font-medium">{data.phone}</strong>
            </div>
            <div className="flex justify-between py-0.5 border-b border-neutral-100">
              <span className="text-neutral-400">Target Window:</span>
              <strong className="text-black font-medium">{data.targetWindow}</strong>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-neutral-400">Status:</span>
              <strong className="text-black font-medium flex items-center space-x-1">
                <span aria-hidden="true" className="w-3 h-3 inline-block border border-current"></span>
                <span>Enquiry Registered — Awaiting Director Communication</span>
              </strong>
            </div>
          </div>

          {/* Return to Exploration Action */}
          <button
            type="button"
            onClick={onAcknowledgeNotification}
            className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Return to Exploration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* POPUP 2: NOTIFICATION POPUP */}

    </div>
  );
};
