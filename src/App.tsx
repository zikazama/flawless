import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import ModuleList from './components/ModuleList';
import TopicView from './components/TopicView';
import AboutAuthor from './components/AboutAuthor';
import Interview from './components/Interview';
import BadgesView from './components/BadgesView';
import BadgeNotification from './components/BadgeNotification';
import { useBadges } from './hooks/useBadges';
import { courses } from './data/modules';
import { SoundManager } from './utils/sounds';
import './App.css';

export interface UserProgress {
  completedTopics: string[];
  currentTopic?: string;
  score: number;
  currentStreak: number;
  perfectRuns: number;
  fastCompletions: number;
  nightCompletions: number;
  earlyCompletions: number;
  lastCompletionDate?: string;
}

function App() {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : {
      completedTopics: [],
      score: 0,
      currentStreak: 0,
      perfectRuns: 0,
      fastCompletions: 0,
      nightCompletions: 0,
      earlyCompletions: 0
    };
  });

  const [soundsEnabled, setSoundsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('soundsEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('soundsEnabled', JSON.stringify(soundsEnabled));
    if (soundsEnabled) {
      SoundManager.enableSounds();
    } else {
      SoundManager.disableSounds();
    }
  }, [soundsEnabled]);

  const toggleSounds = () => {
    setSoundsEnabled(!soundsEnabled);
  };

  const markTopicComplete = (topicId: string) => {
    const now = new Date();
    const currentHour = now.getHours();
    const today = now.toDateString();
    
    setUserProgress(prev => {
      // Calculate streak
      let newStreak = prev.currentStreak;
      if (prev.lastCompletionDate) {
        const lastDate = new Date(prev.lastCompletionDate);
        const daysDiff = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) {
          newStreak = prev.currentStreak + 1;
        } else if (daysDiff > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }
      
      return {
        ...prev,
        completedTopics: Array.from(new Set([...prev.completedTopics, topicId])),
        score: prev.score + 100,
        currentStreak: newStreak,
        nightCompletions: prev.nightCompletions + (currentHour >= 22 || currentHour <= 6 ? 1 : 0),
        earlyCompletions: prev.earlyCompletions + (currentHour >= 5 && currentHour <= 8 ? 1 : 0),
        lastCompletionDate: today
      };
    });
  };

  const { newlyEarned } = useBadges(userProgress);

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>🎮 Fawless</h1>
          <nav className="header-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/badges" className="nav-link">Badges</Link>
            <Link to="/interview" className="nav-link">Interview</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
          <div className="header-controls">
            <button 
              onClick={toggleSounds}
              className={`sound-toggle ${soundsEnabled ? 'enabled' : 'disabled'}`}
              title={soundsEnabled ? 'Disable Sound Effects' : 'Enable Sound Effects'}
            >
              {soundsEnabled ? '🔊' : '🔇'}
            </button>
            <div className="score">
              <span>⭐ Score: {userProgress.score}</span>
              <span>📚 Completed: {userProgress.completedTopics.length}</span>
            </div>
          </div>
        </header>
        
        <Routes>
          <Route path="/" element={<HomePage courses={courses} userProgress={userProgress} />} />
          <Route path="/badges" element={<BadgesView userProgress={userProgress} />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/about" element={<AboutAuthor />} />
          <Route path="/course/:courseId" element={<ModuleList courses={courses} userProgress={userProgress} />} />
          <Route path="/course/:courseId/module/:moduleId/topic/:topicId" element={
            <TopicView 
              courses={courses} 
              userProgress={userProgress}
              onComplete={markTopicComplete}
            />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Badge Notifications */}
        {newlyEarned.length > 0 && (
          <BadgeNotification 
            badges={newlyEarned} 
            onClose={() => {}} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;
