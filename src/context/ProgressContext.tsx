import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  LabObservationRecord,
  UserProgress,
  UserRole,
  UserSession,
  QuizSubmission,
  QuizQuestion,
  AuthUser,
  AuthModalView,
  StudentProfile,
  QuizDraft,
} from '../types/chemistry';
import { LEARNING_MODULES } from '../data/materials';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import {
  auth,
  db,
  googleProvider,
  isFirebaseConfigured,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from '../lib/firebase';

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

  // Firebase status
  isFirebaseConfigured: boolean;
  isFirebaseConnected: boolean;

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
  ) => Promise<{ success: boolean; message: string; user?: AuthUser }>;
  registerWithEmail: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    studentClass?: string
  ) => Promise<{ success: boolean; message: string; user?: AuthUser }>;
  loginWithGoogle: (account?: {
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    studentClass?: string;
  }) => Promise<{ success: boolean; message: string; user?: AuthUser }>;
  resetPasswordWithEmail: (
    email: string,
    newPassword?: string
  ) => Promise<{ success: boolean; message: string }>;
  registeredUsers: AuthUser[];
  continueAsGuest: (targetTab?: ActiveTab) => void;
  switchRole: (targetRole: UserRole, targetTab?: ActiveTab) => void;
  verifyAndSwitchRole: (
    targetRole: UserRole,
    enteredPin?: string,
    name?: string,
    studentClass?: string
  ) => { success: boolean; message: string };
  logout: () => void;
  updateSessionProfile: (name: string, studentClass?: string) => void;
  updateGuruPin: (oldPin: string, newPin: string) => { success: boolean; message: string };
  updateSiswaPin: (oldPin: string, newPin: string) => { success: boolean; message: string };

  // Student Profile Storage System
  studentProfile: StudentProfile;
  updateStudentProfile: (profile: Partial<StudentProfile>) => Promise<void>;

  // Quiz Draft / In-Progress Answers Storage
  quizDraft: QuizDraft | null;
  saveQuizDraft: (draft: Partial<QuizDraft>) => void;
  clearQuizDraft: () => void;

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
const STORAGE_KEY_STUDENT_PROFILE = 'chemlearn_xii_student_profile_v1';
const STORAGE_KEY_QUIZ_DRAFT = 'chemlearn_xii_quiz_draft_v1';

const DEFAULT_GURU_PIN = import.meta.env.VITE_DEFAULT_GURU_PIN || '8888';
const DEFAULT_SISWA_PIN = import.meta.env.VITE_DEFAULT_SISWA_PIN || '1234';

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

const defaultStudentProfile: StudentProfile = {
  name: 'Ahmad Fauzi',
  studentClass: 'XII MIPA 1',
  schoolName: 'SMA Negeri 1',
  nisn: '1234567890',
  avatar: '🎒',
  email: 'siswa@chemlearn.id',
  bio: 'Siswa kelas XII yang aktif mempelajari konsep kimia larutan elektrolit.',
  updatedAt: '2026-11-01',
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

  // Student Profile Storage State
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT_PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse localStorage student profile:', e);
    }
    return defaultStudentProfile;
  });

  // Quiz Draft / In-Progress Answers State
  const [quizDraft, setQuizDraft] = useState<QuizDraft | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUIZ_DRAFT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse localStorage quiz draft:', e);
    }
    return null;
  });

  // Firebase Connection State
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress to localStorage:', e);
    }
  }, [progress]);

  // Real-time synchronization with Firebase Auth & Firestore
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    let unsubscribeAuth = () => {};
    if (auth) {
      unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: any) => {
        if (firebaseUser) {
          setIsFirebaseConnected(true);
          let role: UserRole = 'siswa';
          let studentClass = 'XII MIPA 1';
          let name = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Pengguna';

          if (db) {
            try {
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
              if (userDoc.exists()) {
                const data = userDoc.data();
                role = (data.role as UserRole) || role;
                studentClass = data.studentClass || studentClass;
                name = data.name || name;

                if (role === 'siswa') {
                  if (data.studentProfile) {
                    setStudentProfile(data.studentProfile);
                  } else {
                    setStudentProfile((prev) => ({
                      ...prev,
                      uid: firebaseUser.uid,
                      name,
                      studentClass,
                      email: firebaseUser.email || prev.email,
                    }));
                  }
                }
              }
            } catch (err) {
              console.warn('Failed to fetch user doc from Firestore:', err);
            }
          }

          setSession({
            uid: firebaseUser.uid,
            role,
            name,
            email: firebaseUser.email || undefined,
            studentClass: role === 'siswa' ? studentClass : undefined,
            avatar: role === 'guru' ? '👨‍🏫' : '🎒',
            isLoggedIn: true,
            isGuest: false,
            authProvider:
              firebaseUser.providerData[0]?.providerId === 'google.com'
                ? 'google'
                : 'email',
          });
        }
      });
    }

    // Firestore Quiz Submissions real-time listener
    let unsubscribeSubs = () => {};
    if (db) {
      try {
        const q = query(collection(db, 'quiz_submissions'), orderBy('timestamp', 'desc'));
        unsubscribeSubs = onSnapshot(
          q,
          (snapshot: any) => {
            setIsFirebaseConnected(true);
            if (!snapshot.empty) {
              const remoteSubs: QuizSubmission[] = snapshot.docs.map((d: any) => {
                const data = d.data();
                return {
                  id: d.id,
                  uid: data.uid,
                  studentName: data.studentName || 'Siswa',
                  studentClass: data.studentClass || 'XII MIPA 1',
                  score: data.score || 0,
                  totalQuestions: data.totalQuestions || 10,
                  percentage: data.percentage || 0,
                  submittedAt: data.submittedAt || '',
                  status: data.status || 'Lulus',
                };
              });
              setQuizSubmissions(remoteSubs);
            }
          },
          (err: any) => {
            console.warn('Firestore quiz_submissions onSnapshot error:', err);
          }
        );
      } catch (err) {
        console.warn('Could not setup quiz_submissions listener:', err);
      }
    }

    return () => {
      unsubscribeAuth();
      unsubscribeSubs();
    };
  }, []);

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENT_PROFILE, JSON.stringify(studentProfile));
    } catch (e) {
      console.warn('Failed to save student profile to localStorage:', e);
    }
  }, [studentProfile]);

  useEffect(() => {
    try {
      if (quizDraft) {
        localStorage.setItem(STORAGE_KEY_QUIZ_DRAFT, JSON.stringify(quizDraft));
      } else {
        localStorage.removeItem(STORAGE_KEY_QUIZ_DRAFT);
      }
    } catch (e) {
      console.warn('Failed to save quiz draft to localStorage:', e);
    }
  }, [quizDraft]);

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

  // Login with Email & Password (Firebase Auth + Fallback)
  const loginWithEmail = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: AuthUser }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // 1. Check local demo accounts first for quick offline/test login
    const demoUser = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (demoUser && demoUser.password === cleanPass) {
      setSession({
        role: demoUser.role,
        name: demoUser.name,
        email: demoUser.email,
        studentClass: demoUser.studentClass,
        avatar: demoUser.avatar,
        isLoggedIn: true,
        isGuest: false,
        authProvider: demoUser.authProvider,
      });

      closeAuthModal();

      if (demoUser.role === 'guru' && (activeTab === 'kuis' || activeTab === 'progres')) {
        setActiveTab('bank-soal');
      }

      return {
        success: true,
        message: `Selamat datang kembali, ${demoUser.name}! (Akun Demo)`,
        user: demoUser,
      };
    }

    // 2. Authenticate with Firebase Authentication
    if (isFirebaseConfigured && auth) {
      try {
        const userCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
        const firebaseUser = userCred.user;
        let role: UserRole = 'siswa';
        let name = firebaseUser.displayName || cleanEmail.split('@')[0];
        let studentClass = 'XII MIPA 1';

        if (db) {
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              const data = userDoc.data();
              role = (data.role as UserRole) || role;
              name = data.name || name;
              studentClass = data.studentClass || studentClass;
            }
          } catch (err) {
            console.warn('Could not read user profile from Firestore:', err);
          }
        }

        const loggedUser: AuthUser = {
          id: firebaseUser.uid,
          name,
          email: cleanEmail,
          role,
          studentClass: role === 'siswa' ? studentClass : undefined,
          avatar: role === 'guru' ? '👨‍🏫' : '🎒',
          authProvider: 'email',
          createdAt: new Date().toISOString().split('T')[0],
        };

        setSession({
          uid: firebaseUser.uid,
          role,
          name,
          email: cleanEmail,
          studentClass: role === 'siswa' ? studentClass : undefined,
          avatar: loggedUser.avatar,
          isLoggedIn: true,
          isGuest: false,
          authProvider: 'email',
        });

        setIsFirebaseConnected(true);
        closeAuthModal();

        if (role === 'guru' && (activeTab === 'kuis' || activeTab === 'progres')) {
          setActiveTab('bank-soal');
        }

        return {
          success: true,
          message: `Berhasil masuk! Selamat datang, ${name}.`,
          user: loggedUser,
        };
      } catch (error: any) {
        let msg = 'Gagal masuk. Periksa kembali email dan kata sandi Anda.';
        if (
          error?.code === 'auth/invalid-credential' ||
          error?.code === 'auth/wrong-password' ||
          error?.code === 'auth/user-not-found'
        ) {
          msg = 'Email atau kata sandi tidak sesuai. Silakan periksa kembali.';
        } else if (error?.code === 'auth/invalid-email') {
          msg = 'Format alamat email tidak valid.';
        } else if (error?.code === 'auth/too-many-requests') {
          msg = 'Terlalu banyak percobaan gagal. Silakan coba lagi nanti.';
        }
        return { success: false, message: msg };
      }
    }

    return {
      success: false,
      message: 'Email atau kata sandi tidak ditemukan di sistem.',
    };
  };

  // Register new User (Firebase Auth + Firestore Profile + Fallback)
  const registerWithEmail = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    studentClass?: string
  ): Promise<{ success: boolean; message: string; user?: AuthUser }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPass = password.trim();

    if (!cleanName || !cleanEmail || !cleanPass) {
      return {
        success: false,
        message: 'Mohon lengkapi semua kolom pendaftaran.',
      };
    }

    // 1. Firebase Authentication & Firestore Registration
    if (isFirebaseConfigured && auth) {
      try {
        const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
        const firebaseUser = userCred.user;
        await updateProfile(firebaseUser, { displayName: cleanName });

        const userProfileData = {
          uid: firebaseUser.uid,
          name: cleanName,
          email: cleanEmail,
          role,
          studentClass: role === 'siswa' ? studentClass || 'XII MIPA 1' : null,
          createdAt: serverTimestamp(),
        };

        if (db) {
          try {
            await setDoc(doc(db, 'users', firebaseUser.uid), userProfileData);
          } catch (err) {
            console.warn('Could not write user profile to Firestore:', err);
          }
        }

        const newUser: AuthUser = {
          id: firebaseUser.uid,
          name: cleanName,
          email: cleanEmail,
          role,
          studentClass: role === 'siswa' ? studentClass || 'XII MIPA 1' : undefined,
          avatar: role === 'guru' ? '👨‍🏫' : '🎒',
          authProvider: 'email',
          createdAt: new Date().toISOString().split('T')[0],
        };

        setRegisteredUsers((prev) => [newUser, ...prev]);

        setSession({
          uid: firebaseUser.uid,
          role: newUser.role,
          name: newUser.name,
          email: newUser.email,
          studentClass: newUser.studentClass,
          avatar: newUser.avatar,
          isLoggedIn: true,
          isGuest: false,
          authProvider: 'email',
        });

        setIsFirebaseConnected(true);
        closeAuthModal();

        if (role === 'guru') {
          setActiveTab('bank-soal');
        }

        return {
          success: true,
          message: `Pendaftaran berhasil! Akun Anda aktif di database Firebase.`,
          user: newUser,
        };
      } catch (error: any) {
        let msg = 'Gagal mendaftar akun di Firebase.';
        if (error?.code === 'auth/email-already-in-use') {
          msg = 'Email ini sudah terdaftar di sistem! Silakan langsung masuk.';
        } else if (error?.code === 'auth/weak-password') {
          msg = 'Kata sandi minimal 6 karakter demi keamanan akun Anda.';
        } else if (error?.code === 'auth/invalid-email') {
          msg = 'Format alamat email tidak valid.';
        }
        return { success: false, message: msg };
      }
    }

    // 2. Fallback to local storage if Firebase is not yet ready
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

  // Login with Google (Real Firebase Google Sign-In with Demo Chooser Fallback)
  const loginWithGoogle = async (account?: {
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    studentClass?: string;
  }): Promise<{ success: boolean; message: string; user?: AuthUser }> => {
    // If account was chosen manually from demo chooser
    if (account) {
      const targetName = account.name;
      const targetEmail = account.email.toLowerCase();
      const targetRole = account.role;
      const targetClass = account.studentClass || (targetRole === 'siswa' ? 'XII MIPA 1' : undefined);
      const targetAvatar = account.avatar || (targetRole === 'guru' ? '👩‍🏫' : '👨‍🎓');

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
        isGuest: false,
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
    }

    // Real Firebase Google Auth Popup
    if (isFirebaseConfigured && auth) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const firebaseUser = result.user;
        let role: UserRole = 'siswa';
        let studentClass = 'XII MIPA 1';
        let name = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Pengguna Google';

        if (db) {
          try {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const data = userDoc.data();
              role = (data.role as UserRole) || role;
              studentClass = data.studentClass || studentClass;
              name = data.name || name;
            } else {
              // Create user record in Firestore
              await setDoc(userDocRef, {
                uid: firebaseUser.uid,
                name,
                email: firebaseUser.email,
                role,
                studentClass,
                createdAt: serverTimestamp(),
              });
            }
          } catch (err) {
            console.warn('Could not save google user profile in Firestore:', err);
          }
        }

        const user: AuthUser = {
          id: firebaseUser.uid,
          name,
          email: firebaseUser.email || '',
          role,
          studentClass: role === 'siswa' ? studentClass : undefined,
          avatar: role === 'guru' ? '👩‍🏫' : '👨‍🎓',
          authProvider: 'google',
          createdAt: new Date().toISOString().split('T')[0],
        };

        setSession({
          uid: firebaseUser.uid,
          role: user.role,
          name: user.name,
          email: user.email,
          studentClass: user.studentClass,
          avatar: user.avatar,
          isLoggedIn: true,
          isGuest: false,
          authProvider: 'google',
        });

        setIsFirebaseConnected(true);
        closeAuthModal();

        if (role === 'guru') {
          setActiveTab('bank-soal');
        }

        return {
          success: true,
          message: `Berhasil masuk dengan akun Google: ${firebaseUser.email}`,
          user,
        };
      } catch (error: any) {
        if (
          error?.code === 'auth/popup-closed-by-user' ||
          error?.code === 'auth/cancelled-popup-request'
        ) {
          return { success: false, message: 'Jendela login Google ditutup sebelum selesai.' };
        }
        console.warn('Google Sign-In popup error:', error);
        return { success: false, message: error?.message || 'Gagal masuk dengan Google.' };
      }
    }

    return {
      success: false,
      message: 'Firebase belum terkonfigurasi. Silakan periksa file .env.local Anda.',
    };
  };

  // Reset Password with Email (Firebase sendPasswordResetEmail + Fallback)
  const resetPasswordWithEmail = async (
    email: string,
    newPassword?: string
  ): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Firebase Password Reset Email
    if (isFirebaseConfigured && auth) {
      try {
        await sendPasswordResetEmail(auth, cleanEmail);
        return {
          success: true,
          message: `Link reset kata sandi telah dikirimkan ke email ${cleanEmail}. Silakan periksa inbox/spam.`,
        };
      } catch (error: any) {
        if (error?.code === 'auth/user-not-found') {
          return { success: false, message: 'Email tidak ditemukan di sistem Firebase.' };
        } else if (error?.code === 'auth/invalid-email') {
          return { success: false, message: 'Format alamat email tidak valid.' };
        }
        console.warn('Firebase sendPasswordResetEmail error:', error);
      }
    }

    // 2. Local Fallback for mock accounts
    const cleanPass = newPassword ? newPassword.trim() : '';
    if (cleanPass && cleanPass.length < 6) {
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

    if (cleanPass) {
      setRegisteredUsers((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          password: cleanPass,
        };
        return updated;
      });
    }

    return {
      success: true,
      message: 'Kata sandi berhasil diperbarui! Silakan masuk menggunakan kata sandi baru Anda.',
    };
  };

  // Role switcher: Free access without PIN lock
  const switchRole = (targetRole: UserRole, targetTab?: ActiveTab) => {
    setSession((prev) => {
      const defaultName =
        targetRole === 'guru' ? 'Guru Kimia (Mode Bebas)' : 'Siswa Kimia (Mode Bebas)';
      return {
        ...prev,
        role: targetRole,
        name: prev.isLoggedIn ? prev.name : defaultName,
        studentClass: targetRole === 'guru' ? undefined : (prev.studentClass || 'XII MIPA 1'),
      };
    });

    if (targetTab) {
      setActiveTab(targetTab);
    } else if (targetRole === 'guru' && (activeTab === 'kuis' || activeTab === 'progres')) {
      setActiveTab('bank-soal');
    } else if (targetRole === 'siswa' && (activeTab === 'bank-soal' || activeTab === 'rekap-nilai')) {
      setActiveTab('beranda');
    }
  };

  // Backwards-compatible verifyAndSwitchRole without PIN barrier
  const verifyAndSwitchRole = (
    targetRole: UserRole,
    _enteredPin?: string,
    name?: string,
    studentClass?: string
  ): { success: boolean; message: string } => {
    switchRole(targetRole);
    if (name && name.trim()) {
      updateSessionProfile(name.trim(), studentClass);
    }
    closeAuthModal();

    return {
      success: true,
      message: `Berhasil beralih ke peran ${targetRole === 'guru' ? 'Guru Kimia' : 'Siswa'}!`,
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

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn('Firebase signOut error:', e);
      }
    }
    setSession({
      role: 'siswa',
      name: 'Tamu / Pengunjung',
      studentClass: undefined,
      isLoggedIn: false,
      isGuest: true,
    });
    setActiveTab('beranda');
  };

  const updateStudentProfile = async (profileData: Partial<StudentProfile>) => {
    const updated: StudentProfile = {
      ...studentProfile,
      ...profileData,
      updatedAt: new Date().toISOString(),
    };
    setStudentProfile(updated);

    if (session.role === 'siswa') {
      setSession((prev) => ({
        ...prev,
        name: updated.name || prev.name,
        studentClass: updated.studentClass !== undefined ? updated.studentClass : prev.studentClass,
        avatar: updated.avatar || prev.avatar,
      }));
    }

    const currentUid = session.uid || auth?.currentUser?.uid;
    if (isFirebaseConfigured && db && currentUid) {
      try {
        await setDoc(
          doc(db, 'users', currentUid),
          {
            name: updated.name,
            studentClass: updated.studentClass,
            schoolName: updated.schoolName || null,
            nisn: updated.nisn || null,
            avatar: updated.avatar || null,
            bio: updated.bio || null,
            studentProfile: updated,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn('Failed to sync student profile to Firestore:', err);
      }
    }
  };

  const saveQuizDraft = useCallback((draftUpdate: Partial<QuizDraft>) => {
    setQuizDraft((prev) => {
      const merged: QuizDraft = {
        userAnswers: draftUpdate.userAnswers !== undefined ? draftUpdate.userAnswers : (prev?.userAnswers || {}),
        currentIndex: draftUpdate.currentIndex !== undefined ? draftUpdate.currentIndex : (prev?.currentIndex || 0),
        isSubmitted: draftUpdate.isSubmitted !== undefined ? draftUpdate.isSubmitted : (prev?.isSubmitted || false),
        score: draftUpdate.score !== undefined ? draftUpdate.score : prev?.score,
        totalQuestions: draftUpdate.totalQuestions !== undefined ? draftUpdate.totalQuestions : prev?.totalQuestions,
        percentage: draftUpdate.percentage !== undefined ? draftUpdate.percentage : prev?.percentage,
        updatedAt: new Date().toISOString(),
      };
      return merged;
    });
  }, []);

  const clearQuizDraft = useCallback(() => {
    setQuizDraft(null);
  }, []);

  const updateSessionProfile = (name: string, studentClass?: string) => {
    const cleanName = name.trim();
    const cleanClass = studentClass !== undefined ? studentClass.trim() : undefined;
    setSession((prev) => ({
      ...prev,
      name: cleanName || prev.name,
      studentClass: cleanClass !== undefined ? cleanClass : prev.studentClass,
    }));

    if (session.role === 'siswa') {
      updateStudentProfile({
        name: cleanName || studentProfile.name,
        studentClass: cleanClass !== undefined ? cleanClass : studentProfile.studentClass,
      });
    }
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

  // Rekap Nilai Management (Guru) - Local + Cloud Firestore Sync
  const addQuizSubmission = async (
    submission: Omit<QuizSubmission, 'id' | 'submittedAt'>
  ) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    const localId = 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const newSub: QuizSubmission = {
      ...submission,
      id: localId,
      uid: session.uid || (auth?.currentUser?.uid ?? undefined),
      submittedAt: formattedDate,
    };
    setQuizSubmissions((prev) => [newSub, ...prev]);

    // Cloud Firestore Persistence
    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db, 'quiz_submissions'), {
          ...submission,
          uid: session.uid || auth?.currentUser?.uid || 'guest',
          submittedAt: formattedDate,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        console.warn('Could not save submission to Firestore:', err);
      }
    }
  };

  const deleteQuizSubmission = async (id: string) => {
    setQuizSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'quiz_submissions', id));
      } catch (err) {
        console.warn('Could not delete submission from Firestore:', err);
      }
    }
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

        isFirebaseConfigured,
        isFirebaseConnected,

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
        switchRole,
        verifyAndSwitchRole,
        logout,
        updateSessionProfile,
        updateGuruPin,
        updateSiswaPin,

        studentProfile,
        updateStudentProfile,
        quizDraft,
        saveQuizDraft,
        clearQuizDraft,

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
