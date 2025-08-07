import React, { useRef, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeEditor.css';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  disabled?: boolean;
  placeholder?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  disabled = false,
  placeholder = '// Write your code here...'
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlighterRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea and highlighter
  const handleScroll = () => {
    if (textareaRef.current && highlighterRef.current) {
      const scrollTop = textareaRef.current.scrollTop;
      const scrollLeft = textareaRef.current.scrollLeft;
      highlighterRef.current.scrollTop = scrollTop;
      highlighterRef.current.scrollLeft = scrollLeft;
    }
  };

  // Handle tab key for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + tabChar.length;
      }, 0);
    }
  };

  // Custom styles for syntax highlighter
  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      margin: 0,
      padding: '1.5rem',
      background: 'transparent',
      fontSize: '1.1rem',
      lineHeight: '1.4',
      fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      fontSize: '1.1rem',
      lineHeight: '1.4',
      fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
    }
  };

  return (
    <div className={`code-editor-container ${isFocused ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}>
      <div className="code-editor-wrapper">
        {/* Syntax highlighted code (background) */}
        <div 
          ref={highlighterRef}
          className="code-highlighter"
          aria-hidden="true"
        >
          {value || placeholder ? (
            <SyntaxHighlighter
              language={language}
              style={customStyle}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'transparent',
                overflow: 'visible',
                minHeight: '300px',
              }}
              showLineNumbers={false}
              wrapLines={true}
              lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
            >
              {value || placeholder}
            </SyntaxHighlighter>
          ) : (
            <div style={{ padding: '1.5rem', color: '#6c757d', fontFamily: 'monospace', fontSize: '1.1rem' }}>
              {placeholder}
            </div>
          )}
        </div>

        {/* Transparent textarea (foreground) for editing */}
        <textarea
          ref={textareaRef}
          className="code-textarea"
          value={value}
          onChange={(e) => !disabled && onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=""
          disabled={disabled}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
      
      {/* Editor toolbar */}
      <div className="code-editor-toolbar">
        <span className="language-badge">{language.toUpperCase()}</span>
        {disabled && <span className="status-badge">✅ Completed</span>}
      </div>
    </div>
  );
};

export default CodeEditor;