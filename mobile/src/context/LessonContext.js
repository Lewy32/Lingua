import React, { createContext, useState, useContext, useEffect } from 'react';
import { lessonAPI } from '../services/api';
import { cacheLessons, getCachedLessons } from '../services/storage';
import { useAuth } from './AuthContext';

const LessonContext = createContext();

export const useLesson = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLesson must be used within a LessonProvider');
  }
  return context;
};

export const LessonProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLessons();
    }
  }, [isAuthenticated]);

  const fetchLessons = async () => {
    try {
      setIsLoading(true);

      // Try to load cached lessons first
      const cached = await getCachedLessons();
      if (cached && cached.length > 0) {
        setLessons(cached);
      }

      // Fetch from API
      const response = await lessonAPI.getAll();
      if (response.data.success) {
        setLessons(response.data.lessons);
        await cacheLessons(response.data.lessons);
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
      // Use cached lessons if API fails
      const cached = await getCachedLessons();
      if (cached) {
        setLessons(cached);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getLessonById = async (id) => {
    try {
      // Check if we have it locally first
      const local = lessons.find(l => l._id === id);
      if (local) {
        setCurrentLesson(local);
        return local;
      }

      // Fetch from API
      const response = await lessonAPI.getById(id);
      if (response.data.success) {
        setCurrentLesson(response.data.lesson);
        return response.data.lesson;
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
      return null;
    }
  };

  const getLessonsByLevel = (level) => {
    return lessons.filter(l => l.level === level);
  };

  const getBeginnerLessons = () => getLessonsByLevel('beginner');
  const getIntermediateLessons = () => getLessonsByLevel('intermediate');
  const getAdvancedLessons = () => getLessonsByLevel('advanced');

  const value = {
    lessons,
    currentLesson,
    isLoading,
    fetchLessons,
    getLessonById,
    getLessonsByLevel,
    getBeginnerLessons,
    getIntermediateLessons,
    getAdvancedLessons,
    setCurrentLesson,
  };

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
};

export default LessonContext;
