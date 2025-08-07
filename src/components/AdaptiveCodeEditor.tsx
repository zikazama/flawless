import React from 'react';
import MonacoCodeEditor from './MonacoCodeEditor';
import MobileFriendlyCodeEditor from './MobileFriendlyCodeEditor';

interface AdaptiveCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  disabled?: boolean;
  placeholder?: string;
  height?: string;
  forceMobile?: boolean;
}

const AdaptiveCodeEditor: React.FC<AdaptiveCodeEditorProps> = (props) => {
  // Detect if device is mobile or if mobile mode is forced
  const isMobile = React.useMemo(() => {
    if (props.forceMobile) return true;
    if (typeof window === 'undefined') return false;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Enhanced mobile detection:
    // 1. Screens smaller than 1024px (increased threshold)
    // 2. Touch devices
    // 3. Mobile user agents
    // 4. Portrait orientation on smaller screens
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isPortraitSmallScreen = screenWidth < 1024 && screenWidth < screenHeight;
    
    return screenWidth <= 1024 || isTouchDevice || isMobileUserAgent || isPortraitSmallScreen;
  }, [props.forceMobile]);

  // Use state to track mobile status and re-render on resize
  const [useMobileEditor, setUseMobileEditor] = React.useState(isMobile);

  React.useEffect(() => {
    const checkMobileStatus = () => {
      if (props.forceMobile) {
        setUseMobileEditor(true);
        return;
      }
      
      if (typeof window === 'undefined') {
        setUseMobileEditor(false);
        return;
      }
      
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isPortraitSmallScreen = screenWidth < 1024 && screenWidth < screenHeight;
      
      setUseMobileEditor(screenWidth <= 1024 || isTouchDevice || isMobileUserAgent || isPortraitSmallScreen);
    };

    const handleResize = () => {
      checkMobileStatus();
    };

    const handleOrientationChange = () => {
      setTimeout(checkMobileStatus, 500);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Initial check
    checkMobileStatus();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [props.forceMobile]);

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('AdaptiveCodeEditor Debug:', {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      userAgent: navigator.userAgent,
      useMobileEditor,
      forceMobile: props.forceMobile
    });
  }

  // Render appropriate editor based on device
  if (useMobileEditor) {
    return <MobileFriendlyCodeEditor {...props} />;
  } else {
    return <MonacoCodeEditor {...props} />;
  }
};

export default AdaptiveCodeEditor;