import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Homepage — 4. Loyalty Packages (web + mobile).
 * Haldi band kept; photo on one side, 3 package cards + the existing CTA on the other.
 * All copy is placeholder until client copy arrives. Dummy photo: Unsplash (free licence).
 * "go back" = git checkout tag checkpoint-before-loyalty-rw
 */
interface LoyaltyPackagesProps {
  onViewPackages: () => void;
}

const PACKAGES = [
  { n: '01', title: 'Package 1', perk: 'Lorem ipsum dolor sit amet' },
  { n: '02', title: 'Package 2', perk: 'Consectetur adipiscing elit' },
  { n: '03', title: 'Package 3', perk: 'Sed do eiusmod tempor' }
];

export const LoyaltyPackages: React.FC<LoyaltyPackagesProps> = ({ onViewPackages }) => (
  <section id="loyalty-packages" className="loyalty-band lp">
    <div className="lp-wrap">
      <div data-wm="curtain" className="lp-media">
        <img src="/loyalty/loyalty.jpg" alt="Resort pool deck overlooking the sea" data-real-photo="" loading="lazy" />
      </div>

      <div className="lp-body">
        <span data-wm="" className="lp-eyebrow block"><span className="lp-rule" />Loyalty Packages</span>
        <h2 data-wm="" style={{ ['--d' as any]: '120ms' }} className="lp-title">Placeholder Text <em>(Loyalty Packages)</em></h2>
        <p data-wm="" style={{ ['--d' as any]: '220ms' }} className="lp-copy">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>

        <div className="lp-cards">
          {PACKAGES.map((pk, i) => (
            <div key={pk.n} data-wm="" style={{ ['--d' as any]: `${320 + i * 120}ms` }} className="lp-card">
              <span className="lp-num">{pk.n}</span>
              <span className="lp-card-title">{pk.title}</span>
              <span className="lp-perk"><span className="lp-dot" aria-hidden="true" />{pk.perk}</span>
            </div>
          ))}
        </div>

        <div data-wm="" style={{ ['--d' as any]: '700ms' }} className="lp-cta-row">
          <button type="button" onClick={onViewPackages} className="lp-cta group/lp">
            <span>View Loyalty Packages</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 group-hover/lp:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  </section>
);
