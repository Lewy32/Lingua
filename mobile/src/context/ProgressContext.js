import React, { createContext, useState, useContext, useEffect } from 'react';
import { progressAPI } from '../services/api';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProgress();
    }
  }, [isAuthenticated]);

  const fetchProgress = async () => {
    try {
      setIsLoading(true);
      const response = await progressAPI.getAll();
      if (response.data.success) {
        setProgress(response.data.progress);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLessonProgress = async (lessonId, updates) => {
    try {
      const response = await progressAPI.update({
        lessonId,
        ...updates,
      });

      if (response.data.success) {
        // Update local progress
        setProgress(prev => {
          const existing = prev.find(p => p.lessonId === lessonId);
          if (existing) {
            return prev.map(p =>
              p.lessonId === lessonId ? response.data.progress : p
            );
          }
          return [...prev, response.data.progress];
        });

        // Refresh user data if XP/level changed
        if (updates.status === 'completed') {
          // User stats are updated on backend, refetch
          await fetchProgress();
        }

        return { success: true };
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      return { success: false, message: error.message };
    }
  };

  const getLessonProgress = (lessonId) => {
    return progress.find(p => p.lessonId === lessonId) || null;
  };

  const getCompletedLessonsCount = () => {
    return progress.filter(p => p.status === 'completed').length;
  };

  const getTotalAccuracy = () => {
    if (progress.length === 0) return 0;
    const completed = progress.filter(p => p.status === 'completed');
    if (completed.length === 0) return 0;
    const totalScore = completed.reduce((sum, p) => sum + p.score, 0);
    return Math.round(totalScore / completed.length);
  };

  const loseHeart = async () => {
    try {
      const response = await progressAPI.loseHeart();
      if (response.data.success) {
        updateUser({ hearts: response.data.hearts });
        return { success: true, hearts: response.data.hearts };
      }
    } catch (error) {
      console.error('Error losing heart:', error);
      return { success: false };
    }
  };

  const value = {
    progress,
    isLoading,
    fetchProgress,
    updateLessonProgress,
    getLessonProgress,
    getCompletedLessonsCount,
    getTotalAccuracy,
    loseHeart,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export default ProgressContext;
