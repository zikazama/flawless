import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutAuthor.css';

const AboutAuthor: React.FC = () => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetProgress = () => {
    // Clear all localStorage data
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('fillInAnswers_') || 
                  key.startsWith('fillInResults_') || 
                  key.startsWith('caseStudyCode_') || 
                  key.startsWith('caseStudyResult_') || 
                  key === 'userProgress' ||
                  key === 'earnedBadges')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    setShowResetConfirm(false);
    
    // Reload page to reset state
    window.location.reload();
  };

  return (
    <div className="about-author">
      <div className="about-header">
        <Link to="/" className="back-button">← Kembali ke Beranda</Link>
        <h2>About Author</h2>
      </div>

      <div className="author-content">
        <div className="author-card">
          <div className="author-avatar">
            <div className="avatar-placeholder">
              <img 
                src="https://zikazama.github.io/images/profile.jpeg" 
                alt="Fauzi Fadhlurrohman" 
                className="avatar-image"
              />
            </div>
          </div>
          
          <div className="author-info">
            <h3>Fauzi Fadhlurrohman</h3>
            <p className="author-title">Software Developer & Tech Educator</p>
            
            <div className="author-description">
              <p>
                Passionate software developer with expertise in web development, 
                mobile applications, and modern JavaScript/TypeScript technologies. 
                I love creating educational content and interactive learning experiences 
                to help others master programming skills.
              </p>
              
              <p>
                This platform, <strong>Fawless</strong>, was created to make learning 
                JavaScript and TypeScript more engaging through gamified, interactive 
                lessons and hands-on practice.
              </p>
            </div>

            <div className="author-skills">
              <h4>Tech Stack & Skills:</h4>
              <div className="skills-grid">
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Web Development</span>
                <span className="skill-tag">Mobile Development</span>
                <span className="skill-tag">UI/UX Design</span>
                <span className="skill-tag">Educational Technology</span>
              </div>
            </div>

            <div className="social-links">
              <a 
                href="https://www.linkedin.com/in/fauzi-fadhlurrohman/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <span className="social-icon">💼</span>
                Connect on LinkedIn
              </a>
              
              <a 
                href="https://zikazama.github.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link portfolio"
              >
                <span className="social-icon">🌐</span>
                Visit Portfolio
              </a>
            </div>
          </div>
        </div>

        <div className="platform-info">
          <h4>About Fawless</h4>
          <div className="platform-stats">
            <div className="stat-item">
              <span className="stat-number">2</span>
              <span className="stat-label">Programming Languages</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Learning Modules</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Interactive Topics</span>
            </div>
          </div>
          
          <p className="platform-description">
            Fawless is designed with modern learning principles in mind - 
            combining theoretical knowledge with practical exercises, 
            gamification elements to maintain engagement, and immediate 
            feedback to accelerate the learning process.
          </p>
        </div>

        <div className="reset-section">
          <h4>🗂️ Data Management</h4>
          <p>Ingin memulai dari awal? Reset semua progress dan data Anda:</p>
          <button 
            onClick={() => setShowResetConfirm(true)}
            className="reset-button"
          >
            🔄 Reset Progress
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay">
          <div className="reset-modal">
            <h3>⚠️ Konfirmasi Reset</h3>
            <p>
              Anda yakin ingin menghapus <strong>semua progress</strong>? 
              Tindakan ini akan menghapus:
            </p>
            <ul>
              <li>✅ Semua jawaban latihan dan study case</li>
              <li>🏆 Semua badge yang telah diraih</li>
              <li>📊 Skor dan streak progress</li>
              <li>💾 Semua data yang tersimpan</li>
            </ul>
            <p className="warning-text">
              <strong>Data yang telah dihapus tidak dapat dikembalikan!</strong>
            </p>
            
            <div className="modal-actions">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="cancel-button"
              >
                ❌ Batal
              </button>
              <button 
                onClick={handleResetProgress}
                className="confirm-reset-button"
              >
                ✅ Ya, Reset Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutAuthor;