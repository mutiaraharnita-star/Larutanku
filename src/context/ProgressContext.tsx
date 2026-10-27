import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LabObservationRecord, UserProgress } from '../types/chemistry';
import { LEARNING_MODULES } from '../data/materials';

export type ActiveTab = 'beranda' | 'materi' | 'lab' | 'kuis' | 'progres';

interface ProgressContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  progress: UserProgress;
  toggleModuleCompleted: (moduleId: string) => void;
  markSolutionTested: (solutionId: string) => void;
  addLabRecord: (
    record: Omit<LabObservationRecord, 'id' | 'timestamp'>
  ) => void;
  deleteLabRecord: (recordId: string) => void;
  saveQuizResult: (score: number, total: number) => void;
  resetAllProgress: () => void;
  overallPercentage: number;
}

const STORAGE_KEY = 'chemlearn_xii_progress_v1';

const defaultProgress: UserProgress = {
  completedModules: [],
  testedSolutions: [],
  highestQuizScore: 0,
  totalQuizAttempts: 0,
  observations: [],
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse localStorage progress:', e);
    }
    return defaultProgress;
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [progress]);

  const toggleModuleCompleted = (moduleId: string) => {
    setProgress((prev) => {
      const exists = prev.completedModules.includes(moduleId);
      const nextModules = exists
        ? prev.completedModules.filter((id) => id !== moduleId)
        : [...prev.completedModules, moduleId];
      return { ...prev, completedModules: nextModules };
    });
  };

  const markSolutionTested = (solutionId: string) => {
    setProgress((prev) => {
      if (prev.testedSolutions.includes(solutionId)) return prev;
      return {
        ...prev,
        testedSolutions: [...prev.testedSolutions, solutionId],
      };
    });
  };

  const addLabRecord = (record: Omit<LabObservationRecord, 'id' | 'timestamp'>) => {
    const newRecord: LabObservationRecord = {
      ...record,
      id: 'rec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setProgress((prev) => ({
      ...prev,
      observations: [newRecord, ...prev.observations],
      testedSolutions: prev.testedSolutions.includes(record.solutionId)
        ? prev.testedSolutions
        : [...prev.testedSolutions, record.solutionId],
    }));
  };

  const deleteLabRecord = (recordId: string) => {
    setProgress((prev) => ({
      ...prev,
      observations: prev.observations.filter((r) => r.id !== recordId),
    }));
  };

  const saveQuizResult = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    setProgress((prev) => {
      const newHighest = Math.max(prev.highestQuizScore, percentage);
      return {
        ...prev,
        highestQuizScore: newHighest,
        totalQuizAttempts: prev.totalQuizAttempts + 1,
        lastQuizResult: {
          score,
          total,
          percentage,
          date: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
        },
      };
    });
  };

  const resetAllProgress = () => {
    setProgress(defaultProgress);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }
  };

  // Calculate comprehensive progress percentage (modules 40%, lab testing 30%, quiz 30%)
  const totalModules = LEARNING_MODULES.length;
  const moduleScore = (progress.completedModules.length / totalModules) * 40;
  const labScore = Math.min(30, (progress.testedSolutions.length / 5) * 30);
  const quizScore = (progress.highestQuizScore / 100) * 30;
  const overallPercentage = Math.round(moduleScore + labScore + quizScore);

  return (
    <ProgressContext.Provider
      value={{
        activeTab,
        setActiveTab,
        progress,
        toggleModuleCompleted,
        markSolutionTested,
        addLabRecord,
        deleteLabRecord,
        saveQuizResult,
        resetAllProgress,
        overallPercentage,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
