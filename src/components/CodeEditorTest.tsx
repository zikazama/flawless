import React from 'react';
import AdaptiveCodeEditor from './AdaptiveCodeEditor';
import { useCodeEditor } from '../hooks/useCodeEditor';
import './CodeEditorTest.css';

const CodeEditorTest: React.FC = () => {
  const {
    value,
    setValue,
    hasChanges,
    isSaving,
    lastSaved,
    saveManually,
    resetValue,
    validateCode,
    lineCount,
    characterCount,
    isEmpty
  } = useCodeEditor({
    initialValue: `// Mobile-Friendly Code Editor Test
function createProfile(userName) {
  // HARUS tambahkan 
  "use strict"; di sini
  // Deklarasikan 
  variabel dengan let/
  const, bukan 
  langsung assign
  // Tanpa strict 
  mode: status = 
  "active" (tidak 
  error)
  // Dengan strict 
  mode: status = 
  "active" (akan error)
}`,
    language: 'javascript',
    autoSave: true,
    autoSaveKey: 'test-editor',
    autoSaveDelay: 2000
  });

  const validation = validateCode();

  return (
    <div className="code-editor-test">
      <div className="test-header">
        <h2>🚀 Mobile-Friendly Code Editor</h2>
        <div className="editor-stats">
          <span className="stat">Lines: {lineCount}</span>
          <span className="stat">Chars: {characterCount}</span>
          {hasChanges && <span className="stat changes">Unsaved changes</span>}
          {isSaving && <span className="stat saving">Saving...</span>}
          {lastSaved && (
            <span className="stat saved">
              Saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      <div className="test-controls">
        <button
          onClick={saveManually}
          disabled={!hasChanges || isSaving}
          className="control-btn save-btn"
        >
          💾 Save
        </button>
        <button
          onClick={resetValue}
          className="control-btn reset-btn"
        >
          🔄 Reset
        </button>
        <button
          onClick={() => setValue('')}
          className="control-btn clear-btn"
        >
          🗑️ Clear
        </button>
      </div>

      <AdaptiveCodeEditor
        value={value}
        onChange={setValue}
        language="javascript"
        placeholder="// Start typing your code here..."
        height="400px"
      />

      {!validation.isValid && (
        <div className="validation-errors">
          <h3>⚠️ Code Issues:</h3>
          <ul>
            {validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="test-info">
        <div className="info-section">
          <h3>📱 Mobile Features</h3>
          <ul>
            <li>✅ 100% responsive design</li>
            <li>✅ Touch-friendly toolbar</li>
            <li>✅ Syntax highlighting</li>
            <li>✅ Line numbers</li>
            <li>✅ Auto-save functionality</li>
            <li>✅ Smart cursor positioning</li>
            <li>✅ Landscape mode support</li>
          </ul>
        </div>
        
        <div className="info-section">
          <h3>🎮 Quick Insert Buttons</h3>
          <ul>
            <li><code>Tab</code> - Insert 2 spaces</li>
            <li><code>( )</code> - Insert parentheses</li>
            <li><code>{ }</code> - Insert braces</li>
            <li><code>[ ]</code> - Insert brackets</li>
            <li><code>;</code> - Insert semicolon</li>
          </ul>
        </div>

        <div className="info-section">
          <h3>⚡ Performance</h3>
          <ul>
            <li>🚀 Lightweight (no Monaco overhead)</li>
            <li>📱 Native mobile scrolling</li>
            <li>⚡ Fast syntax highlighting</li>
            <li>💾 Auto-save to localStorage</li>
            <li>🎯 Perfect cursor positioning</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorTest;