import { useState, useEffect } from 'react';
import { badges, Badge, UserBadges } from '../types/badges';

export const useBadges = (userProgress: any) => {
  const [userBadges, setUserBadges] = useState<UserBadges>(() => {
    const saved = localStorage.getItem('userBadges');
    return saved ? JSON.parse(saved) : { earned: [], earnedAt: {} };
  });

  const [newlyEarned, setNewlyEarned] = useState<Badge[]>([]);

  // Check for new badges whenever progress changes
  useEffect(() => {
    const checkBadges = () => {
      const newBadges: Badge[] = [];
      
      badges.forEach(badge => {
        // Skip if already earned
        if (userBadges.earned.includes(badge.id)) return;
        
        // Check if condition is met
        if (badge.condition(userProgress)) {
          newBadges.push(badge);
        }
      });

      if (newBadges.length > 0) {
        const updatedBadges = {
          earned: [...userBadges.earned, ...newBadges.map(b => b.id)],
          earnedAt: {
            ...userBadges.earnedAt,
            ...newBadges.reduce((acc, badge) => {
              acc[badge.id] = new Date();
              return acc;
            }, {} as {[key: string]: Date})
          }
        };

        setUserBadges(updatedBadges);
        localStorage.setItem('userBadges', JSON.stringify(updatedBadges));
        setNewlyEarned(newBadges);
        
        // Clear newly earned after showing notification
        setTimeout(() => setNewlyEarned([]), 5000);
      }
    };

    checkBadges();
  }, [userProgress, userBadges.earned]);

  const getBadgeById = (id: string): Badge | undefined => {
    return badges.find(badge => badge.id === id);
  };

  const getEarnedBadges = (): Badge[] => {
    return userBadges.earned
      .map(id => getBadgeById(id))
      .filter(badge => badge !== undefined) as Badge[];
  };

  const getAvailableBadges = (): Badge[] => {
    return badges.filter(badge => !userBadges.earned.includes(badge.id));
  };

  const getBadgeProgress = (badge: Badge): number => {
    // This is a simplified progress calculation
    // In a real app, you'd want more sophisticated progress tracking
    if (userBadges.earned.includes(badge.id)) return 100;
    
    // Example progress calculations for different badge types
    switch (badge.id) {
      case 'getting-started':
        return Math.min((userProgress.completedTopics.length / 5) * 100, 100);
      case 'dedicated-learner':
        return Math.min((userProgress.completedTopics.length / 10) * 100, 100);
      case 'knowledge-seeker':
        return Math.min((userProgress.completedTopics.length / 20) * 100, 100);
      case 'master-student':
        return Math.min((userProgress.completedTopics.length / 50) * 100, 100);
      case 'point-collector':
        return Math.min((userProgress.score / 1000) * 100, 100);
      case 'high-achiever':
        return Math.min((userProgress.score / 5000) * 100, 100);
      default:
        return 0;
    }
  };

  const getTotalBadgePoints = (): number => {
    return getEarnedBadges().reduce((total, badge) => total + badge.points, 0);
  };

  return {
    userBadges,
    newlyEarned,
    getBadgeById,
    getEarnedBadges,
    getAvailableBadges,
    getBadgeProgress,
    getTotalBadgePoints
  };
};