import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './SimpleCodeEditor.css';

interface SimpleCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  disabled?: boolean;
  placeholder?: string;
}

const SimpleCodeEditor: React.FC<SimpleCodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  disabled = false,
  placeholder = '// Tulis kode Anda di sini...'
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const tabChar = '  ';
      const newValue = textarea.value.substring(0, start) + tabChar + textarea.value.substring(end);
      
      onChange(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + tabChar.length;
      }, 0);
    }
  };

  if (isEditing && !disabled) {
    return (
      <div className="simple-code-editor editing">
        <div className="editor-header">
          <span className="language-badge">{language.toUpperCase()}</span>
          <button 
            className="preview-btn"
            onClick={() => setIsEditing(false)}
          >
            👁️ Preview
          </button>
        </div>
        <textarea
          className="code-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
          spellCheck={false}
        />
      </div>
    );
  }

  return (
    <div 
      className={`simple-code-editor preview ${disabled ? 'disabled' : ''}`}
      onClick={() => !disabled && setIsEditing(true)}
    >
      <div className="editor-header">
        <span className="language-badge">{language.toUpperCase()}</span>
        {!disabled && <span className="click-hint">Klik untuk edit</span>}
        {disabled && <span className="status-badge">✅ Completed</span>}
      </div>
      <div className="code-display">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: '#2d2d2d',
            fontSize: '1.1rem',
            lineHeight: '1.4',
            minHeight: '300px',
            cursor: disabled ? 'not-allowed' : 'text',
          }}
        >
          {value || placeholder}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SimpleCodeEditor;