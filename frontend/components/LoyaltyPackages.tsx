import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Homepage — 4. Loyalty Packages (web + mobile).
 * Text-only Haldi band: eyebrow, title, one line of copy, CTA. No images, no cards (client request).
 * "go back" = git checkout tag checkpoint-before-loyalty-trim
 */
interface LoyaltyPackagesProps {
  onViewPackages: () => void;
}

export const LoyaltyPackages: React.FC<LoyaltyPackagesProps> = ({ onViewPackages }) => (
  <section id="loyalty-packages" className="loyalty-band lp lp-text">
    <div className="lp-wrap">
      <div className="lp-body">
        <span data-wm="" className="lp-eyebrow block"><span className="lp-rule" />Loyalty Packages</span>
        <h2 data-wm="" style={{ ['--d' as any]: '120ms' }} className="lp-title">Placeholder Text <em>(Loyalty Packages)</em></h2>
        <p data-wm="" style={{ ['--d' as any]: '220ms' }} className="lp-copy">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
      </div>
      <div data-wm="" style={{ ['--d' as any]: '320ms' }} className="lp-cta-row">
        <button type="button" onClick={onViewPackages} className="lp-cta group/lp">
          <span>View Loyalty Packages</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 group-hover/lp:translate-x-1" />
        </button>
      </div>
    </div>
  </section>
);
