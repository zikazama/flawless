import React from 'react';
import { Badge } from '../types/badges';
import './BadgeNotification.css';

interface BadgeNotificationProps {
  badges: Badge[];
  onClose: () => void;
}

const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badges, onClose }) => {
  if (badges.length === 0) return null;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#4caf50';
      case 'rare': return '#2196f3';
      case 'epic': return '#9c27b0';
      case 'legendary': return '#ff9800';
      default: return '#4caf50';
    }
  };

  return (
    <div className="badge-notification-overlay">
      <div className="badge-notification">
        <div className="notification-header">
          <h3>🎉 Badge Baru Diraih!</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="badges-container">
          {badges.map(badge => (
            <div key={badge.id} className="badge-item">
              <div 
                className="badge-icon"
                style={{ borderColor: getRarityColor(badge.rarity) }}
              >
                <span className="badge-emoji">{badge.icon}</span>
              </div>
              <div className="badge-info">
                <h4 className="badge-name">{badge.name}</h4>
                <p className="badge-description">{badge.description}</p>
                <div className="badge-details">
                  <span 
                    className={`badge-rarity ${badge.rarity}`}
                    style={{ color: getRarityColor(badge.rarity) }}
                  >
                    {badge.rarity.toUpperCase()}
                  </span>
                  <span className="badge-points">+{badge.points} poin</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="notification-footer">
          <button className="continue-btn" onClick={onClose}>
            Lanjutkan Belajar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeNotification;