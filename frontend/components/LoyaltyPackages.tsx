import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useWeb, useRevealOnce } from './webMotion';

/**
 * Homepage — 4. Loyalty Packages (web + mobile).
 * Text-only Haldi band: eyebrow, title, one line of copy, CTA. No images, no cards (client request).
 * "go back" = git checkout tag checkpoint-before-loyalty-trim
 */
interface LoyaltyPackagesProps {
  onViewPackages: () => void;
}

export const LoyaltyPackages: React.FC<LoyaltyPackagesProps> = ({ onViewPackages }) => {
  const web = useWeb();
  // Expanding background reveal (web, once per visit). Go back = tag checkpoint-before-props-loyalty-rw
  const [sxRef, sxIn] = useRevealOnce<HTMLElement>();
  return (
  <section ref={sxRef} data-sx-in={web && sxIn ? '' : undefined} id="loyalty-packages" className={`loyalty-band lp lp-text ${web ? 'sx-loyalty' : ''}`}>
    {web && <span className="lp-bg" aria-hidden="true" />}
    <div className="lp-wrap">
      <div className="lp-body">
        <span data-wm={web ? undefined : ''} className="lp-eyebrow block"><span className="lp-rule" />Lorem Ipsum</span>
        <h2 data-wm={web ? undefined : ''} style={{ ['--d' as any]: '120ms' }} className="lp-title"><span className="sx-ml"><span className="sx-mi">Loyalty Packages</span></span></h2>
        <p data-wm={web ? undefined : ''} style={{ ['--d' as any]: '220ms' }} className="lp-copy">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
      </div>
      <div data-wm={web ? undefined : ''} style={{ ['--d' as any]: '320ms' }} className="lp-cta-row">
        <button type="button" onClick={onViewPackages} className="lp-cta group/lp">
          <span className="lp-cta-label">View Loyalty Packages</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 group-hover/lp:translate-x-1" />
        </button>
      </div>
    </div>
  </section>
  );
};
