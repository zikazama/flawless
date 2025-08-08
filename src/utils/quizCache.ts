import { QuizQuestion } from '../data/modules';

interface CachedQuizData {
  questions: QuizQuestion[];
  timestamp: number;
  topicId: string;
  version: string;
}

interface QuizProgress {
  topicId: string;
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  score: number;
  timestamp: number;
  isActive: boolean;
}

interface QuizResult {
  topicId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  timestamp: number;
  completionTime: number;
}

const CACHE_VERSION = '1.0.0';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 50; // Maximum number of cached topics

class QuizCacheManager {
  private static instance: QuizCacheManager;
  private readonly QUIZ_CACHE_KEY = 'quiz_cache';
  private readonly QUIZ_PROGRESS_KEY = 'quiz_progress';
  private readonly QUIZ_RESULTS_KEY = 'quiz_results';

  private constructor() {}

  static getInstance(): QuizCacheManager {
    if (!QuizCacheManager.instance) {
      QuizCacheManager.instance = new QuizCacheManager();
    }
    return QuizCacheManager.instance;
  }

  // Quiz Questions Caching
  cacheQuizQuestions(topicId: string, questions: QuizQuestion[]): void {
    try {
      const cache = this.getQuizCache();
      const cachedData: CachedQuizData = {
        questions,
        timestamp: Date.now(),
        topicId,
        version: CACHE_VERSION
      };

      cache[topicId] = cachedData;

      // Limit cache size
      const cacheKeys = Object.keys(cache);
      if (cacheKeys.length > MAX_CACHE_SIZE) {
        // Remove oldest entries
        const sortedKeys = cacheKeys.sort((a, b) => 
          cache[a].timestamp - cache[b].timestamp
        );
        const keysToRemove = sortedKeys.slice(0, cacheKeys.length - MAX_CACHE_SIZE);
        keysToRemove.forEach(key => delete cache[key]);
      }

      localStorage.setItem(this.QUIZ_CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.warn('Failed to cache quiz questions:', error);
    }
  }

  getCachedQuizQuestions(topicId: string): QuizQuestion[] | null {
    try {
      const cache = this.getQuizCache();
      const cachedData = cache[topicId];

      if (!cachedData || this.isCacheExpired(cachedData.timestamp)) {
        return null;
      }

      // Check version compatibility
      if (cachedData.version !== CACHE_VERSION) {
        delete cache[topicId];
        localStorage.setItem(this.QUIZ_CACHE_KEY, JSON.stringify(cache));
        return null;
      }

      return cachedData.questions;
    } catch (error) {
      console.warn('Failed to retrieve cached quiz questions:', error);
      return null;
    }
  }

  // Quiz Progress Management
  saveQuizProgress(progress: Omit<QuizProgress, 'timestamp'>): void {
    try {
      const progressData: QuizProgress = {
        ...progress,
        timestamp: Date.now()
      };

      localStorage.setItem(
        `${this.QUIZ_PROGRESS_KEY}_${progress.topicId}`, 
        JSON.stringify(progressData)
      );
    } catch (error) {
      console.warn('Failed to save quiz progress:', error);
    }
  }

  getQuizProgress(topicId: string): QuizProgress | null {
    try {
      const progressJson = localStorage.getItem(`${this.QUIZ_PROGRESS_KEY}_${topicId}`);
      if (!progressJson) return null;

      const progress: QuizProgress = JSON.parse(progressJson);

      // Check if progress is still valid (not older than 1 hour)
      if (Date.now() - progress.timestamp > 60 * 60 * 1000) {
        this.clearQuizProgress(topicId);
        return null;
      }

      return progress;
    } catch (error) {
      console.warn('Failed to retrieve quiz progress:', error);
      return null;
    }
  }

  clearQuizProgress(topicId: string): void {
    try {
      localStorage.removeItem(`${this.QUIZ_PROGRESS_KEY}_${topicId}`);
    } catch (error) {
      console.warn('Failed to clear quiz progress:', error);
    }
  }

  // Quiz Results Management
  saveQuizResult(result: Omit<QuizResult, 'timestamp'>): void {
    try {
      const resultData: QuizResult = {
        ...result,
        timestamp: Date.now()
      };

      const results = this.getQuizResults();
      const existingIndex = results.findIndex(r => r.topicId === result.topicId);

      if (existingIndex >= 0) {
        results[existingIndex] = resultData;
      } else {
        results.push(resultData);
      }

      // Keep only latest 100 results
      if (results.length > 100) {
        results.sort((a, b) => b.timestamp - a.timestamp);
        results.splice(100);
      }

      localStorage.setItem(this.QUIZ_RESULTS_KEY, JSON.stringify(results));
    } catch (error) {
      console.warn('Failed to save quiz result:', error);
    }
  }

  getQuizResult(topicId: string): QuizResult | null {
    try {
      const results = this.getQuizResults();
      return results.find(r => r.topicId === topicId) || null;
    } catch (error) {
      console.warn('Failed to retrieve quiz result:', error);
      return null;
    }
  }

  getQuizResults(): QuizResult[] {
    try {
      const resultsJson = localStorage.getItem(this.QUIZ_RESULTS_KEY);
      return resultsJson ? JSON.parse(resultsJson) : [];
    } catch (error) {
      console.warn('Failed to retrieve quiz results:', error);
      return [];
    }
  }

  // Analytics and Statistics
  getQuizStatistics(topicId?: string) {
    try {
      const results = this.getQuizResults();
      const filteredResults = topicId 
        ? results.filter(r => r.topicId === topicId)
        : results;

      if (filteredResults.length === 0) {
        return null;
      }

      const totalAttempts = filteredResults.length;
      const passedAttempts = filteredResults.filter(r => r.passed).length;
      const passRate = (passedAttempts / totalAttempts) * 100;
      const avgScore = filteredResults.reduce((sum, r) => sum + r.score, 0) / totalAttempts;
      const avgCompletionTime = filteredResults.reduce((sum, r) => sum + r.completionTime, 0) / totalAttempts;

      return {
        totalAttempts,
        passedAttempts,
        passRate: Math.round(passRate),
        avgScore: Math.round(avgScore * 10) / 10,
        avgCompletionTime: Math.round(avgCompletionTime),
        latestAttempt: filteredResults.sort((a, b) => b.timestamp - a.timestamp)[0]
      };
    } catch (error) {
      console.warn('Failed to calculate quiz statistics:', error);
      return null;
    }
  }

  // Cache Management
  clearCache(): void {
    try {
      localStorage.removeItem(this.QUIZ_CACHE_KEY);
      localStorage.removeItem(this.QUIZ_RESULTS_KEY);
      
      // Clear all progress data
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.QUIZ_PROGRESS_KEY)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  getCacheInfo() {
    try {
      const cache = this.getQuizCache();
      const results = this.getQuizResults();
      const cacheSize = JSON.stringify(cache).length;
      const resultsSize = JSON.stringify(results).length;

      return {
        cachedTopics: Object.keys(cache).length,
        totalResults: results.length,
        cacheSize: Math.round(cacheSize / 1024), // KB
        resultsSize: Math.round(resultsSize / 1024), // KB
        totalSize: Math.round((cacheSize + resultsSize) / 1024) // KB
      };
    } catch (error) {
      console.warn('Failed to get cache info:', error);
      return null;
    }
  }

  // Offline Support
  isOffline(): boolean {
    return !navigator.onLine;
  }

  getOfflineQuizTopics(): string[] {
    try {
      const cache = this.getQuizCache();
      return Object.keys(cache).filter(topicId => {
        const cachedData = cache[topicId];
        return !this.isCacheExpired(cachedData.timestamp);
      });
    } catch (error) {
      console.warn('Failed to get offline quiz topics:', error);
      return [];
    }
  }

  // Private helpers
  private getQuizCache(): Record<string, CachedQuizData> {
    try {
      const cacheJson = localStorage.getItem(this.QUIZ_CACHE_KEY);
      return cacheJson ? JSON.parse(cacheJson) : {};
    } catch (error) {
      console.warn('Failed to parse quiz cache:', error);
      return {};
    }
  }

  private isCacheExpired(timestamp: number): boolean {
    return Date.now() - timestamp > CACHE_EXPIRY;
  }
}

// Export singleton instance
export const quizCache = QuizCacheManager.getInstance();

// Export types
export type { QuizProgress, QuizResult, CachedQuizData };