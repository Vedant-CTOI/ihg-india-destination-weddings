import { useEffect, useState } from 'react';

/** True while the Web/Mobile toggle is on "Mobile" (html.layout-mobile). Web-only design lives behind !mobile. */
export const useMobileLayout = (): boolean => {
  const read = () => typeof document !== 'undefined' && document.documentElement.classList.contains('layout-mobile');
  const [mobile, setMobile] = useState<boolean>(read);
  useEffect(() => {
    const mo = new MutationObserver(() => setMobile(read()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setMobile(read());
    return () => mo.disconnect();
  }, []);
  return mobile;
};
