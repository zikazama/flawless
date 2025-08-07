import React, { useRef, useEffect, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import './MonacoCodeEditor.css';
import { 
  detectMobileEnvironment, 
  getOptimalEditorHeight, 
  getMobileMonacoOptions,
  applyMobileOptimizations,
  createMobileResponsiveObserver
} from '../utils/mobileOptimization';

interface MonacoCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  disabled?: boolean;
  placeholder?: string;
  height?: string;
}

const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  disabled = false,
  placeholder = '// Tulis kode Anda di sini...',
  height = '350px'
}) => {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileEnv, setMobileEnv] = useState(detectMobileEnvironment());
  const [editorHeight, setEditorHeight] = useState(getOptimalEditorHeight(height));

  // Effect for mobile detection and responsive updates
  useEffect(() => {
    const updateMobileEnv = () => {
      const newEnv = detectMobileEnvironment();
      setMobileEnv(newEnv);
      setEditorHeight(getOptimalEditorHeight(height));
    };

    const handleResize = () => {
      updateMobileEnv();
    };

    const handleOrientationChange = () => {
      setTimeout(updateMobileEnv, 500);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [height]);

  // Effect for applying mobile optimizations
  useEffect(() => {
    if (containerRef.current && mobileEnv.isMobile) {
      applyMobileOptimizations(containerRef.current);
    }
  }, [mobileEnv.isMobile]);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    
    // Focus editor on mount (but not on mobile to avoid virtual keyboard)
    if (!mobileEnv.isMobile) {
      editor.focus();
    }

    // Add keyboard shortcuts (desktop only)
    if (!mobileEnv.isMobile) {
      editor.addAction({
        id: 'run-code',
        label: 'Run Code',
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        ],
        run: () => {
          // Trigger run code action
          const runButton = document.querySelector('.run-btn') as HTMLButtonElement;
          if (runButton) {
            runButton.click();
          }
        }
      });
    }

    // Handle placeholder selection when empty (desktop only)
    if (!value && !mobileEnv.isMobile) {
      setTimeout(() => {
        editor.setSelection(editor.getModel()?.getFullModelRange());
      }, 100);
    }

    // Set up responsive observer
    const cleanup = createMobileResponsiveObserver(
      { current: editor },
      (dimensions) => {
        console.log('Editor resized to:', dimensions);
      }
    );

    // Apply mobile optimizations to the editor container
    if (mobileEnv.isMobile && containerRef.current) {
      setTimeout(() => {
        applyMobileOptimizations(containerRef.current!);
      }, 100);
    }

    // Return cleanup function
    return cleanup;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!disabled) {
      // Don't save placeholder as actual value
      const actualValue = value === placeholder ? '' : (value || '');
      onChange(actualValue);
    }
  };

  // Generate Monaco Editor options with mobile optimizations
  const options = getMobileMonacoOptions({
    readOnly: disabled,
    theme: 'vs-dark',
    formatOnType: true,
    formatOnPaste: true,
    autoIndent: 'full',
    tabSize: 2,
    renderLineHighlight: 'all',
    cursorBlinking: 'smooth',
    smoothScrolling: true,
    suggestSelection: 'first',
    foldingStrategy: 'indentation',
    renderWhitespace: 'none',
    renderControlCharacters: false,
    useTabStops: true,
  });

  return (
    <div 
      ref={containerRef}
      className={`monaco-editor-container ${disabled ? 'disabled' : ''} ${mobileEnv.isMobile ? 'mobile' : ''} ${mobileEnv.isSmallMobile ? 'small-mobile' : ''}`}
    >
      <div className="monaco-editor-header">
        <div className="editor-info">
          <span className="language-badge">{language.toUpperCase()}</span>
          {disabled && <span className="status-badge">✅ Completed</span>}
        </div>
        {!mobileEnv.isMobile && (
          <div className="editor-hints">
            {!disabled && (
              <>
                <span className="hint-item">Tab: Indent</span>
                <span className="hint-item">Ctrl+Enter: Run</span>
                <span className="hint-item">Ctrl+Space: Autocomplete</span>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="monaco-editor-wrapper">
        <Editor
          height={editorHeight}
          language={language}
          value={value || placeholder}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={options}
          loading={
            <div className="editor-loading">
              <div className="loading-spinner"></div>
              <span>Loading editor...</span>
            </div>
          }
        />
      </div>
      
      {disabled && (
        <div className="editor-disabled-overlay">
          <span className="disabled-message">✅ Code Completed Successfully</span>
        </div>
      )}
    </div>
  );
};

export default MonacoCodeEditor;