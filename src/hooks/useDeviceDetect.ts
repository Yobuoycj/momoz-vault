import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile devices
 */
export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    );
    setIsMobile(mobile);
  }, []);

  return { isMobile };
};