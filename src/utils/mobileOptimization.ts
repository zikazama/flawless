// Mobile optimization utilities for Monaco Editor

interface MobileDetection {
  isMobile: boolean;
  isTablet: boolean;
  isSmallMobile: boolean;
  isLandscape: boolean;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
}

export const detectMobileEnvironment = (): MobileDetection => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isSmallMobile: false,
      isLandscape: false,
      screenWidth: 1024,
      screenHeight: 768,
      devicePixelRatio: 1
    };
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const devicePixelRatio = window.devicePixelRatio || 1;
  
  const isMobile = screenWidth <= 768;
  const isTablet = screenWidth > 768 && screenWidth <= 1024;
  const isSmallMobile = screenWidth <= 480;
  const isLandscape = screenWidth > screenHeight && screenHeight < 500;

  return {
    isMobile,
    isTablet,
    isSmallMobile,
    isLandscape,
    screenWidth,
    screenHeight,
    devicePixelRatio
  };
};

export const getOptimalEditorHeight = (defaultHeight: string = '350px'): string => {
  const { isMobile, isSmallMobile, isLandscape, screenHeight } = detectMobileEnvironment();
  
  if (isLandscape) {
    return '160px';
  }
  
  if (isSmallMobile) {
    return Math.min(240, screenHeight * 0.3) + 'px';
  }
  
  if (isMobile) {
    return Math.min(280, screenHeight * 0.35) + 'px';
  }
  
  return defaultHeight;
};

export const getOptimalFontSize = (): number => {
  const { isSmallMobile, isMobile, isLandscape } = detectMobileEnvironment();
  
  if (isLandscape) return 11;
  if (isSmallMobile) return 12;
  if (isMobile) return 14;
  
  return 16;
};

export const getOptimalLineHeight = (fontSize: number): number => {
  return Math.round(fontSize * 1.3);
};

export const getMobileMonacoOptions = (baseOptions: any = {}) => {
  const { isMobile, isSmallMobile, isLandscape } = detectMobileEnvironment();
  const fontSize = getOptimalFontSize();
  const lineHeight = getOptimalLineHeight(fontSize);
  
  if (!isMobile) {
    return baseOptions;
  }

  return {
    ...baseOptions,
    // Core settings
    minimap: { enabled: false },
    fontSize,
    lineHeight,
    fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
    
    // Layout settings
    padding: { 
      top: isSmallMobile ? 8 : 10, 
      bottom: isSmallMobile ? 8 : 10,
      left: isSmallMobile ? 4 : 6,
      right: isSmallMobile ? 12 : 15  // Extra right padding for cursor positioning
    },
    
    // Performance settings
    automaticLayout: true,
    wordWrap: 'on',
    scrollBeyondLastLine: false,
    scrollBeyondLastColumn: 5, // Allow scrolling past last column for cursor positioning
    
    // Cursor and selection settings
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    cursorStyle: 'line',
    cursorWidth: 2,
    
    // Disable heavy features on mobile
    contextmenu: false,
    quickSuggestions: false,
    parameterHints: { enabled: false },
    suggestOnTriggerCharacters: false,
    acceptSuggestionOnCommitCharacter: false,
    tabCompletion: 'off',
    wordBasedSuggestions: false,
    
    // Visual simplification
    folding: !isSmallMobile,
    showFoldingControls: 'never',
    renderIndentGuides: !isSmallMobile,
    renderLineHighlightOnlyWhenFocus: true,
    
    // Line numbers
    lineNumbers: isSmallMobile ? 'off' : 'on',
    lineNumbersMinChars: isSmallMobile ? 0 : 2,
    glyphMargin: !isSmallMobile,
    
    // Overview ruler
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    hideCursorInOverviewRuler: true,
    
    // Scrollbars - visible but minimal on mobile
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      verticalScrollbarSize: isSmallMobile ? 6 : 8,
      horizontalScrollbarSize: isSmallMobile ? 6 : 8,
      arrowSize: isSmallMobile ? 6 : 8,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      useShadows: false,
      verticalSliderSize: isSmallMobile ? 6 : 8,
      horizontalSliderSize: isSmallMobile ? 6 : 8,
    },
    
    // Bracket matching - simplified on small screens
    bracketPairColorization: { enabled: !isSmallMobile },
    guides: {
      bracketPairs: !isSmallMobile,
      indentation: !isSmallMobile
    },
    
    // Performance optimizations
    fastScrollSensitivity: 3,
    mouseWheelZoom: false,
    multiCursorModifier: 'ctrlCmd',
    
    // Accessibility
    accessibilitySupport: 'auto'
  };
};

export const applyMobileOptimizations = (editorElement: HTMLElement) => {
  if (!editorElement) return;
  
  const { isMobile, isSmallMobile } = detectMobileEnvironment();
  
  if (isMobile) {
    // Add mobile-specific classes
    editorElement.classList.add('monaco-editor-mobile');
    
    if (isSmallMobile) {
      editorElement.classList.add('monaco-editor-small-mobile');
    }
    
    // Apply mobile-specific styles
    const style = editorElement.style;
    style.touchAction = 'pan-x pan-y'; // Allow scrolling but prevent zoom
    (style as any).webkitTouchCallout = 'none';
    (style as any).webkitUserSelect = 'none';
    
    // Find and optimize scrollable elements
    const scrollableElements = editorElement.querySelectorAll('.monaco-scrollable-element');
    scrollableElements.forEach((el: Element) => {
      const element = el as HTMLElement;
      (element.style as any).webkitOverflowScrolling = 'touch';
      element.style.overscrollBehavior = 'contain';
      element.style.overflow = 'auto';
      
      // Ensure scrollable area has proper dimensions
      if (element.classList.contains('editor-scrollable')) {
        element.style.touchAction = 'pan-x pan-y';
        element.style.userSelect = 'text';
        (element.style as any).webkitUserSelect = 'text';
        // Add extra padding for cursor positioning
        element.style.paddingRight = '15px';
      }
    });
    
    // Find and optimize lines content for scrolling and cursor positioning
    const linesContent = editorElement.querySelectorAll('.lines-content');
    linesContent.forEach((el: Element) => {
      const element = el as HTMLElement;
      (element.style as any).webkitOverflowScrolling = 'touch';
      element.style.overscrollBehavior = 'contain';
      element.style.paddingRight = '15px';
      element.style.minWidth = '100%';
    });
    
    // Optimize view lines for cursor positioning
    const viewLines = editorElement.querySelectorAll('.view-lines');
    viewLines.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.paddingRight = '15px';
      element.style.minWidth = '100%';
      element.style.boxSizing = 'border-box';
    });
    
    // Optimize individual view lines
    const viewLineElements = editorElement.querySelectorAll('.view-line');
    viewLineElements.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.paddingRight = '15px';
      element.style.minWidth = '100%';
      element.style.boxSizing = 'border-box';
    });
    
    // Optimize cursor layer
    const cursorsLayer = editorElement.querySelectorAll('.cursors-layer');
    cursorsLayer.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.width = '100%';
      element.style.minWidth = '100%';
      element.style.paddingRight = '15px';
    });
    
    // Optimize input area for better cursor positioning
    const inputArea = editorElement.querySelectorAll('.inputarea');
    inputArea.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.paddingRight = '15px';
      element.style.minWidth = '100%';
      element.style.width = '100%';
      element.style.boxSizing = 'border-box';
    });
    
    // Ensure scrollbars are visible and functional
    const scrollbars = editorElement.querySelectorAll('.scrollbar');
    scrollbars.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.display = 'block';
      element.style.opacity = '0.4';
      element.style.pointerEvents = 'auto';
      
      // Make slider visible
      const slider = element.querySelector('.slider') as HTMLElement;
      if (slider) {
        slider.style.display = 'block';
        slider.style.background = 'rgba(102, 126, 234, 0.6)';
        slider.style.borderRadius = '3px';
      }
    });
    
    // Hide unnecessary UI elements
    const elementsToHide = [
      '.minimap',
      '.lightBulbWidget',
      '.monaco-hover',
      '.decorationsOverviewRuler'
    ];
    
    elementsToHide.forEach(selector => {
      const elements = editorElement.querySelectorAll(selector);
      elements.forEach((el: Element) => {
        (el as HTMLElement).style.display = 'none';
      });
    });
  }
};

export const createMobileResponsiveObserver = (
  editorRef: React.RefObject<any>,
  onResize?: (dimensions: { width: number; height: number }) => void
) => {
  if (typeof window === 'undefined' || !editorRef.current) return;
  
  const handleResize = () => {
    const { isMobile, isLandscape, screenWidth, screenHeight } = detectMobileEnvironment();
    
    if (editorRef.current && isMobile) {
      const newHeight = getOptimalEditorHeight();
      
      // Update editor dimensions
      editorRef.current.layout({
        width: screenWidth - 40, // Account for padding
        height: parseInt(newHeight)
      });
      
      if (onResize) {
        onResize({
          width: screenWidth - 40,
          height: parseInt(newHeight)
        });
      }
    }
  };
  
  // Listen for orientation changes
  const handleOrientationChange = () => {
    setTimeout(handleResize, 500); // Delay to allow for complete orientation change
  };
  
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleOrientationChange);
  
  // Initial resize
  setTimeout(handleResize, 100);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleOrientationChange);
  };
};

export const injectMobileCSS = () => {
  if (typeof document === 'undefined') return;
  
  const { isMobile } = detectMobileEnvironment();
  
  if (isMobile) {
    const existingStyle = document.getElementById('monaco-mobile-css');
    if (existingStyle) return;
    
    const style = document.createElement('style');
    style.id = 'monaco-mobile-css';
    style.textContent = `
      /* Emergency mobile CSS injection */
      @media (max-width: 768px) {
        .monaco-editor-container,
        .monaco-editor-wrapper,
        .monaco-editor {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        
        .monaco-editor-wrapper section {
          height: 280px !important;
        }
        
        .minimap {
          display: none !important;
        }
        
        .scrollbar {
          width: 6px !important;
          height: 6px !important;
        }
        
        .margin {
          width: 50px !important;
        }
        
        .view-line {
          font-size: 14px !important;
          line-height: 18px !important;
        }
      }
      
      @media (max-width: 480px) {
        .monaco-editor-wrapper section {
          height: 240px !important;
        }
        
        .margin {
          width: 40px !important;
        }
        
        .view-line {
          font-size: 12px !important;
          line-height: 16px !important;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
};

// Auto-inject CSS when module loads on mobile
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', injectMobileCSS);
  if (document.readyState === 'loading') {
    injectMobileCSS();
  }
}