import React, { useState } from 'react';
import { Badge } from '../types/badges';
import { useBadges } from '../hooks/useBadges';
import { UserProgress } from '../App';
import './BadgesView.css';

interface BadgesViewProps {
  userProgress: UserProgress;
}

const BadgesView: React.FC<BadgesViewProps> = ({ userProgress }) => {
  const { getEarnedBadges, getAvailableBadges, getBadgeProgress, getTotalBadgePoints } = useBadges(userProgress);
  const [activeTab, setActiveTab] = useState<'earned' | 'available'>('earned');

  const earnedBadges = getEarnedBadges();
  const availableBadges = getAvailableBadges();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#ffffff';
      case 'rare': return '#ffffff';
      case 'epic': return '#ffffff';
      case 'legendary': return '#1a1a1a';
      default: return '#4caf50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'milestone': return '🎯';
      case 'achievement': return '🏆';
      case 'streak': return '🔥';
      case 'special': return '⭐';
      default: return '🏅';
    }
  };

  const renderBadge = (badge: Badge, earned: boolean = false) => {
    const progress = getBadgeProgress(badge);
    
    return (
      <div key={badge.id} className={`badge-card ${earned ? 'earned' : 'available'}`}>
        <div className="badge-header">
          <div 
            className="badge-icon-large"
            style={{ borderColor: earned ? getRarityColor(badge.rarity) : '#555' }}
          >
            <span className={`badge-emoji-large ${earned ? '' : 'grayscale'}`}>
              {badge.icon}
            </span>
          </div>
          <div className="badge-category">
            {getCategoryIcon(badge.category)}
          </div>
        </div>
        
        <div className="badge-content">
          <h4 className="badge-title">{badge.name}</h4>
          <p className="badge-desc">{badge.description}</p>
          
          <div className="badge-meta">
            <span 
              className={`rarity-tag ${badge.rarity}`}
              style={{ color: getRarityColor(badge.rarity) }}
            >
              {badge.rarity.toUpperCase()}
            </span>
            <span className="points-tag">+{badge.points} pts</span>
          </div>

          {!earned && progress > 0 && (
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{Math.round(progress)}%</span>
            </div>
          )}

          {earned && (
            <div className="earned-indicator">
              <span className="earned-text">✅ Diraih</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="badges-view">
      <div className="badges-header">
        <h2>🏆 Badge Collection</h2>
        <div className="badges-stats">
          <div className="stat-item">
            <span className="stat-number">{earnedBadges.length}</span>
            <span className="stat-label">Badge Diraih</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getTotalBadgePoints()}</span>
            <span className="stat-label">Badge Points</span>
          </div>
        </div>
      </div>

      <div className="badges-tabs">
        <button 
          className={`tab-button ${activeTab === 'earned' ? 'active' : ''}`}
          onClick={() => setActiveTab('earned')}
        >
          Diraih ({earnedBadges.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Tersedia ({availableBadges.length})
        </button>
      </div>

      <div className="badges-content">
        {activeTab === 'earned' && (
          <div className="badges-grid">
            {earnedBadges.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🎯</span>
                <h3>Belum Ada Badge</h3>
                <p>Selesaikan topik untuk mendapatkan badge pertama Anda!</p>
              </div>
            ) : (
              earnedBadges.map(badge => renderBadge(badge, true))
            )}
          </div>
        )}

        {activeTab === 'available' && (
          <div className="badges-grid">
            {availableBadges.map(badge => renderBadge(badge, false))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgesView;