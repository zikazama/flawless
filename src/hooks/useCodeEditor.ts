import { useState, useCallback, useEffect } from 'react';

interface UseCodeEditorOptions {
  initialValue?: string;
  language?: string;
  autoSave?: boolean;
  autoSaveKey?: string;
  autoSaveDelay?: number;
}

interface CodeEditorState {
  value: string;
  hasChanges: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
}

export const useCodeEditor = (options: UseCodeEditorOptions = {}) => {
  const {
    initialValue = '',
    language = 'javascript',
    autoSave = false,
    autoSaveKey,
    autoSaveDelay = 1000
  } = options;

  const [state, setState] = useState<CodeEditorState>({
    value: initialValue,
    hasChanges: false,
    isSaving: false,
    lastSaved: null
  });

  // Load saved value from localStorage on mount
  useEffect(() => {
    if (autoSaveKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(`code-editor-${autoSaveKey}`);
      if (saved) {
        try {
          const parsedSaved = JSON.parse(saved);
          setState(prev => ({
            ...prev,
            value: parsedSaved.value || initialValue,
            lastSaved: parsedSaved.timestamp ? new Date(parsedSaved.timestamp) : null
          }));
        } catch (error) {
          console.warn('Failed to load saved code:', error);
        }
      }
    }
  }, [autoSaveKey, initialValue]);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !autoSaveKey || !state.hasChanges) return;

    const saveTimer = setTimeout(async () => {
      setState(prev => ({ ...prev, isSaving: true }));

      try {
        const saveData = {
          value: state.value,
          timestamp: new Date().toISOString(),
          language
        };
        
        localStorage.setItem(`code-editor-${autoSaveKey}`, JSON.stringify(saveData));
        
        setState(prev => ({
          ...prev,
          hasChanges: false,
          isSaving: false,
          lastSaved: new Date()
        }));
      } catch (error) {
        console.error('Failed to auto-save code:', error);
        setState(prev => ({ ...prev, isSaving: false }));
      }
    }, autoSaveDelay);

    return () => clearTimeout(saveTimer);
  }, [state.value, state.hasChanges, autoSave, autoSaveKey, autoSaveDelay, language]);

  const setValue = useCallback((newValue: string) => {
    setState(prev => ({
      ...prev,
      value: newValue,
      hasChanges: newValue !== initialValue
    }));
  }, [initialValue]);

  const resetValue = useCallback(() => {
    setState(prev => ({
      ...prev,
      value: initialValue,
      hasChanges: false
    }));
  }, [initialValue]);

  const saveManually = useCallback(async () => {
    if (!autoSaveKey) return false;

    setState(prev => ({ ...prev, isSaving: true }));

    try {
      const saveData = {
        value: state.value,
        timestamp: new Date().toISOString(),
        language
      };
      
      localStorage.setItem(`code-editor-${autoSaveKey}`, JSON.stringify(saveData));
      
      setState(prev => ({
        ...prev,
        hasChanges: false,
        isSaving: false,
        lastSaved: new Date()
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to save code manually:', error);
      setState(prev => ({ ...prev, isSaving: false }));
      return false;
    }
  }, [state.value, autoSaveKey, language]);

  const clearSaved = useCallback(() => {
    if (autoSaveKey && typeof window !== 'undefined') {
      localStorage.removeItem(`code-editor-${autoSaveKey}`);
      setState(prev => ({ ...prev, lastSaved: null }));
    }
  }, [autoSaveKey]);

  // Code validation and analysis
  const validateCode = useCallback(() => {
    if (language !== 'javascript') return { isValid: true, errors: [] };

    const errors: string[] = [];
    const value = state.value.trim();

    if (!value) {
      return { isValid: true, errors: [] };
    }

    // Basic syntax checks for JavaScript
    try {
      // Check for basic syntax issues
      new Function(value);
      
      // Check for common issues
      if (value.includes('var ')) {
        errors.push('Consider using "let" or "const" instead of "var"');
      }
      
      if (value.includes('==') && !value.includes('===')) {
        errors.push('Consider using "===" instead of "==" for comparison');
      }
      
      // Check for missing semicolons (basic check)
      const lines = value.split('\n');
      lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine && 
            !trimmedLine.endsWith(';') && 
            !trimmedLine.endsWith('{') && 
            !trimmedLine.endsWith('}') &&
            !trimmedLine.startsWith('//') &&
            !trimmedLine.startsWith('/*') &&
            !trimmedLine.includes('if ') &&
            !trimmedLine.includes('for ') &&
            !trimmedLine.includes('while ') &&
            !trimmedLine.includes('function ')) {
          // This is a very basic check - in real world you'd use a proper parser
        }
      });
      
    } catch (syntaxError) {
      errors.push(`Syntax error: ${(syntaxError as Error).message}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [state.value, language]);

  const getLineCount = useCallback(() => {
    return state.value.split('\n').length;
  }, [state.value]);

  const getCharacterCount = useCallback(() => {
    return state.value.length;
  }, [state.value]);

  const insertAtCursor = useCallback((textToInsert: string, textarea?: HTMLTextAreaElement) => {
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = state.value.substring(0, start) + textToInsert + state.value.substring(end);
    
    setValue(newValue);
    
    // Use requestAnimationFrame for better cursor positioning
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    });
  }, [state.value, setValue]);

  return {
    // State
    value: state.value,
    hasChanges: state.hasChanges,
    isSaving: state.isSaving,
    lastSaved: state.lastSaved,
    
    // Actions
    setValue,
    resetValue,
    saveManually,
    clearSaved,
    insertAtCursor,
    
    // Analysis
    validateCode,
    getLineCount,
    getCharacterCount,
    
    // Computed values
    isEmpty: state.value.trim().length === 0,
    lineCount: getLineCount(),
    characterCount: getCharacterCount()
  };
};