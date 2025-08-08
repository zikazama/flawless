import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { QuizQuestion } from '../data/modules';
import { playCorrectSound, playIncorrectSound, playTimerTick, playTimerWarning } from '../utils/sounds';
import { quizCache } from '../utils/quizCache';
import './Quiz.css';
import './ErrorBoundary.css';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (passed: boolean) => void;
  topicId: string;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, topicId }) => {
  // Always start fresh - no saved state on mount
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  
  // Refs for better performance
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const lastClickTime = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  // Memoized values for better performance
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const passingScore = 4; // Need 4 out of 5 correct
  const progressPercentage = useMemo(() => ((currentQuestionIndex + 1) / questions.length) * 100, [currentQuestionIndex, questions.length]);


  // Define handleTimeUp before using it in effects
  const handleTimeUp = useCallback(() => {
    if (showResult || isQuizComplete || isPaused) return; // Prevent duplicate submissions
    
    setIsTimerActive(false);
    setShowResult(true);
    const newUserAnswers = [...userAnswers, null];
    setUserAnswers(newUserAnswers);
    if (soundEnabled) {
      playIncorrectSound();
    }
  }, [userAnswers, showResult, isQuizComplete, isPaused, soundEnabled]);

  // Enhanced timer effect with pause functionality
  useEffect(() => {
    if (!quizStarted || !isTimerActive || showResult || isQuizComplete || isPaused) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        const newTime = timeLeft - 1;
        setTimeLeft(newTime);
        
        // Play sound effects based on time remaining
        if (soundEnabled) {
          if (newTime <= 3 && newTime > 0) {
            // Warning sound for last 3 seconds
            playTimerWarning();
          } else if (newTime > 3) {
            // Normal tick sound
            playTimerTick();
          }
        }
      }, 1000);
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    } else {
      // Time's up - auto submit with no answer
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive, showResult, isQuizComplete, quizStarted, handleTimeUp, isPaused, soundEnabled]);

  // Reset timer when question changes
  useEffect(() => {
    if (quizStarted && !showResult && !isQuizComplete) {
      setTimeLeft(10);
      setIsTimerActive(true);
    }
  }, [currentQuestionIndex, quizStarted, showResult, isQuizComplete]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    // Debounce implementation
    const now = Date.now();
    if (now - lastClickTime.current < 300) return;
    lastClickTime.current = now;
    
    if (showResult || !isTimerActive || isQuizComplete || isPaused || isTransitioning) return;
    
    // Add haptic feedback for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    setSelectedAnswer(answerIndex);
    setIsTimerActive(false);
    setShowResult(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newUserAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newUserAnswers);
    
    console.log('Answer selected:', {
      questionIndex: currentQuestionIndex,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      currentUserAnswers: userAnswers,
      newUserAnswers
    });
    
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      console.log(`Correct answer! New score: ${newScore}`);
      if (soundEnabled) {
        playCorrectSound();
      }
    } else {
      console.log(`Incorrect answer. Score remains: ${score}`);
      if (soundEnabled) {
        playIncorrectSound();
      }
    }
  }, [showResult, isTimerActive, isQuizComplete, isPaused, isTransitioning, currentQuestion, userAnswers, score, soundEnabled]);

  const handleNextQuestion = useCallback(async () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setIsLoading(true);
    
    // Add transition delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(10); // Reset timer to 10 seconds
      setIsTimerActive(true);
      
      console.log('Moving to next question:', {
        newIndex,
        score,
        userAnswers
      });
    } else {
      // Quiz complete - ensure we have the final score calculated correctly
      const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      const passed = finalScore >= passingScore;
      
      setIsQuizComplete(true);
      
      // Debug: Log final results
      console.log('Quiz Complete!', {
        score,
        finalScore,
        passingScore,
        passed,
        userAnswers,
        totalQuestions: questions.length
      });
      
      // Save quiz result to cache with completion time
      const completionTime = quizStartTime ? Date.now() - quizStartTime : 0;
      try {
        quizCache.saveQuizResult({
          topicId,
          score: finalScore,
          totalQuestions: questions.length,
          passed,
          completionTime
        });

        // Legacy localStorage for compatibility
        localStorage.setItem(`quiz_${topicId}_score`, finalScore.toString());
        localStorage.setItem(`quiz_${topicId}_passed`, passed.toString());
        localStorage.setItem(`quiz_${topicId}_timestamp`, Date.now().toString());
      } catch (error) {
        console.warn('Failed to save quiz results:', error);
      }
      
      onComplete(passed);
    }
    
    setIsLoading(false);
    setIsTransitioning(false);
  }, [currentQuestionIndex, questions.length, score, selectedAnswer, currentQuestion, passingScore, topicId, onComplete, isTransitioning]);

  const handleStartQuiz = useCallback(async () => {
    setIsLoading(true);
    setQuizStartTime(Date.now());
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setQuizStarted(true);
    setTimeLeft(10);
    setIsTimerActive(true);
    setIsLoading(false);
    // No need to save to localStorage - quiz should restart on refresh
  }, []);

  const handleRetryQuiz = useCallback(() => {
    // Reset everything for retry
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(10);
    setIsQuizComplete(false);
    setUserAnswers([]);
    setIsTimerActive(true);
    setIsPaused(false);
    setIsTransitioning(false);
    setIsLoading(false);
    setQuizStartTime(null);
    // No need to clear localStorage since we're not saving progress
  }, []);

  const getTimerColor = useMemo(() => {
    if (timeLeft > 7) return 'timer-green';
    if (timeLeft > 3) return 'timer-yellow';
    return 'timer-red';
  }, [timeLeft]);

  const getTimerClass = useMemo(() => {
    let classes = `timer ${getTimerColor}`;
    if (timeLeft <= 3 && timeLeft > 0 && !isPaused) {
      classes += ' timer-pulsing';
    }
    if (isPaused) {
      classes += ' timer-paused';
    }
    return classes;
  }, [getTimerColor, timeLeft, isPaused]);

  // Pause/Resume functionality
  const togglePause = useCallback(() => {
    if (isQuizComplete || showResult) return;
    setIsPaused(!isPaused);
  }, [isPaused, isQuizComplete, showResult]);

  // Sound toggle functionality
  const toggleSound = useCallback(() => {
    setSoundEnabled(!soundEnabled);
    // Save preference to localStorage
    try {
      localStorage.setItem('quiz_sound_enabled', (!soundEnabled).toString());
    } catch (error) {
      console.warn('Failed to save sound preference:', error);
    }
  }, [soundEnabled]);

  // Load preferences and setup offline detection on mount
  useEffect(() => {
    try {
      const savedSoundPref = localStorage.getItem('quiz_sound_enabled');
      if (savedSoundPref !== null) {
        setSoundEnabled(savedSoundPref === 'true');
      }
    } catch (error) {
      console.warn('Failed to load sound preference:', error);
    }

    // Cache quiz questions
    if (questions.length > 0) {
      quizCache.cacheQuizQuestions(topicId, questions);
    }

    // Setup offline/online detection
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [questions, topicId]);

  // Touch/Swipe gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (showResult || isQuizComplete || isPaused) return;
    
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, [showResult, isQuizComplete, isPaused]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (showResult || isQuizComplete || isPaused || !touchStartX.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;
    
    // Only handle horizontal swipes that are more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      // Prevent default browser behavior
      e.preventDefault();
      
      if (deltaX > 0) {
        // Swiped right - go to previous question (if in result state)
        if (currentQuestionIndex > 0 && showResult) {
          // Could add navigation to previous question
        }
      } else {
        // Swiped left - go to next question
        if (showResult && currentQuestionIndex < questions.length - 1) {
          handleNextQuestion();
        }
      }
    }
    
    touchStartX.current = 0;
    touchStartY.current = 0;
  }, [showResult, isQuizComplete, isPaused, currentQuestionIndex, questions.length, handleNextQuestion]);

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <p>Quiz belum tersedia untuk topik ini.</p>
      </div>
    );
  }

  // Quiz Instructions Page
  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-instructions">
          <div className="instructions-header">
            <h2>🎯 Quiz Interaktif</h2>
            <div className="quiz-badge">Tes Pemahaman</div>
          </div>

          <div className="instructions-content">
            <div className="instruction-card">
              <h3>📋 Tata Cara Pengerjaan</h3>
              <ul className="instruction-list">
                <li>
                  <span className="instruction-icon">⏱️</span>
                  <div>
                    <strong>Waktu Terbatas:</strong> Setiap soal memiliki waktu 10 detik untuk menjawab
                  </div>
                </li>
                <li>
                  <span className="instruction-icon">🔢</span>
                  <div>
                    <strong>Jumlah Soal:</strong> Quiz terdiri dari 5 pertanyaan pilihan ganda
                  </div>
                </li>
                <li>
                  <span className="instruction-icon">✅</span>
                  <div>
                    <strong>Syarat Lulus:</strong> Minimal 4 jawaban benar dari 5 soal
                  </div>
                </li>
                <li>
                  <span className="instruction-icon">🔄</span>
                  <div>
                    <strong>Kesempatan Ulang:</strong> Jika belum lulus, bisa mengulang dengan soal acak berbeda
                  </div>
                </li>
                <li>
                  <span className="instruction-icon">🆓</span>
                  <div>
                    <strong>Bebas Akses:</strong> Quiz dapat dikerjakan kapan saja tanpa harus menyelesaikan latihan terlebih dahulu
                  </div>
                </li>
                <li>
                  <span className="instruction-icon">⚡</span>
                  <div>
                    <strong>Auto Submit:</strong> Jika waktu habis, jawaban otomatis dianggap salah
                  </div>
                </li>
                <li>
                  <span className="instruction-icon">💡</span>
                  <div>
                    <strong>Penjelasan:</strong> Setiap jawaban akan menampilkan penjelasan yang detail
                  </div>
                </li>
              </ul>
            </div>

            <div className="quiz-summary-card">
              <div className="summary-item">
                <div className="summary-icon">📊</div>
                <div className="summary-info">
                  <div className="summary-title">Total Pertanyaan</div>
                  <div className="summary-value">{questions.length} Soal</div>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-icon">⏰</div>
                <div className="summary-info">
                  <div className="summary-title">Waktu per Soal</div>
                  <div className="summary-value">10 Detik</div>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-icon">🎯</div>
                <div className="summary-info">
                  <div className="summary-title">Target Lulus</div>
                  <div className="summary-value">{passingScore} dari {questions.length}</div>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-icon">⌛</div>
                <div className="summary-info">
                  <div className="summary-title">Estimasi Total</div>
                  <div className="summary-value">~{questions.length * 15} Detik</div>
                </div>
              </div>
            </div>
          </div>

          <div className="instructions-footer">
            <div className="ready-message">
              <span className="ready-icon">🚀</span>
              <span>Siap untuk menguji pemahaman Anda?</span>
            </div>
            <button 
              onClick={handleStartQuiz} 
              className="start-quiz-button touch-friendly"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="button-loading">
                  <div className="mini-spinner"></div>
                  Menyiapkan Quiz...
                </span>
              ) : (
                <>
                  <span className="start-icon">▶️</span>
                  Mulai Quiz
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isQuizComplete) {
    // Calculate final score based on all user answers
    const finalScore = userAnswers.reduce((total: number, answer, index) => {
      if (answer !== null && answer !== undefined && questions[index]) {
        return total + (answer === questions[index].correctAnswer ? 1 : 0);
      }
      return total;
    }, 0);
    
    const passed = finalScore >= passingScore;
    
    // Debug: Log final state
    console.log('Quiz Complete - Final State:', {
      score,
      passingScore,
      passed,
      userAnswers,
      userAnswersLength: userAnswers.length,
      questionsLength: questions.length,
      allAnswers: userAnswers.map((ans, idx) => ({
        index: idx,
        userAnswer: ans,
        correctAnswer: questions[idx]?.correctAnswer,
        isCorrect: ans === questions[idx]?.correctAnswer
      }))
    });
    
    return (
      <div className="quiz-container">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Memuat hasil quiz...</p>
          </div>
        )}
        <div className="quiz-complete">
          <h2>{passed ? '🎉 Quiz Berhasil!' : '😔 Belum Berhasil'}</h2>
          <div className="final-score">
            <span className="score-text">Skor Anda:</span>
            <span className={`score-value ${passed ? 'passed' : 'failed'}`}>
              {finalScore} / {questions.length}
            </span>
          </div>
          
          <div className="score-message">
            {passed 
              ? `Selamat! Anda mendapat ${finalScore} jawaban benar. Anda dapat melanjutkan ke Study Case.`
              : `Anda perlu minimal ${passingScore} jawaban benar untuk lulus. Anda mendapat ${finalScore} jawaban benar.`
            }
          </div>

          <div className="quiz-summary">
            <h3>Ringkasan Jawaban:</h3>
            {questions.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer !== null && userAnswer !== undefined && userAnswer === q.correctAnswer;
              
              // Debug logging
              console.log(`Summary - Question ${index + 1}:`, {
                question: q.question.substring(0, 50),
                userAnswer,
                correctAnswer: q.correctAnswer,
                isCorrect,
                userAnswersLength: userAnswers.length,
                totalQuestions: questions.length
              });
              
              return (
                <div key={q.id} className="summary-item">
                  <span className="question-num">Soal {index + 1}:</span>
                  <span className={isCorrect ? 'correct' : 'incorrect'}>
                    {isCorrect ? '✅' : '❌'}
                  </span>
                  <span className="answer-detail">
                    {userAnswer !== null && userAnswer !== undefined 
                      ? `Jawab: ${String.fromCharCode(65 + userAnswer)}` 
                      : 'Tidak dijawab'}
                    {' → Benar: ' + String.fromCharCode(65 + q.correctAnswer)}
                  </span>
                </div>
              );
            })}
          </div>

          {!passed && (
            <button 
              onClick={handleRetryQuiz} 
              className="retry-button touch-friendly"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="button-loading">
                  <div className="mini-spinner"></div>
                  Loading...
                </span>
              ) : (
                '🔄 Coba Lagi'
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="quiz-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Memuat soal...</p>
        </div>
      )}
      
      <div className="quiz-header">
        <div className="quiz-progress-section">
          <div className="quiz-info">
            <span>Soal {currentQuestionIndex + 1} dari {questions.length}</span>
            <div className="score-display">Skor: {score}/{questions.length}</div>
          </div>
          
          {/* Visual Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="progress-text">{Math.round(progressPercentage)}%</span>
          </div>
        </div>
        
        <div className="timer-controls">
          <div className={getTimerClass}>
            <span className="timer-icon">⏱️</span>
            <span className="timer-text">{isPaused ? '⏸️' : timeLeft + 's'}</span>
          </div>
          
          {/* Control buttons */}
          <div className="control-buttons">
            <button 
              className={`control-btn ${isPaused ? 'resume' : 'pause'}`}
              onClick={togglePause}
              disabled={showResult}
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? '▶️' : '⏸️'}
            </button>
            
            <button 
              className={`control-btn sound-btn ${soundEnabled ? 'sound-on' : 'sound-off'}`}
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>

            {isOffline && (
              <div className="offline-indicator" title="Mode Offline - Quiz tersimpan lokal">
                📱
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`question-section ${isTransitioning ? 'transitioning' : ''}`} ref={questionRef}>
        <h3 className="question">{currentQuestion.question}</h3>
        
        <div className="options">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswer;
            const isSelected = index === selectedAnswer;
            const showCorrectAnswer = showResult && isCorrect;
            const showWrongAnswer = showResult && isSelected && !isCorrect;
            
            return (
              <button
                key={index}
                className={`option-button touch-friendly
                  ${showCorrectAnswer ? 'correct' : ''} 
                  ${showWrongAnswer ? 'incorrect' : ''}
                  ${isSelected && !showResult ? 'selected' : ''}
                  ${showResult ? 'disabled' : ''}
                  ${isPaused ? 'paused' : ''}
                `}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult || isPaused}
              >
                <span className="option-label">{String.fromCharCode(65 + index)}.</span>
                <span className="option-text">{option}</span>
                {showCorrectAnswer && <span className="icon">✅</span>}
                {showWrongAnswer && <span className="icon">❌</span>}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="explanation-box">
            <div className="result-message">
              {selectedAnswer === currentQuestion.correctAnswer 
                ? '✅ Benar!' 
                : selectedAnswer === null 
                  ? '⏰ Waktu Habis!' 
                  : '❌ Salah!'}
            </div>
            <p className="explanation">
              <strong>Penjelasan:</strong> {currentQuestion.explanation}
            </p>
            <button 
              onClick={handleNextQuestion} 
              className="next-button touch-friendly"
              disabled={isTransitioning || isLoading}
            >
              {isLoading ? (
                <span className="button-loading">
                  <div className="mini-spinner"></div>
                  Loading...
                </span>
              ) : (
                currentQuestionIndex < questions.length - 1 ? 'Soal Berikutnya →' : 'Selesai'
              )}
            </button>
          </div>
        )}
      </div>

      <div className="quiz-navigation">
        <div className="quiz-dots">
          {questions.map((_, index) => {
            const isAnswered = userAnswers[index] !== undefined;
            const isCorrect = isAnswered && userAnswers[index] === questions[index]?.correctAnswer;
            
            return (
              <span 
                key={index} 
                className={`dot 
                  ${index === currentQuestionIndex ? 'active' : ''} 
                  ${index < currentQuestionIndex ? 'completed' : ''}
                  ${isAnswered && index < currentQuestionIndex ? (isCorrect ? 'correct' : 'incorrect') : ''}
                `}
                title={`Soal ${index + 1}${isAnswered && index < currentQuestionIndex ? (isCorrect ? ' - Benar' : ' - Salah') : ''}`}
              />
            );
          })}
        </div>
        
        {/* Mobile swipe hint */}
        <div className="swipe-hint">
          <span>💡 Tip: Swipe untuk navigasi cepat</span>
        </div>
      </div>
    </div>
  );
};

export default Quiz;