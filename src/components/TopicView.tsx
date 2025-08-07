import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Course, Topic, FillInBlank } from '../data/modules';
import { UserProgress } from '../App';
import { playCorrectSound, playIncorrectSound, playCaseStudySuccess } from '../utils/sounds';
import './TopicView.css';

interface TopicViewProps {
  courses: Course[];
  userProgress: UserProgress;
  onComplete: (topicId: string) => void;
}

const TopicView: React.FC<TopicViewProps> = ({ courses, userProgress, onComplete }) => {
  const { courseId, moduleId, topicId } = useParams<{ 
    courseId: string; 
    moduleId: string; 
    topicId: string; 
  }>();
  
  const [currentSection, setCurrentSection] = useState<'content' | 'exercises' | 'case-study'>('content');
  const [fillInAnswers, setFillInAnswers] = useState<{[key: string]: string[]}>({});
  const [fillInResults, setFillInResults] = useState<{[key: string]: boolean}>({});
  const [caseStudyCode, setCaseStudyCode] = useState('');
  const [caseStudyResult, setCaseStudyResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [showCongrats, setShowCongrats] = useState(false);
  const [allExercisesCompleted, setAllExercisesCompleted] = useState(false);
  const [caseStudyCompleted, setCaseStudyCompleted] = useState(false);
  const [codeValidationMessage, setCodeValidationMessage] = useState('');

  const course = courses.find(c => c.id === courseId);
  const module = course?.modules.find(m => m.id === moduleId);
  const topic = module?.topics.find(t => t.id === topicId);

  // Load saved progress from localStorage
  useEffect(() => {
    // Reset all states first when topicId changes
    setFillInAnswers({});
    setFillInResults({});
    setAllExercisesCompleted(false);
    setCaseStudyCompleted(false);
    setCaseStudyResult('idle');
    setCodeValidationMessage('');
    
    const savedAnswers = localStorage.getItem(`fillInAnswers_${topicId}`);
    const savedResults = localStorage.getItem(`fillInResults_${topicId}`);
    const savedCaseStudyCode = localStorage.getItem(`caseStudyCode_${topicId}`);
    const savedCaseStudyResult = localStorage.getItem(`caseStudyResult_${topicId}`);
    
    if (savedAnswers) {
      setFillInAnswers(JSON.parse(savedAnswers));
    }
    
    if (savedResults) {
      const results = JSON.parse(savedResults);
      setFillInResults(results);
      // Check if all exercises are completed
      const allCompleted = topic?.fillInBlanks.every(ex => results[ex.id] === true) || false;
      setAllExercisesCompleted(allCompleted);
    }
    
    if (savedCaseStudyCode) {
      setCaseStudyCode(savedCaseStudyCode);
    } else if (topic?.caseStudy.initialCode) {
      setCaseStudyCode(topic.caseStudy.initialCode);
    }
    
    if (savedCaseStudyResult) {
      const result = JSON.parse(savedCaseStudyResult);
      setCaseStudyResult(result.status);
      setCaseStudyCompleted(result.completed);
    }
  }, [topicId, topic]);

  // Reset to content section when topic changes
  useEffect(() => {
    setCurrentSection('content');
  }, [topicId]);


  if (!course || !module || !topic) {
    return <Navigate to="/" replace />;
  }

  const isCompleted = userProgress.completedTopics.includes(topic.id);

  const checkFillInBlank = (exercise: FillInBlank) => {
    const answers = fillInAnswers[exercise.id] || [];
    
    let isCorrect = false;
    
    // Use intelligent validation based on exercise type and content
    isCorrect = validateFlexibleAnswers(answers, exercise);
    
    // Play sound effect
    if (isCorrect) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
    
    setFillInResults(prev => {
      const newResults = { ...prev, [exercise.id]: isCorrect };
      // Check if all exercises are completed
      const allCompleted = topic?.fillInBlanks.every(ex => newResults[ex.id] === true) || false;
      setAllExercisesCompleted(allCompleted);
      
      // Save to localStorage
      localStorage.setItem(`fillInResults_${topicId}`, JSON.stringify(newResults));
      localStorage.setItem(`fillInAnswers_${topicId}`, JSON.stringify(fillInAnswers));
      
      return newResults;
    });
    return isCorrect;
  };

  const validateFlexibleAnswers = (answers: string[], exercise: FillInBlank): boolean => {
    const code = exercise.code.toLowerCase();
    const explanation = exercise.explanation.toLowerCase();
    const exerciseId = exercise.id;
    
    // Ensure answers array has the correct length
    if (!answers || answers.length !== exercise.blanks.length) {
      return false;
    }
    
    // Define flexible validation rules
    const validationRules = {
      // Data Types - accept any valid values of the correct type
      dataTypes: (answer: string, context: string) => {
        if (context.includes('number')) return isValidNumber(answer);
        if (context.includes('boolean')) return isValidBoolean(answer);
        if (context.includes('string')) return isValidStringLiteral(answer);
        if (context.includes('array')) return isValidArray(answer);
        return false;
      },
      
      // Variable Declarations - accept let, const, var where appropriate
      variableDeclaration: (answer: string, context: string) => {
        const normalized = answer.trim().toLowerCase();
        if (context.includes('const') && context.includes('tidak')) return ['const'].includes(normalized);
        if (context.includes('diubah')) return ['let', 'var'].includes(normalized);
        if (context.includes('strict') && context.includes('let')) return ['let'].includes(normalized);
        return ['let', 'const', 'var'].includes(normalized);
      },
      
      // Operators - accept various operators for same operation
      operators: (answer: string, expectedOps: string[]) => {
        const normalized = answer.trim();
        return expectedOps.includes(normalized);
      },
      
      // Function Keywords
      functionKeywords: (answer: string, expected: string[]) => {
        const normalized = answer.trim().toLowerCase();
        return expected.includes(normalized);
      },
      
      // Type Conversion Functions
      typeConversion: (answer: string, context: string) => {
        const normalized = answer.trim();
        if (context.includes('string')) {
          return ['String', 'toString', '(123).toString', '123.toString'].some(method => 
            normalized === method || normalized.includes('toString')
          );
        }
        if (context.includes('number')) {
          return ['Number', 'parseInt', 'parseFloat'].includes(normalized);
        }
        if (context.includes('boolean')) {
          return ['Boolean'].includes(normalized);
        }
        return false;
      }
    };

    // Apply validation based on exercise type
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i] ? answers[i].trim() : '';
      if (!answer || answer === '' || answer.length === 0) {
        return false; // Empty answers not allowed
      }
      
      const codeLines = code.split('\n');
      const currentLineIndex = Math.min(i, codeLines.length - 1);
      const currentLine = codeLines[currentLineIndex] || code;
      
      let isValidAnswer = false;
      
      // Data type exercises - now accepts type names OR actual values
      if (exerciseId.startsWith('dt') || explanation.includes('tipe data')) {
        isValidAnswer = validateDataTypeAnswer(answer, currentLine, exercise.blanks[i]);
      }
      // Variable declaration exercises  
      else if (explanation.includes('variabel') || explanation.includes('gunakan') || 
               ['let', 'const', 'var'].some(kw => exercise.blanks.includes(kw))) {
        isValidAnswer = validationRules.variableDeclaration(answer, explanation);
      }
      // Comparison operators
      else if (['==', '===', '!=', '!==', '>', '<', '>=', '<='].some(op => exercise.blanks.includes(op))) {
        const validComparison = ['==', '===', '!=', '!==', '>', '<', '>=', '<='];
        isValidAnswer = validComparison.includes(answer);
      }
      // Math operators
      else if (['%', '**', '+', '-', '*', '/', '+=', '-=', '*=', '/=', '++', '--'].some(op => exercise.blanks.includes(op))) {
        const validMath = ['%', '**', '+', '-', '*', '/', '+=', '-=', '*=', '/=', '++', '--'];
        isValidAnswer = validMath.includes(answer);
      }
      // Logical operators
      else if (['&&', '||', '!', '??'].some(op => exercise.blanks.includes(op))) {
        const validLogical = ['&&', '||', '!', '??'];
        isValidAnswer = validLogical.includes(answer);
      }
      // Type conversion functions
      else if (explanation.includes('konversi') || ['String', 'Number', 'Boolean'].some(fn => exercise.blanks.includes(fn))) {
        // Special flexible handling for all type conversion exercises
        if (exercise.id === 'tc1') {
          // String conversion: accept String or toString variations
          isValidAnswer = answer.trim() === 'String' || answer.trim().includes('toString');
        } else if (exercise.id === 'tc2') {
          // Number conversion: accept Number, parseInt, parseFloat
          const validNumberMethods = ['Number', 'parseInt', 'parseFloat'];
          isValidAnswer = validNumberMethods.includes(answer.trim());
        } else if (exercise.id === 'tc3') {
          // Boolean conversion: accept Boolean
          isValidAnswer = answer.trim() === 'Boolean';
        } else {
          isValidAnswer = validationRules.typeConversion(answer, explanation);
        }
      }
      // Control flow keywords
      else if (['if', 'else', 'switch', 'case', 'break', 'default', 'for', 'while', 'do'].some(kw => exercise.blanks.includes(kw))) {
        const validKeywords = ['if', 'else', 'switch', 'case', 'break', 'default', 'for', 'while', 'do', 'continue'];
        isValidAnswer = validKeywords.includes(answer.toLowerCase());
      }
      // Function-related keywords
      else if (['function', 'return'].some(kw => exercise.blanks.includes(kw))) {
        const validFunctionKeywords = ['function', 'return'];
        isValidAnswer = validFunctionKeywords.includes(answer.toLowerCase());
      }
      // Arrow functions
      else if (exercise.blanks.includes('=>')) {
        isValidAnswer = answer === '=>';
      }
      // Ternary operators  
      else if (exercise.blanks.includes('?') || exercise.blanks.includes(':')) {
        isValidAnswer = ['?', ':'].includes(answer);
      }
      // Loop keywords
      else if (['of', 'in'].some(kw => exercise.blanks.includes(kw))) {
        isValidAnswer = ['of', 'in'].includes(answer.toLowerCase());
      }
      // Strict mode
      else if (exercise.blanks.includes('"use strict";')) {
        isValidAnswer = ['"use strict";', "'use strict';"].includes(answer);
      }
      // undefined and null values
      else if (['undefined', 'null'].some(val => exercise.blanks.includes(val))) {
        isValidAnswer = answer.toLowerCase() === exercise.blanks[i].toLowerCase();
      }
      // TypeScript specific
      else if (exerciseId.startsWith('ts') || explanation.includes('typescript')) {
        isValidAnswer = validateTypeScriptAnswers(answer, exercise.blanks[i]);
      }
      // Default: normalized string comparison (fallback)
      else {
        const normalizedAnswer = answer.toLowerCase();
        const normalizedExpected = exercise.blanks.map(blank => blank.toLowerCase());
        isValidAnswer = normalizedExpected.includes(normalizedAnswer);
      }
      
      if (!isValidAnswer) return false;
    }
    
    return true;
  };

  const isValidNumber = (value: string): boolean => {
    const trimmed = value.trim();
    return !isNaN(Number(trimmed)) && trimmed !== '' && !isNaN(parseFloat(trimmed));
  };

  const isValidBoolean = (value: string): boolean => {
    const trimmed = value.trim().toLowerCase();
    return trimmed === 'true' || trimmed === 'false';
  };

  const isValidStringLiteral = (value: string): boolean => {
    const trimmed = value.trim();
    return (trimmed.startsWith('"') && trimmed.endsWith('"')) || 
           (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
           (trimmed.startsWith('`') && trimmed.endsWith('`'));
  };

  const isValidArray = (value: string): boolean => {
    const trimmed = value.trim();
    return trimmed.startsWith('[') && trimmed.endsWith(']');
  };

  const validateDataTypeAnswer = (answer: string, context: string, expectedType: string): boolean => {
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedExpected = expectedType.toLowerCase();
    
    // Handle undefined and null specifically
    if (normalizedExpected === 'undefined') {
      return normalizedAnswer === 'undefined';
    } else if (normalizedExpected === 'null') {
      return normalizedAnswer === 'null';
    }
    
    // If expected is a type name (number, string, boolean, array)
    if (['number', 'string', 'boolean', 'array'].includes(normalizedExpected)) {
      if (normalizedExpected === 'number') {
        return isValidNumber(answer);
      } else if (normalizedExpected === 'string') {
        return isValidStringLiteral(answer);
      } else if (normalizedExpected === 'boolean') {
        return isValidBoolean(answer);
      } else if (normalizedExpected === 'array') {
        return isValidArray(answer);
      }
    }
    
    // Fallback: check if it's a valid value of the type mentioned in context
    if (context.includes('number')) {
      return isValidNumber(answer);
    } else if (context.includes('string')) {
      return isValidStringLiteral(answer);
    } else if (context.includes('boolean')) {
      return isValidBoolean(answer);
    } else if (context.includes('array')) {
      return isValidArray(answer);
    }
    
    return false;
  };

  const validateCodePatterns = (code: string, caseStudy: any): { isValid: boolean, message: string } => {
    const caseStudyId = caseStudy.id;
    const description = caseStudy.description.toLowerCase();
    const cleanCode = code.trim().toLowerCase();
    
    // Variable declaration exercises
    if (caseStudyId === 'cs-variables' || description.includes('gunakan const') || description.includes('gunakan let')) {
      if (!cleanCode.includes('const') && description.includes('const')) {
        return { isValid: false, message: 'Gunakan "const" untuk variabel yang tidak berubah sesuai instruksi.' };
      }
      if (!cleanCode.includes('let') && description.includes('let')) {
        return { isValid: false, message: 'Gunakan "let" untuk variabel yang akan berubah sesuai instruksi.' };
      }
      if (!cleanCode.includes('return')) {
        return { isValid: false, message: 'Function harus mengembalikan (return) object yang diminta.' };
      }
    }
    
    // Strict mode exercises
    if (caseStudyId === 'cs-strict' || description.includes('strict mode')) {
      if (!cleanCode.includes('use strict') && !cleanCode.includes("'use strict'")) {
        return { isValid: false, message: 'Tambahkan "use strict"; di dalam function sesuai instruksi.' };
      }
    }
    
    // Data types exercises
    if (caseStudyId === 'cs-datatypes' || description.includes('typeof')) {
      if (!cleanCode.includes('typeof')) {
        return { isValid: false, message: 'Gunakan operator "typeof" untuk mengetahui tipe data sesuai instruksi.' };
      }
    }
    
    // Type conversion exercises
    if (caseStudyId === 'cs-typeconv' || description.includes('number()') || description.includes('boolean()') || description.includes('string()')) {
      const hasTypeConversion = cleanCode.includes('number(') || cleanCode.includes('boolean(') || cleanCode.includes('string(');
      if (!hasTypeConversion) {
        return { isValid: false, message: 'Gunakan fungsi konversi tipe seperti Number(), Boolean(), atau String() sesuai instruksi.' };
      }
    }
    
    // Math operations exercises
    if (caseStudyId === 'cs-math' || description.includes('operator matematika')) {
      const hasBasicOps = cleanCode.includes('+') || cleanCode.includes('-') || cleanCode.includes('*');
      if (!hasBasicOps) {
        return { isValid: false, message: 'Gunakan operator matematika (+, -, *, /, %, **) sesuai instruksi.' };
      }
    }
    
    // Comparison exercises  
    if (caseStudyId === 'cs-compare' || description.includes('operator perbandingan')) {
      const hasComparison = cleanCode.includes('==') || cleanCode.includes('>') || cleanCode.includes('<');
      if (!hasComparison) {
        return { isValid: false, message: 'Gunakan operator perbandingan (==, ===, >, <, dll) sesuai instruksi.' };
      }
    }
    
    // If-else exercises
    if (caseStudyId === 'cs-ifelse' || description.includes('if-else')) {
      if (!cleanCode.includes('if')) {
        return { isValid: false, message: 'Gunakan struktur if-else sesuai instruksi.' };
      }
    }
    
    // Logical operators exercises
    if (caseStudyId === 'cs-logical' || description.includes('operator logika')) {
      const hasLogicalOp = cleanCode.includes('&&') || cleanCode.includes('||') || cleanCode.includes('!');
      if (!hasLogicalOp) {
        return { isValid: false, message: 'Gunakan operator logika (&&, ||, !) sesuai instruksi.' };
      }
    }
    
    // Nullish coalescing exercises
    if (caseStudyId === 'cs-nullish' || description.includes('??')) {
      if (!cleanCode.includes('??')) {
        return { isValid: false, message: 'Gunakan nullish coalescing operator (??) sesuai instruksi.' };
      }
    }
    
    // Loop exercises
    if (caseStudyId === 'cs-loops' || description.includes('for loop') || description.includes('while loop')) {
      const hasLoop = cleanCode.includes('for') || cleanCode.includes('while');
      if (!hasLoop) {
        return { isValid: false, message: 'Gunakan loop (for atau while) sesuai instruksi.' };
      }
    }
    
    // Switch exercises
    if (caseStudyId === 'cs-switch' || description.includes('switch')) {
      if (!cleanCode.includes('switch')) {
        return { isValid: false, message: 'Gunakan switch statement sesuai instruksi.' };
      }
      if (!cleanCode.includes('case')) {
        return { isValid: false, message: 'Gunakan case dalam switch statement.' };
      }
    }
    
    // Function exercises
    if (caseStudyId === 'cs-function' || description.includes('function declaration')) {
      if (!cleanCode.includes('function')) {
        return { isValid: false, message: 'Gunakan function declaration sesuai instruksi.' };
      }
    }
    
    // Function expression exercises
    if (caseStudyId === 'cs-funcexpr' || description.includes('function expression')) {
      const hasExpression = cleanCode.includes('const') && cleanCode.includes('function');
      if (!hasExpression && !cleanCode.includes('=')) {
        return { isValid: false, message: 'Buat function expression (const name = function() {}) sesuai instruksi.' };
      }
    }
    
    // Arrow function exercises
    if (caseStudyId === 'cs-arrow' || description.includes('arrow function')) {
      if (!cleanCode.includes('=>')) {
        return { isValid: false, message: 'Gunakan arrow function syntax (=>) sesuai instruksi.' };
      }
    }
    
    // TypeScript exercises
    if (caseStudyId === 'cs-tsinit' || description.includes('type annotations')) {
      if (!cleanCode.includes(':')) {
        return { isValid: false, message: 'Tambahkan type annotations (parameter: type) sesuai instruksi TypeScript.' };
      }
    }
    
    // General function validation
    if (description.includes('function') && !cleanCode.includes('return')) {
      return { isValid: false, message: 'Function harus mengembalikan nilai dengan "return".' };
    }
    
    return { isValid: true, message: '' };
  };

  const validateTypeScriptAnswers = (answer: string, expected: string): boolean => {
    const normalizedAnswer = answer.trim();
    const normalizedExpected = expected.trim();
    
    // TypeScript-specific flexible validation
    if (expected.includes('-D') || expected.includes('--init')) {
      return normalizedAnswer === normalizedExpected;
    }
    
    return normalizedAnswer.toLowerCase() === normalizedExpected.toLowerCase();
  };

  const checkAllFillIns = () => {
    let allCorrect = true;
    topic?.fillInBlanks.forEach(exercise => {
      const correct = checkFillInBlank(exercise);
      if (!correct) allCorrect = false;
    });
    setAllExercisesCompleted(allCorrect);
    return allCorrect;
  };

  const runCaseStudy = () => {
    try {
      // First check if code follows the required patterns
      const codeValidation = validateCodePatterns(caseStudyCode, topic.caseStudy);
      
      if (!codeValidation.isValid) {
        setCaseStudyResult('error');
        setCaseStudyCompleted(false);
        setCodeValidationMessage(codeValidation.message);
        
        // Play error sound
        playIncorrectSound();
        
        // Save current code but not as completed
        localStorage.setItem(`caseStudyCode_${topicId}`, caseStudyCode);
        localStorage.setItem(`caseStudyResult_${topicId}`, JSON.stringify({
          status: 'error',
          completed: false
        }));
        return;
      }
      
      // Then check if the output is correct
      const func = new Function(caseStudyCode + '\n' + topic.caseStudy.testFunction);
      const result = func();
      
      if (result === true) {
        setCaseStudyResult('success');
        setCaseStudyCompleted(true);
        setCodeValidationMessage('');
        
        // Play success sound
        playCaseStudySuccess();
        
        // Save to localStorage
        localStorage.setItem(`caseStudyCode_${topicId}`, caseStudyCode);
        localStorage.setItem(`caseStudyResult_${topicId}`, JSON.stringify({
          status: 'success',
          completed: true
        }));
        
        // Only complete the topic if all exercises AND case study are done
        if (!isCompleted && allExercisesCompleted && result === true) {
          onComplete(topic.id);
          setShowCongrats(true);
          setTimeout(() => setShowCongrats(false), 3000);
        }
      } else {
        setCaseStudyResult('error');
        setCaseStudyCompleted(false);
        setCodeValidationMessage('Output tidak sesuai yang diharapkan. Periksa return value function Anda.');
        
        // Play error sound
        playIncorrectSound();
        
        // Save current code but not as completed
        localStorage.setItem(`caseStudyCode_${topicId}`, caseStudyCode);
        localStorage.setItem(`caseStudyResult_${topicId}`, JSON.stringify({
          status: 'error',
          completed: false
        }));
      }
    } catch (error) {
      setCaseStudyResult('error');
      setCaseStudyCompleted(false);
      setCodeValidationMessage(`Error dalam kode: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Play error sound
      playIncorrectSound();
      
      // Save current code but not as completed
      localStorage.setItem(`caseStudyCode_${topicId}`, caseStudyCode);
      localStorage.setItem(`caseStudyResult_${topicId}`, JSON.stringify({
        status: 'error',
        completed: false
      }));
    }
  };

  // Check if user can proceed to next topic - MUST complete current topic's exercises and case study
  const canProceedToNext = allExercisesCompleted && caseStudyCompleted;

  // Helper functions to generate examples
  const getExampleInput = (caseStudy: any) => {
    const examples: {[key: string]: string} = {
      'cs-strict': 'createProfile("John")',
      'cs-variables': 'processOrder()',
      'cs-datatypes': 'analyzeData("hello")',
      'cs-typeconv': 'convertTypes("42", "number")',
      'cs-math': 'mathOperations(5, 3)',
      'cs-compare': 'compareValues("5", 5)',
      'cs-ifelse': 'checkConditions(5)',
      'cs-logical': 'logicOperations(true, false)',
      'cs-nullish': 'handleDefaults({name: "John", age: 0, city: null})',
      'cs-loops': 'countPatterns(5)',
      'cs-switch': 'gradeToPoints("A")',
      'cs-function': 'calculateArea("circle", 5)',
      'cs-funcexpr': 'testBehavior()',
      'cs-arrow': 'createArrowFunctions()',
      'cs-tsinit': 'createUser("Alice", 25, "alice@example.com")',
      'cs-tsconfig': 'generateTSConfig()'
    };
    
    return examples[caseStudy.id] || 'Lihat deskripsi di atas untuk contoh penggunaan';
  };

  const getExampleOutput = (caseStudy: any) => {
    // Format JSON with proper indentation for better readability
    return JSON.stringify(caseStudy.expectedOutput, null, 2);
  };

  const renderFillInBlank = (exercise: FillInBlank) => {
    const parts = exercise.code.split(/_____/g);
    const answers = fillInAnswers[exercise.id] || [];
    const result = fillInResults[exercise.id];
    
    return (
      <div className="fill-in-exercise">
        <div className="exercise-code">
          <pre>
            {parts.map((part, index) => (
              <React.Fragment key={index}>
                <span className="code-part">{part}</span>
                {index < parts.length - 1 && (
                  <input
                    type="text"
                    className={`fill-input ${result === true ? 'correct' : result === false ? 'incorrect' : ''}`}
                    value={answers[index] || ''}
                    onChange={(e) => {
                      if (result === true) return; // Disable editing if already correct
                      
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      const newFillInAnswers = {
                        ...fillInAnswers,
                        [exercise.id]: newAnswers
                      };
                      setFillInAnswers(newFillInAnswers);
                      
                      // Auto-save answers
                      localStorage.setItem(`fillInAnswers_${topicId}`, JSON.stringify(newFillInAnswers));
                    }}
                    placeholder="..."
                    disabled={result === true}
                  />
                )}
              </React.Fragment>
            ))}
          </pre>
        </div>

        <div className="exercise-controls">
          <button 
            onClick={() => checkFillInBlank(exercise)} 
            className="check-btn"
            disabled={result === true}
          >
            Periksa
          </button>
          {result !== undefined && (
            <span className={`result-text ${result ? 'correct' : 'incorrect'}`}>
              {result ? '✅ Benar!' : '❌ Coba lagi'}
            </span>
          )}
        </div>
        {result === false && (
          <div className="hint">{exercise.explanation}</div>
        )}
      </div>
    );
  };

  const getNextTopic = () => {
    const currentModuleIndex = course.modules.findIndex(m => m.id === moduleId);
    const currentTopicIndex = module.topics.findIndex(t => t.id === topicId);
    
    if (currentTopicIndex < module.topics.length - 1) {
      return {
        courseId,
        moduleId,
        topicId: module.topics[currentTopicIndex + 1].id
      };
    }
    
    if (currentModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentModuleIndex + 1];
      return {
        courseId,
        moduleId: nextModule.id,
        topicId: nextModule.topics[0].id
      };
    }
    
    return null;
  };

  const nextTopic = getNextTopic();

  return (
    <div className="topic-view">
      {showCongrats && (
        <div className="congrats-popup">
          🎉 Selamat! Anda telah menyelesaikan topik ini! +100 Poin
        </div>
      )}

      <div className="topic-header">
        <Link to={`/course/${courseId}`} className="back-button">
          ← Kembali ke Modul
        </Link>
        <h2>{topic.title}</h2>
        {isCompleted && <span className="completed-badge">✅ Selesai</span>}
      </div>

      <div className="section-tabs">
        <button 
          className={`tab ${currentSection === 'content' ? 'active' : ''}`}
          onClick={() => setCurrentSection('content')}
        >
          📖 Materi
        </button>
        <button 
          className={`tab ${currentSection === 'exercises' ? 'active' : ''}`}
          onClick={() => setCurrentSection('exercises')}
        >
          ✏️ Latihan ({topic.fillInBlanks.length})
        </button>
        <button 
          className={`tab ${currentSection === 'case-study' ? 'active' : ''}`}
          onClick={() => setCurrentSection('case-study')}
        >
          💡 Study Case
        </button>
      </div>

      <div className="section-content">
        {currentSection === 'content' && (
          <div className="content-section">
            <div className="content-text">
              {topic.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className={paragraph.startsWith('**') ? 'bold-text' : ''}>
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                )
              ))}
            </div>

            {topic.analogies && (
              <div className="analogy-box">
                <h4>💡 Analogi</h4>
                <p>{topic.analogies}</p>
              </div>
            )}

            <div className="examples-section">
              <h4>📝 Contoh Kode</h4>
              {topic.examples.map((example, index) => (
                <div key={index} className="code-example">
                  <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                    {example}
                  </SyntaxHighlighter>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentSection === 'exercises' && (
          <div className="exercises-section">
            <h3>Lengkapi Kode</h3>
            <p className="section-desc">
              Isi bagian yang kosong dengan kode yang tepat
            </p>
            {topic.fillInBlanks.map((exercise, index) => (
              <div key={exercise.id} className="exercise-item">
                <h4>Latihan {index + 1}</h4>
                {renderFillInBlank(exercise)}
              </div>
            ))}
          </div>
        )}

        {currentSection === 'case-study' && (
          <div className="case-study-section">
            <h3>{topic.caseStudy.title}</h3>
            <div className="case-description">
              <p>{topic.caseStudy.description}</p>
              
              <div className="example-section">
                <div className="example-input">
                  <h4>📥 Example Input:</h4>
                  <div className="example-code">
                    {getExampleInput(topic.caseStudy)}
                  </div>
                </div>
                
                <div className="example-output">
                  <h4>📤 Expected Output:</h4>
                  <div className="example-result">
                    {getExampleOutput(topic.caseStudy)}
                  </div>
                </div>
              </div>
            </div>

            <div className="code-editor">
              <textarea
                value={caseStudyCode}
                onChange={(e) => {
                  if (caseStudyCompleted) return; // Disable editing if already completed
                  
                  setCaseStudyCode(e.target.value);
                  // Auto-save code as user types
                  localStorage.setItem(`caseStudyCode_${topicId}`, e.target.value);
                }}
                onKeyDown={(e) => {
                  if (caseStudyCompleted) return; // Disable keyboard events if completed
                  
                  // Handle Tab key for indentation
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const textarea = e.target as HTMLTextAreaElement;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    
                    // Insert tab character or spaces
                    const tabChar = '  '; // 2 spaces
                    const newValue = textarea.value.substring(0, start) + tabChar + textarea.value.substring(end);
                    
                    setCaseStudyCode(newValue);
                    localStorage.setItem(`caseStudyCode_${topicId}`, newValue);
                    
                    // Set cursor position after the inserted tab
                    setTimeout(() => {
                      textarea.selectionStart = textarea.selectionEnd = start + tabChar.length;
                    }, 0);
                  }
                  
                  // Handle Enter key for auto-indentation
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const textarea = e.target as HTMLTextAreaElement;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const lines = textarea.value.substring(0, start).split('\n');
                    const currentLine = lines[lines.length - 1];
                    
                    // Count leading spaces for indentation
                    const leadingSpaces = currentLine.match(/^(\s*)/)?.[1] || '';
                    
                    // Add extra indentation if line ends with { or (
                    const extraIndent = /[{(]\s*$/.test(currentLine.trim()) ? '  ' : '';
                    
                    const newIndent = '\n' + leadingSpaces + extraIndent;
                    const newValue = textarea.value.substring(0, start) + newIndent + textarea.value.substring(end);
                    setCaseStudyCode(newValue);
                    localStorage.setItem(`caseStudyCode_${topicId}`, newValue);
                    
                    // Set cursor position after the inserted newline and indentation
                    setTimeout(() => {
                      textarea.selectionStart = textarea.selectionEnd = start + newIndent.length;
                    }, 0);
                  }
                }}
                placeholder="Tulis kode Anda di sini..."
                rows={15}
                disabled={caseStudyCompleted}
              />
            </div>

            <div className="case-controls">
              <button 
                onClick={runCaseStudy} 
                className="run-btn"
                disabled={caseStudyCompleted}
              >
                ▶️ Jalankan Kode
              </button>
              {caseStudyResult === 'success' && (
                <span className="result-success">✅ Berhasil! Kode Anda benar!</span>
              )}
              {caseStudyResult === 'error' && (
                <div className="result-error-container">
                  <span className="result-error">❌ Belum tepat, coba lagi!</span>
                  {codeValidationMessage && (
                    <div className="code-validation-message">
                      💡 <strong>Saran:</strong> {codeValidationMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="navigation-footer">
        {nextTopic && canProceedToNext && (
          <Link 
            to={`/course/${nextTopic.courseId}/module/${nextTopic.moduleId}/topic/${nextTopic.topicId}`}
            className="next-button"
          >
            Topik Selanjutnya →
          </Link>
        )}
        {nextTopic && !canProceedToNext && (
          <div className="locked-next">
            <span className="locked-button">
              🔒 Selesaikan semua latihan dan study case untuk melanjutkan
            </span>
            <div className="progress-status">
              <button 
                className={`status-item clickable ${allExercisesCompleted ? 'completed' : 'pending'}`}
                onClick={() => setCurrentSection('exercises')}
              >
                {allExercisesCompleted ? '✅' : '⏳'} Latihan ({Object.values(fillInResults).filter(r => r === true).length}/{topic?.fillInBlanks.length || 0})
              </button>
              <button 
                className={`status-item clickable ${caseStudyCompleted ? 'completed' : 'pending'}`}
                onClick={() => setCurrentSection('case-study')}
              >
                {caseStudyCompleted ? '✅' : '⏳'} Study Case
              </button>
            </div>
          </div>
        )}
        {!nextTopic && canProceedToNext && (
          <Link to={`/course/${courseId}`} className="finish-button">
            🎉 Selesai! Kembali ke Modul
          </Link>
        )}
        {!nextTopic && !canProceedToNext && (
          <div className="locked-next">
            <span className="locked-button">
              🔒 Selesaikan semua latihan dan study case untuk menyelesaikan topik
            </span>
            <div className="progress-status">
              <button 
                className={`status-item clickable ${allExercisesCompleted ? 'completed' : 'pending'}`}
                onClick={() => setCurrentSection('exercises')}
              >
                {allExercisesCompleted ? '✅' : '⏳'} Latihan ({Object.values(fillInResults).filter(r => r === true).length}/{topic?.fillInBlanks.length || 0})
              </button>
              <button 
                className={`status-item clickable ${caseStudyCompleted ? 'completed' : 'pending'}`}
                onClick={() => setCurrentSection('case-study')}
              >
                {caseStudyCompleted ? '✅' : '⏳'} Study Case
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicView;