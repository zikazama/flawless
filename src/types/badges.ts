export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'achievement' | 'milestone' | 'streak' | 'special';
  condition: (progress: any) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

export interface UserBadges {
  earned: string[];
  earnedAt: {[badgeId: string]: Date};
}

export const badges: Badge[] = [
  // Milestone Badges
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Selesaikan topik pertama Anda',
    icon: '👣',
    category: 'milestone',
    condition: (progress) => progress.completedTopics.length >= 1,
    rarity: 'common',
    points: 50
  },
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Selesaikan 5 topik',
    icon: '🚀',
    category: 'milestone',
    condition: (progress) => progress.completedTopics.length >= 5,
    rarity: 'common',
    points: 100
  },
  {
    id: 'dedicated-learner',
    name: 'Dedicated Learner',
    description: 'Selesaikan 10 topik',
    icon: '📚',
    category: 'milestone',
    condition: (progress) => progress.completedTopics.length >= 10,
    rarity: 'rare',
    points: 200
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Selesaikan 20 topik',
    icon: '🔍',
    category: 'milestone',
    condition: (progress) => progress.completedTopics.length >= 20,
    rarity: 'epic',
    points: 500
  },
  {
    id: 'master-student',
    name: 'Master Student',
    description: 'Selesaikan semua topik',
    icon: '🎓',
    category: 'milestone',
    condition: (progress) => progress.completedTopics.length >= 50, // Total topics
    rarity: 'legendary',
    points: 1000
  },

  // Achievement Badges
  {
    id: 'js-fundamentals',
    name: 'JavaScript Fundamentals',
    description: 'Selesaikan semua modul JavaScript Dasar',
    icon: '🟨',
    category: 'achievement',
    condition: (progress) => {
      const jsTopics = [
        'strict-mode', 'variables', 'data-types', 'type-conversions', 
        'basic-math-operators', 'comparisons', 'ifelse',
        'logical-operators', 'nullish-coalescing', 'while-and-for', 
        'switch', 'basic-function', 'function-expression', 'basic-arrow-function'
      ];
      return jsTopics.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'rare',
    points: 300
  },
  {
    id: 'ts-explorer',
    name: 'TypeScript Explorer',
    description: 'Selesaikan modul TypeScript pertama',
    icon: '🔷',
    category: 'achievement',
    condition: (progress) => {
      const tsTopics = ['ts-init', 'ts-config'];
      return tsTopics.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'rare',
    points: 250
  },

  // Streak Badges
  {
    id: 'consistent-learner',
    name: 'Consistent Learner',
    description: 'Selesaikan topik 3 hari berturut-turut',
    icon: '🔥',
    category: 'streak',
    condition: (progress) => progress.currentStreak >= 3,
    rarity: 'rare',
    points: 150
  },
  {
    id: 'study-streak',
    name: 'Study Streak',
    description: 'Selesaikan topik 7 hari berturut-turut',
    icon: '⚡',
    category: 'streak',
    condition: (progress) => progress.currentStreak >= 7,
    rarity: 'epic',
    points: 400
  },

  // Score Badges
  {
    id: 'point-collector',
    name: 'Point Collector',
    description: 'Raih 1000 poin',
    icon: '💰',
    category: 'achievement',
    condition: (progress) => progress.score >= 1000,
    rarity: 'rare',
    points: 100
  },
  {
    id: 'high-achiever',
    name: 'High Achiever',
    description: 'Raih 5000 poin',
    icon: '💎',
    category: 'achievement',
    condition: (progress) => progress.score >= 5000,
    rarity: 'epic',
    points: 500
  },

  // Special Badges
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Selesaikan 5 topik tanpa kesalahan',
    icon: '🏆',
    category: 'special',
    condition: (progress) => progress.perfectRuns >= 5,
    rarity: 'epic',
    points: 600
  },
  {
    id: 'speed-learner',
    name: 'Speed Learner',
    description: 'Selesaikan topik dalam waktu kurang dari 5 menit',
    icon: '⚡',
    category: 'special',
    condition: (progress) => progress.fastCompletions >= 1,
    rarity: 'rare',
    points: 200
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Selesaikan topik antara jam 10 PM - 6 AM',
    icon: '🦉',
    category: 'special',
    condition: (progress) => progress.nightCompletions >= 3,
    rarity: 'rare',
    points: 150
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Selesaikan topik antara jam 5 AM - 8 AM',
    icon: '🐦',
    category: 'special',
    condition: (progress) => progress.earlyCompletions >= 3,
    rarity: 'rare',
    points: 150
  },

  // Advanced TypeScript Badges
  {
    id: 'type-warrior',
    name: 'Type Warrior',
    description: 'Selesaikan semua TypeScript Advanced Types',
    icon: '⚔️',
    category: 'achievement',
    condition: (progress) => {
      const advancedTypes = ['ts-unions', 'ts-intersections', 'ts-literal-types'];
      return advancedTypes.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'epic',
    points: 400
  },
  {
    id: 'generic-master',
    name: 'Generic Master',
    description: 'Kuasai TypeScript Generics dan Conditionals',
    icon: '🎯',
    category: 'achievement', 
    condition: (progress) => {
      const genericsTopics = ['ts-generics', 'ts-generic-constraints', 'ts-conditional-types'];
      return genericsTopics.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'epic',
    points: 450
  },
  {
    id: 'utility-expert',
    name: 'Utility Expert',
    description: 'Menguasai semua TypeScript Utility Types',
    icon: '🛠️',
    category: 'achievement',
    condition: (progress) => {
      const utilityTopics = ['ts-pick-omit', 'ts-record-partial', 'ts-awaited'];
      return utilityTopics.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'epic',
    points: 400
  },
  {
    id: 'guard-defender',
    name: 'Type Guard Defender',
    description: 'Selesaikan semua materi Type Guards',
    icon: '🛡️',
    category: 'achievement',
    condition: (progress) => {
      const guardTopics = ['ts-builtin-guards', 'ts-custom-guards', 'ts-discriminated-unions'];
      return guardTopics.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'epic',
    points: 420
  },

  // Advanced JavaScript Badges  
  {
    id: 'object-ninja',
    name: 'Object Ninja',
    description: 'Kuasai semua konsep JavaScript Objects & Arrays',
    icon: '🥷',
    category: 'achievement',
    condition: (progress) => {
      const objectTopics = ['objects', 'object-methods', 'this-keyword', 'arrays', 'array-methods'];
      return objectTopics.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'epic',
    points: 350
  },
  {
    id: 'async-wizard',
    name: 'Async Wizard',
    description: 'Menguasai JavaScript Promises dan Async/Await',
    icon: '🧙‍♂️',
    category: 'achievement',
    condition: (progress) => {
      const asyncTopics = ['promise', 'async-await', 'callbacks'];
      return asyncTopics.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'legendary',
    points: 600
  },
  {
    id: 'prototype-explorer',
    name: 'Prototype Explorer',
    description: 'Jelajahi JavaScript Prototypes dan Inheritance',
    icon: '🔬',
    category: 'achievement',
    condition: (progress) => {
      const prototypeTopics = ['prototype', 'classes', 'inheritance'];
      return prototypeTopics.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'epic',
    points: 380
  },

  // New Milestone Badges
  {
    id: 'typescript-champion',
    name: 'TypeScript Champion',
    description: 'Selesaikan semua modul TypeScript',
    icon: '👑',
    category: 'milestone',
    condition: (progress) => {
      const allTsTopics = [
        'ts-init', 'ts-config', 'interfaces', 'type-aliases', 'ts-unions', 'ts-intersections', 
        'ts-literal-types', 'ts-generics', 'ts-generic-constraints', 'ts-conditional-types',
        'ts-pick-omit', 'ts-record-partial', 'ts-awaited', 'ts-builtin-guards', 'ts-custom-guards', 'ts-discriminated-unions'
      ];
      return allTsTopics.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'legendary',
    points: 1200
  },
  {
    id: 'javascript-grandmaster',
    name: 'JavaScript Grandmaster', 
    description: 'Selesaikan semua modul JavaScript Advanced',
    icon: '🏆',
    category: 'milestone',
    condition: (progress) => {
      const allJsAdvanced = [
        'objects', 'object-methods', 'this-keyword', 'arrays', 'array-methods',
        'date', 'promise', 'async-await', 'callbacks', 'prototype', 'classes', 'inheritance'
      ];
      return allJsAdvanced.every(topic => progress.completedTopics.includes(topic));
    },
    rarity: 'legendary',
    points: 1000
  },

  // Creative Special Badges
  {
    id: 'code-artist',
    name: 'Code Artist',
    description: 'Selesaikan 10 case study dengan perfect score',
    icon: '🎨',
    category: 'special',
    condition: (progress) => progress.perfectCaseStudies >= 10,
    rarity: 'epic',
    points: 500
  },
  {
    id: 'debugging-detective',
    name: 'Debugging Detective',
    description: 'Perbaiki 20 error dalam exercises',
    icon: '🔍',
    category: 'special',
    condition: (progress) => progress.errorsFixed >= 20,
    rarity: 'rare',
    points: 300
  },
  {
    id: 'syntax-samurai',
    name: 'Syntax Samurai',
    description: 'Tidak membuat syntax error dalam 15 exercises berturut-turut',
    icon: '🗾',
    category: 'special',
    condition: (progress) => progress.syntaxErrorFree >= 15,
    rarity: 'epic',
    points: 550
  },
  {
    id: 'weekend-warrior',
    name: 'Weekend Warrior',
    description: 'Selesaikan 10 topik di weekend',
    icon: '🗓️',
    category: 'special',
    condition: (progress) => progress.weekendCompletions >= 10,
    rarity: 'rare',
    points: 250
  },
  {
    id: 'marathon-learner',
    name: 'Marathon Learner',
    description: 'Belajar selama 3 jam dalam satu sesi',
    icon: '🏃‍♂️',
    category: 'special',
    condition: (progress) => progress.longSessions >= 1,
    rarity: 'epic',
    points: 400
  },
  {
    id: 'comeback-kid',
    name: 'Comeback Kid',
    description: 'Kembali belajar setelah jeda 7 hari atau lebih',
    icon: '🎭',
    category: 'special',
    condition: (progress) => progress.comebacks >= 1,
    rarity: 'rare',
    points: 200
  },
  {
    id: 'knowledge-sharer',
    name: 'Knowledge Sharer',
    description: 'Share 5 badge pencapaian',
    icon: '📢',
    category: 'special',
    condition: (progress) => progress.badgeShares >= 5,
    rarity: 'rare',
    points: 180
  },
  {
    id: 'milestone-crusher',
    name: 'Milestone Crusher',
    description: 'Raih semua milestone badges',
    icon: '💥',
    category: 'special',
    condition: (progress) => {
      const milestoneIds = ['first-steps', 'getting-started', 'dedicated-learner', 'knowledge-seeker', 'master-student', 'typescript-champion', 'javascript-grandmaster'];
      return milestoneIds.every(id => progress.earnedBadges?.includes(id));
    },
    rarity: 'legendary',
    points: 1500
  },
  {
    id: 'legend-status',
    name: 'Legend Status',
    description: 'Raih semua badge yang tersedia',
    icon: '🌟',
    category: 'special',
    condition: (progress) => {
      // This will be the final badge - checks if all other badges are earned
      const allOtherBadgeIds = badges.filter(b => b.id !== 'legend-status').map(b => b.id);
      return allOtherBadgeIds.every(id => progress.earnedBadges?.includes(id));
    },
    rarity: 'legendary',
    points: 2000
  }
];