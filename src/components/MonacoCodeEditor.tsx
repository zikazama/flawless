import React, { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import './MonacoCodeEditor.css';

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

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    
    // Focus editor on mount
    editor.focus();

    // Add keyboard shortcuts
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

    // Handle placeholder selection when empty
    if (!value) {
      // Select all placeholder text so it gets replaced when user types
      setTimeout(() => {
        editor.setSelection(editor.getModel()?.getFullModelRange());
      }, 100);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!disabled) {
      // Don't save placeholder as actual value
      const actualValue = value === placeholder ? '' : (value || '');
      onChange(actualValue);
    }
  };

  // Monaco Editor options  
  const options: any = {
    minimap: { enabled: false },
    fontSize: 17.6, // 1.1rem = 17.6px (assuming 16px base)
    lineHeight: 26.4, // 1.5 * 17.6px = 26.4px
    fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
    autoIndent: 'full',
    tabSize: 2,
    wordWrap: 'on',
    scrollBeyondLastLine: false,
    readOnly: disabled,
    theme: 'vs-dark',
    padding: { top: 15, bottom: 15 },
    renderLineHighlight: 'all',
    cursorBlinking: 'smooth',
    smoothScrolling: true,
    contextmenu: true,
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true
    },
    parameterHints: {
      enabled: true
    },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnCommitCharacter: true,
    tabCompletion: 'on',
    wordBasedSuggestions: true,
    suggestSelection: 'first',
    folding: true,
    foldingStrategy: 'indentation',
    showFoldingControls: 'mouseover',
    renderWhitespace: 'none',
    renderControlCharacters: false,
    renderIndentGuides: true,
    renderLineHighlightOnlyWhenFocus: false,
    useTabStops: true,
    // Accessibility
    accessibilitySupport: 'auto',
    // Performance
    fastScrollSensitivity: 5,
    mouseWheelZoom: false,
    multiCursorModifier: 'alt',
    // Bracket matching
    bracketPairColorization: {
      enabled: true
    },
    guides: {
      bracketPairs: true,
      indentation: true
    }
  };

  return (
    <div className={`monaco-editor-container ${disabled ? 'disabled' : ''}`}>
      <div className="monaco-editor-header">
        <div className="editor-info">
          <span className="language-badge">{language.toUpperCase()}</span>
          {disabled && <span className="status-badge">✅ Completed</span>}
        </div>
        <div className="editor-hints">
          {!disabled && (
            <>
              <span className="hint-item">Tab: Indent</span>
              <span className="hint-item">Ctrl+Enter: Run</span>
              <span className="hint-item">Ctrl+Space: Autocomplete</span>
            </>
          )}
        </div>
      </div>
      
      <div className="monaco-editor-wrapper">
        <Editor
          height={height}
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