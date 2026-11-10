import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  LabObservationRecord,
  UserProgress,
  UserRole,
  UserSession,
  QuizSubmission,
  QuizQuestion,
  AuthUser,
  AuthModalView,
} from '../types/chemistry';
import { LEARNING_MODULES } from '../data/materials';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

export type ActiveTab =
  | 'beranda'
  | 'materi'
  | 'lab'
  | 'kuis'
  | 'progres'
  | 'bank-soal'
  | 'rekap-nilai';

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

  // Session & Auth
  session: UserSession;
  guruPin: string;
  siswaPin: string;
  authModalOpen: boolean;
  authTargetRole: UserRole;
  authInitialView: AuthModalView;
  authReason: string;
  openAuthModal: (
    targetRoleOrView?: UserRole | AuthModalView,
    reason?: string,
    view?: AuthModalView
  ) => void;
  closeAuthModal: () => void;
  loginWithEmail: (
    email: string,
    password: string
  ) => { success: boolean; message: string; user?: AuthUser };
  registerWithEmail: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    studentClass?: string
  ) => { success: boolean; message: string; user?: AuthUser };
  loginWithGoogle: (account?: {
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    studentClass?: string;
  }) => { success: boolean; message: string; user?: AuthUser };
  resetPasswordWithEmail: (
    email: string,
    newPassword: string
  ) => { success: boolean; message: string };
  registeredUsers: AuthUser[];
  continueAsGuest: (targetTab?: ActiveTab) => void;
  verifyAndSwitchRole: (
    targetRole: UserRole,
    enteredPin: string,
    name?: string,
    studentClass?: string
  ) => { success: boolean; message: string };
  logout: () => void;
  updateSessionProfile: (name: string, studentClass?: string) => void;
  updateGuruPin: (oldPin: string, newPin: string) => { success: boolean; message: string };
  updateSiswaPin: (oldPin: string, newPin: string) => { success: boolean; message: string };

  // Bank Soal
  quizQuestions: QuizQuestion[];
  addQuizQuestion: (question: Omit<QuizQuestion, 'id'>) => void;
  updateQuizQuestion: (question: QuizQuestion) => void;
  deleteQuizQuestion: (id: number) => void;
  resetQuizQuestionsToDefault: () => void;

  // Rekap Nilai
  quizSubmissions: QuizSubmission[];
  addQuizSubmission: (
    submission: Omit<QuizSubmission, 'id' | 'submittedAt'>
  ) => void;
  deleteQuizSubmission: (id: string) => void;
  resetQuizSubmissionsToDefault: () => void;
  clearAllQuizSubmissions: () => void;
}

const STORAGE_KEY_PROGRESS = 'chemlearn_xii_progress_v1';
const STORAGE_KEY_SESSION = 'chemlearn_xii_session_v1';
const STORAGE_KEY_GURU_PIN = 'chemlearn_xii_guru_pin_v1';
const STORAGE_KEY_SISWA_PIN = 'chemlearn_xii_siswa_pin_v1';
const STORAGE_KEY_QUESTIONS = 'chemlearn_xii_quiz_questions_v1';
const STORAGE_KEY_SUBMISSIONS = 'chemlearn_xii_quiz_submissions_v1';
const STORAGE_KEY_USERS = 'chemlearn_xii_registered_users_v1';

const DEFAULT_GURU_PIN = '8888';
const DEFAULT_SISWA_PIN = '1234';

const defaultUsers: AuthUser[] = [
  {
    id: 'user_siswa_1',
    name: 'Ahmad Fauzi',
    email: 'siswa@chemlearn.id',
    password: 'password123',
    role: 'siswa',
    studentClass: 'XII MIPA 1',
    avatar: '🎒',
    authProvider: 'email',
    createdAt: '2026-11-01',
  },
  {
    id: 'user_guru_1',
    name: 'Dra. Siti Aminah, M.Pd',
    email: 'guru@chemlearn.id',
    password: 'password123',
    role: 'guru',
    studentClass: undefined,
    avatar: '👩‍🏫',
    authProvider: 'email',
    createdAt: '2026-11-01',
  },
];

const defaultProgress: UserProgress = {
  completedModules: [],
  testedSolutions: [],
  highestQuizScore: 0,
  totalQuizAttempts: 0,
  observations: [],
};

const defaultSession: UserSession = {
  role: 'siswa',
  name: 'Tamu / Pengunjung',
  studentClass: undefined,
  isLoggedIn: false,
  isGuest: true,
};

const defaultSubmissions: QuizSubmission[] = [
  {
    id: 'sub_1',
    studentName: 'Ahmad Fauzi',
    studentClass: 'XII MIPA 1',
    score: 9,
    totalQuestions: 10,
    percentage: 90,
    submittedAt: '03 Nov 2026, 08:30 WIB',
    status: 'Lulus',
  },
  {
    id: 'sub_2',
    studentName: 'Bella Safitri',
    studentClass: 'XII MIPA 1',
    score: 10,
    totalQuestions: 10,
    percentage: 100,
    submittedAt: '03 Nov 2026, 09:15 WIB',
    status: 'Lulus',
  },
  {
    id: 'sub_3',
    studentName: 'Dimas Pratama',
    studentClass: 'XII MIPA 2',
    score: 6,
    totalQuestions: 10,
    percentage: 60,
    submittedAt: '03 Nov 2026, 10:00 WIB',
    status: 'Remedial',
  },
  {
    id: 'sub_4',
    studentName: 'Siti Nurhaliza',
    studentClass: 'XII MIPA 1',
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    submittedAt: '03 Nov 2026, 10:45 WIB',
    status: 'Lulus',
  },
  {
    id: 'sub_5',
    studentName: 'Rizky Ramadhan',
    studentClass: 'XII MIPA 2',
    score: 7,
    totalQuestions: 10,
    percentage: 70,
    submittedAt: '03 Nov 2026, 11:20 WIB',
    status: 'Remedial',
  },
  {
    id: 'sub_6',
    studentName: 'Nabila Putri',
    studentClass: 'XII MIPA 3',
    score: 9,
    totalQuestions: 10,
    percentage: 90,
    submittedAt: '03 Nov 2026, 13:10 WIB',
    status: 'Lulus',
  },
  {
    id: 'sub_7',
    studentName: 'Fajar Hidayat',
    studentClass: 'XII MIPA 2',
    score: 10,
    totalQuestions: 10,
    percentage: 100,
    submittedAt: '03 Nov 2026, 14:05 WIB',
    status: 'Lulus',
  },
];

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');

  // Auth & Session State
  const [session, setSession] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSION);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse localStorage session:', e);
    }
    return defaultSession;
  });

  const [guruPin, setGuruPin] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_GURU_PIN) || DEFAULT_GURU_PIN;
  });

  const [siswaPin, setSiswaPin] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_SISWA_PIN) || DEFAULT_SISWA_PIN;
  });

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authTargetRole, setAuthTargetRole] = useState<UserRole>('guru');
  const [authInitialView, setAuthInitialView] = useState<AuthModalView>('login');
  const [authReason, setAuthReason] = useState<string>('');

  // Registered Users State
  const [registeredUsers, setRegisteredUsers] = useState<AuthUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse localStorage users:', e);
    }
    return defaultUsers;
  });

  // Learning Progress State
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse localStorage progress:', e);
    }
    return defaultProgress;
  });

  // Quiz Questions State (Bank Soal)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse localStorage questions:', e);
    }
    return QUIZ_QUESTIONS;
  });

  // Quiz Submissions State (Rekap Nilai)
  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse localStorage submissions:', e);
    }
    return defaultSubmissions;
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress to localStorage:', e);
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    } catch (e) {
      console.warn('Failed to save session to localStorage:', e);
    }
  }, [session]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GURU_PIN, guruPin);
    } catch (e) {
      console.warn('Failed to save guru PIN to localStorage:', e);
    }
  }, [guruPin]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SISWA_PIN, siswaPin);
    } catch (e) {
      console.warn('Failed to save siswa PIN to localStorage:', e);
    }
  }, [siswaPin]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(quizQuestions));
    } catch (e) {
      console.warn('Failed to save questions to localStorage:', e);
    }
  }, [quizQuestions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(quizSubmissions));
    } catch (e) {
      console.warn('Failed to save submissions to localStorage:', e);
    }
  }, [quizSubmissions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(registeredUsers));
    } catch (e) {
      console.warn('Failed to save users to localStorage:', e);
    }
  }, [registeredUsers]);

  // Auth Modal Controls
  const openAuthModal = (
    targetRoleOrView?: UserRole | AuthModalView,
    reason: string = '',
    explicitView?: AuthModalView
  ) => {
    if (targetRoleOrView === 'guru' || targetRoleOrView === 'siswa') {
      setAuthTargetRole(targetRoleOrView);
      setAuthInitialView(explicitView || 'login');
    } else if (
      targetRoleOrView === 'login' ||
      targetRoleOrView === 'register' ||
      targetRoleOrView === 'forgot'
    ) {
      setAuthInitialView(targetRoleOrView);
    } else {
      setAuthInitialView('login');
    }
    setAuthReason(reason);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setAuthReason('');
  };

  // Login with Email & Password
  const loginWithEmail = (
    email: string,
    password: string
  ): { success: boolean; message: string; user?: AuthUser } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const user = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return {
        success: false,
        message: 'Email tidak ditemukan. Silakan periksa kembali atau daftar akun baru.',
      };
    }

    if (user.password && user.password !== cleanPass) {
      return {
        success: false,
        message: 'Kata sandi tidak sesuai! Silakan coba lagi atau gunakan menu Lupa Password.',
      };
    }

    setSession({
      role: user.role,
      name: user.name,
      email: user.email,
      studentClass: user.studentClass,
      avatar: user.avatar,
      isLoggedIn: true,
      authProvider: user.authProvider,
    });

    closeAuthModal();

    if (user.role === 'guru' && (activeTab === 'kuis' || activeTab === 'progres')) {
      setActiveTab('bank-soal');
    }

    return {
      success: true,
      message: `Selamat datang kembali, ${user.name}!`,
      user,
    };
  };

  // Register new User
  const registerWithEmail = (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    studentClass?: string
  ): { success: boolean; message: string; user?: AuthUser } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPass = password.trim();

    if (!cleanName || !cleanEmail || !cleanPass) {
      return {
        success: false,
        message: 'Mohon lengkapi semua kolom pendaftaran.',
      };
    }

    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return {
        success: false,
        message: 'Email ini sudah terdaftar! Silakan langsung masuk.',
      };
    }

    const newUser: AuthUser = {
      id: `user_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: cleanPass,
      role,
      studentClass: role === 'siswa' ? studentClass || 'XII MIPA 1' : undefined,
      avatar: role === 'guru' ? '👨‍🏫' : '🎒',
      authProvider: 'email',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRegisteredUsers((prev) => [newUser, ...prev]);

    setSession({
      role: newUser.role,
      name: newUser.name,
      email: newUser.email,
      studentClass: newUser.studentClass,
      avatar: newUser.avatar,
      isLoggedIn: true,
      authProvider: 'email',
    });

    closeAuthModal();

    if (role === 'guru') {
      setActiveTab('bank-soal');
    }

    return {
      success: true,
      message: `Pendaftaran berhasil! Selamat datang, ${newUser.name}.`,
      user: newUser,
    };
  };

  // Login with Google (Simulation)
  const loginWithGoogle = (account?: {
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    studentClass?: string;
  }): { success: boolean; message: string; user?: AuthUser } => {
    const targetName = account?.name || 'Ahmad Fauzi';
    const targetEmail = (account?.email || 'ahmad.fauzi@gmail.com').toLowerCase();
    const targetRole = account?.role || 'siswa';
    const targetClass = account?.studentClass || (targetRole === 'siswa' ? 'XII MIPA 1' : undefined);
    const targetAvatar = account?.avatar || (targetRole === 'guru' ? '👩‍🏫' : '👨‍🎓');

    let user = registeredUsers.find((u) => u.email.toLowerCase() === targetEmail);

    if (!user) {
      user = {
        id: `google_${Date.now()}`,
        name: targetName,
        email: targetEmail,
        role: targetRole,
        studentClass: targetClass,
        avatar: targetAvatar,
        authProvider: 'google',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setRegisteredUsers((prev) => [user!, ...prev]);
    }

    setSession({
      role: user.role,
      name: user.name,
      email: user.email,
      studentClass: user.studentClass,
      avatar: user.avatar,
      isLoggedIn: true,
      authProvider: 'google',
    });

    closeAuthModal();

    if (user.role === 'guru') {
      setActiveTab('bank-soal');
    }

    return {
      success: true,
      message: `Berhasil masuk dengan akun Google: ${user.email}`,
      user,
    };
  };

  // Reset Password with Email
  const resetPasswordWithEmail = (
    email: string,
    newPassword: string
  ): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = newPassword.trim();

    if (!cleanPass || cleanPass.length < 6) {
      return {
        success: false,
        message: 'Kata sandi baru minimal 6 karakter!',
      };
    }

    const index = registeredUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);

    if (index === -1) {
      return {
        success: false,
        message: 'Email tidak ditemukan di sistem! Pastikan email sudah terdaftar.',
      };
    }

    setRegisteredUsers((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        password: cleanPass,
      };
      return updated;
    });

    return {
      success: true,
      message: 'Kata sandi berhasil diperbarui! Silakan masuk menggunakan kata sandi baru Anda.',
    };
  };

  // Crucial requirement: Verify PIN before switching role
  const verifyAndSwitchRole = (
    targetRole: UserRole,
    enteredPin: string,
    name?: string,
    studentClass?: string
  ): { success: boolean; message: string } => {
    const requiredPin = targetRole === 'guru' ? guruPin : siswaPin;

    if (enteredPin.trim() !== requiredPin.trim()) {
      return {
        success: false,
        message: `PIN ${targetRole === 'guru' ? 'Guru' : 'Siswa'} salah! Silakan periksa kembali PIN Anda.`,
      };
    }

    // PIN is correct! Update session
    const resolvedName =
      name && name.trim()
        ? name.trim()
        : targetRole === 'guru'
        ? 'Dra. Siti Aminah, M.Pd'
        : 'Siswa Kimia XII';

    const resolvedClass =
      targetRole === 'siswa'
        ? (studentClass && studentClass.trim()) || 'XII MIPA 1'
        : undefined;

    setSession({
      role: targetRole,
      name: resolvedName,
      studentClass: resolvedClass,
      isLoggedIn: true,
    });

    closeAuthModal();

    // If switching to Guru, navigate to bank-soal or rekap-nilai if previously on student-only view
    if (targetRole === 'guru' && (activeTab === 'kuis' || activeTab === 'progres')) {
      setActiveTab('bank-soal');
    } else if (targetRole === 'siswa' && (activeTab === 'bank-soal' || activeTab === 'rekap-nilai')) {
      setActiveTab('beranda');
    }

    return {
      success: true,
      message: `Berhasil masuk sebagai ${targetRole === 'guru' ? 'Guru Kimia' : 'Siswa'}!`,
    };
  };

  const continueAsGuest = (targetTab?: ActiveTab) => {
    setSession({
      role: 'siswa',
      name: 'Tamu / Pengunjung',
      studentClass: undefined,
      isLoggedIn: false,
      isGuest: true,
    });
    if (targetTab) {
      setActiveTab(targetTab);
    }
  };

  const logout = () => {
    setSession({
      role: 'siswa',
      name: 'Tamu / Pengunjung',
      studentClass: undefined,
      isLoggedIn: false,
      isGuest: true,
    });
    setActiveTab('beranda');
  };

  const updateSessionProfile = (name: string, studentClass?: string) => {
    setSession((prev) => ({
      ...prev,
      name: name.trim() || prev.name,
      studentClass: studentClass !== undefined ? studentClass.trim() : prev.studentClass,
    }));
  };

  const updateGuruPin = (oldPin: string, newPin: string): { success: boolean; message: string } => {
    if (oldPin.trim() !== guruPin.trim()) {
      return { success: false, message: 'PIN lama Guru tidak sesuai!' };
    }
    if (newPin.trim().length < 4) {
      return { success: false, message: 'PIN baru minimal 4 karakter/angka!' };
    }
    setGuruPin(newPin.trim());
    return { success: true, message: 'PIN Guru berhasil diperbarui!' };
  };

  const updateSiswaPin = (oldPin: string, newPin: string): { success: boolean; message: string } => {
    if (oldPin.trim() !== siswaPin.trim()) {
      return { success: false, message: 'PIN lama Siswa tidak sesuai!' };
    }
    if (newPin.trim().length < 4) {
      return { success: false, message: 'PIN baru minimal 4 karakter/angka!' };
    }
    setSiswaPin(newPin.trim());
    return { success: true, message: 'PIN Siswa berhasil diperbarui!' };
  };

  // Learning Progress Handlers
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
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }
  };

  // Bank Soal Management (Guru)
  const addQuizQuestion = (question: Omit<QuizQuestion, 'id'>) => {
    const newId = quizQuestions.length > 0 ? Math.max(...quizQuestions.map((q) => q.id)) + 1 : 1;
    const newQuestion: QuizQuestion = {
      ...question,
      id: newId,
    };
    setQuizQuestions((prev) => [...prev, newQuestion]);
  };

  const updateQuizQuestion = (question: QuizQuestion) => {
    setQuizQuestions((prev) => prev.map((q) => (q.id === question.id ? question : q)));
  };

  const deleteQuizQuestion = (id: number) => {
    setQuizQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const resetQuizQuestionsToDefault = () => {
    setQuizQuestions(QUIZ_QUESTIONS);
    try {
      localStorage.removeItem(STORAGE_KEY_QUESTIONS);
    } catch (e) {
      console.warn('Error resetting questions:', e);
    }
  };

  // Rekap Nilai Management (Guru)
  const addQuizSubmission = (submission: Omit<QuizSubmission, 'id' | 'submittedAt'>) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    const newSub: QuizSubmission = {
      ...submission,
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      submittedAt: formattedDate,
    };
    setQuizSubmissions((prev) => [newSub, ...prev]);
  };

  const deleteQuizSubmission = (id: string) => {
    setQuizSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const resetQuizSubmissionsToDefault = () => {
    setQuizSubmissions(defaultSubmissions);
  };

  const clearAllQuizSubmissions = () => {
    setQuizSubmissions([]);
  };

  // Overall progress percentage calculation
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

        session,
        guruPin,
        siswaPin,
        authModalOpen,
        authTargetRole,
        authInitialView,
        authReason,
        openAuthModal,
        closeAuthModal,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        resetPasswordWithEmail,
        registeredUsers,
        continueAsGuest,
        verifyAndSwitchRole,
        logout,
        updateSessionProfile,
        updateGuruPin,
        updateSiswaPin,

        quizQuestions,
        addQuizQuestion,
        updateQuizQuestion,
        deleteQuizQuestion,
        resetQuizQuestionsToDefault,

        quizSubmissions,
        addQuizSubmission,
        deleteQuizSubmission,
        resetQuizSubmissionsToDefault,
        clearAllQuizSubmissions,
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
