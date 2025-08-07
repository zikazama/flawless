import React, { useState, useRef, useEffect, useCallback } from 'react';
import './MobileFriendlyCodeEditor.css';

interface MobileFriendlyCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  disabled?: boolean;
  placeholder?: string;
  height?: string;
}

const MobileFriendlyCodeEditor: React.FC<MobileFriendlyCodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  disabled = false,
  placeholder = '// Write your code here...',
  height = '350px'
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [lineNumbers, setLineNumbers] = useState<number[]>([1]);

  // Update line numbers when content changes
  useEffect(() => {
    const lines = value.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  }, [value]);

  // Sync scroll between textarea and highlight
  const handleScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      const scrollTop = textareaRef.current.scrollTop;
      const scrollLeft = textareaRef.current.scrollLeft;
      highlightRef.current.scrollTop = scrollTop;
      highlightRef.current.scrollLeft = scrollLeft;
    }
  }, []);

  // Handle tab key for indentation and fix cursor positioning
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert 2 spaces for tab
      const tabChar = '  ';
      const newValue = textarea.value.substring(0, start) + tabChar + textarea.value.substring(end);
      
      onChange(newValue);
      
      // Fix cursor position immediately and then again after render
      requestAnimationFrame(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(start + tabChar.length, start + tabChar.length);
        }
      });
    }
  }, [disabled, onChange]);

  // Simple syntax highlighting for JavaScript
  const highlightSyntax = useCallback((code: string) => {
    if (!code || language !== 'javascript') {
      return code.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
    }

    // JavaScript keywords
    const keywords = [
      'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'do',
      'switch', 'case', 'default', 'break', 'continue', 'return', 'try', 'catch',
      'finally', 'throw', 'class', 'extends', 'import', 'export', 'from', 'as',
      'async', 'await', 'new', 'this', 'super', 'typeof', 'instanceof', 'in',
      'of', 'delete', 'void', 'null', 'undefined', 'true', 'false'
    ];

    let highlighted = code;

    // Highlight strings
    highlighted = highlighted.replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, 
      '<span class="syntax-string">$1$2$1</span>');

    // Highlight comments
    highlighted = highlighted.replace(/(\/\/.*?)$/gm, 
      '<span class="syntax-comment">$1</span>');
    highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, 
      '<span class="syntax-comment">$1</span>');

    // Highlight numbers
    highlighted = highlighted.replace(/\b(\d+(?:\.\d+)?)\b/g, 
      '<span class="syntax-number">$1</span>');

    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, 
        `<span class="syntax-keyword">${keyword}</span>`);
    });

    // Highlight functions
    highlighted = highlighted.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, 
      '<span class="syntax-function">$1</span>(');

    // Convert spaces and newlines
    highlighted = highlighted.replace(/\n/g, '<br>');
    highlighted = highlighted.replace(/ /g, '&nbsp;');

    return highlighted;
  }, [language]);

  // Calculate responsive height
  const getResponsiveHeight = useCallback(() => {
    if (typeof window === 'undefined') return height;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isLandscape = screenWidth > screenHeight && screenHeight < 500;
    
    if (isLandscape) return '180px';
    if (screenWidth <= 480) return Math.min(250, screenHeight * 0.35) + 'px';
    if (screenWidth <= 768) return Math.min(300, screenHeight * 0.4) + 'px';
    
    return height;
  }, [height]);

  const [editorHeight, setEditorHeight] = useState(getResponsiveHeight());

  // Update height on resize
  useEffect(() => {
    const handleResize = () => {
      setEditorHeight(getResponsiveHeight());
    };

    const handleOrientationChange = () => {
      setTimeout(() => setEditorHeight(getResponsiveHeight()), 500);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [getResponsiveHeight]);

  return (
    <div 
      ref={containerRef}
      className={`mobile-code-editor ${isFocused ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}
      style={{ height: editorHeight }}
    >
      {/* Header */}
      <div className="mobile-code-header">
        <div className="editor-info">
          <span className="language-badge">{language.toUpperCase()}</span>
          {disabled && <span className="status-badge">✅ Completed</span>}
        </div>
        <div className="editor-controls">
          <span className="lines-count">{lineNumbers.length} lines</span>
        </div>
      </div>

      {/* Editor Container */}
      <div className="mobile-editor-container">
        {/* Line Numbers */}
        <div className="line-numbers" aria-hidden="true">
          {lineNumbers.map(num => (
            <div key={num} className="line-number">
              {num}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="code-area">
          {/* Syntax Highlighting Background */}
          <div 
            ref={highlightRef}
            className="syntax-highlight"
            aria-hidden="true"
            dangerouslySetInnerHTML={{
              __html: highlightSyntax(value || placeholder)
            }}
          />

          {/* Input Textarea */}
          <textarea
            ref={textareaRef}
            className="code-input"
            value={value}
            onChange={(e) => !disabled && onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            wrap="off"
          />
        </div>
      </div>

      {/* Mobile Helper Toolbar */}
      <div className="mobile-toolbar">
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => {
            if (textareaRef.current && !disabled) {
              const textarea = textareaRef.current;
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const newValue = value.substring(0, start) + '  ' + value.substring(end);
              onChange(newValue);
              requestAnimationFrame(() => {
                textarea.focus();
                textarea.setSelectionRange(start + 2, start + 2);
              });
            }
          }}
          disabled={disabled}
        >
          Tab
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => {
            if (textareaRef.current && !disabled) {
              const textarea = textareaRef.current;
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const newValue = value.substring(0, start) + '()' + value.substring(end);
              onChange(newValue);
              requestAnimationFrame(() => {
                textarea.focus();
                textarea.setSelectionRange(start + 1, start + 1);
              });
            }
          }}
          disabled={disabled}
        >
          ( )
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => {
            if (textareaRef.current && !disabled) {
              const textarea = textareaRef.current;
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const newValue = value.substring(0, start) + '{}' + value.substring(end);
              onChange(newValue);
              requestAnimationFrame(() => {
                textarea.focus();
                textarea.setSelectionRange(start + 1, start + 1);
              });
            }
          }}
          disabled={disabled}
        >
          { }
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => {
            if (textareaRef.current && !disabled) {
              const textarea = textareaRef.current;
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const newValue = value.substring(0, start) + '[]' + value.substring(end);
              onChange(newValue);
              requestAnimationFrame(() => {
                textarea.focus();
                textarea.setSelectionRange(start + 1, start + 1);
              });
            }
          }}
          disabled={disabled}
        >
          [ ]
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => {
            if (textareaRef.current && !disabled) {
              const textarea = textareaRef.current;
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const newValue = value.substring(0, start) + ';' + value.substring(end);
              onChange(newValue);
              requestAnimationFrame(() => {
                textarea.focus();
                textarea.setSelectionRange(start + 1, start + 1);
              });
            }
          }}
          disabled={disabled}
        >
          ;
        </button>
      </div>

      {disabled && (
        <div className="editor-disabled-overlay">
          <span className="disabled-message">✅ Code Completed Successfully</span>
        </div>
      )}
    </div>
  );
};

export default MobileFriendlyCodeEditor;