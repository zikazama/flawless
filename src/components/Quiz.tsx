import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion } from '../data/modules';
import { playCorrectSound, playIncorrectSound, playTimerTick, playTimerWarning } from '../utils/sounds';
import './Quiz.css';

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

  const currentQuestion = questions[currentQuestionIndex];
  const passingScore = 4; // Need 4 out of 5 correct

  // Define handleTimeUp before using it in effects
  const handleTimeUp = useCallback(() => {
    setIsTimerActive(false);
    setShowResult(true);
    const newUserAnswers = [...userAnswers, null];
    setUserAnswers(newUserAnswers);
    playIncorrectSound();
  }, [userAnswers]);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || !isTimerActive || showResult || isQuizComplete) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        const newTime = timeLeft - 1;
        setTimeLeft(newTime);
        
        // Play sound effects based on time remaining
        if (newTime <= 3 && newTime > 0) {
          // Warning sound for last 3 seconds
          playTimerWarning();
        } else if (newTime > 3) {
          // Normal tick sound
          playTimerTick();
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Time's up - auto submit with no answer
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive, showResult, isQuizComplete, quizStarted, handleTimeUp]);

  // Reset timer when question changes
  useEffect(() => {
    if (quizStarted && !showResult && !isQuizComplete) {
      setTimeLeft(10);
      setIsTimerActive(true);
    }
  }, [currentQuestionIndex, quizStarted]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult || !isTimerActive) return;
    
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
      playCorrectSound();
    } else {
      console.log(`Incorrect answer. Score remains: ${score}`);
      playIncorrectSound();
    }
  };

  const handleNextQuestion = () => {
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
      // Quiz complete
      setIsQuizComplete(true);
      const passed = score >= passingScore;
      
      // Debug: Log final results
      console.log('Quiz Complete!', {
        score,
        passingScore,
        passed,
        userAnswers,
        totalQuestions: questions.length
      });
      
      // Save only the final quiz result (not progress)
      localStorage.setItem(`quiz_${topicId}_score`, score.toString());
      localStorage.setItem(`quiz_${topicId}_passed`, passed.toString());
      
      onComplete(passed);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(10);
    setIsTimerActive(true);
    // No need to save to localStorage - quiz should restart on refresh
  };

  const handleRetryQuiz = () => {
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
    // No need to clear localStorage since we're not saving progress
  };

  const getTimerColor = () => {
    if (timeLeft > 7) return 'timer-green';
    if (timeLeft > 3) return 'timer-yellow';
    return 'timer-red';
  };

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
            <button onClick={handleStartQuiz} className="start-quiz-button">
              <span className="start-icon">▶️</span>
              Mulai Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isQuizComplete) {
    const passed = score >= passingScore;
    
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
        <div className="quiz-complete">
          <h2>{passed ? '🎉 Quiz Berhasil!' : '😔 Belum Berhasil'}</h2>
          <div className="final-score">
            <span className="score-text">Skor Anda:</span>
            <span className={`score-value ${passed ? 'passed' : 'failed'}`}>
              {score} / {questions.length}
            </span>
          </div>
          
          <div className="score-message">
            {passed 
              ? `Selamat! Anda mendapat ${score} jawaban benar. Anda dapat melanjutkan ke Study Case.`
              : `Anda perlu minimal ${passingScore} jawaban benar untuk lulus. Anda mendapat ${score} jawaban benar.`
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
            <button onClick={handleRetryQuiz} className="retry-button">
              🔄 Coba Lagi
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          <span>Soal {currentQuestionIndex + 1} dari {questions.length}</span>
          <div className="score-display">Skor: {score}/{questions.length}</div>
        </div>
        
        <div className={`timer ${getTimerColor()}`}>
          <span className="timer-icon">⏱️</span>
          <span className="timer-text">{timeLeft}s</span>
        </div>
      </div>

      <div className="question-section">
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
                className={`option-button 
                  ${showCorrectAnswer ? 'correct' : ''} 
                  ${showWrongAnswer ? 'incorrect' : ''}
                  ${isSelected && !showResult ? 'selected' : ''}
                  ${showResult ? 'disabled' : ''}
                `}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
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
            <button onClick={handleNextQuestion} className="next-button">
              {currentQuestionIndex < questions.length - 1 ? 'Soal Berikutnya →' : 'Selesai'}
            </button>
          </div>
        )}
      </div>

      <div className="quiz-dots">
        {questions.map((_, index) => (
          <span 
            key={index} 
            className={`dot 
              ${index === currentQuestionIndex ? 'active' : ''} 
              ${index < currentQuestionIndex ? 'completed' : ''}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;