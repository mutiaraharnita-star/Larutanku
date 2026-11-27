import React, { useEffect } from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeSection } from './components/home/HomeSection';
import { MaterialsSection } from './components/materials/MaterialsSection';
import { VirtualLabSection } from './components/lab/VirtualLabSection';
import { QuizSection } from './components/quiz/QuizSection';
import { ProgressDashboard } from './components/progress/ProgressDashboard';
import { QuestionBankSection } from './components/teacher/QuestionBankSection';
import { GradeRecapSection } from './components/teacher/GradeRecapSection';
import { AuthModal } from './components/auth/AuthModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Lock, LogIn } from 'lucide-react';
import './App.css';

interface TeacherRouteGuardProps {
  children: React.ReactNode;
}

const TeacherRouteGuard: React.FC<TeacherRouteGuardProps> = ({ children }) => {
  const { session, openAuthModal, setActiveTab } = useProgress();

  const isTeacher = session.isLoggedIn && session.role === 'guru';

  useEffect(() => {
    if (!isTeacher) {
      openAuthModal(
        'guru',
        'Akses Terbatas: Anda harus masuk menggunakan akun Guru resmi untuk mengakses Panel Guru.'
      );
      setActiveTab('beranda');
    }
  }, [isTeacher, openAuthModal, setActiveTab]);

  if (!isTeacher) {
    return (
      <div
        className="teacher-access-denied-container"
        style={{
          maxWidth: '560px',
          margin: '60px auto',
          padding: '36px',
          textAlign: 'center',
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#fef2f2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <Lock size={32} />
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
          Akses Panel Guru Terlindungi
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
          Halaman pengelolaan Bank Soal dan Rekapitulasi Nilai Siswa hanya dapat diakses oleh Tenaga
          Pendidik yang telah masuk dan terautentikasi.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => openAuthModal('guru', 'Masuk Akun Guru untuk Mengakses Panel Guru')}
        >
          <LogIn size={16} style={{ marginRight: '6px' }} />
          <span>Masuk Akun Guru (Database)</span>
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

const MainContent: React.FC = () => {
  const { activeTab } = useProgress();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <main className="main-content-layout" id="main-content-area">
      {activeTab === 'beranda' && <HomeSection />}
      {activeTab === 'materi' && <MaterialsSection />}
      {activeTab === 'lab' && <VirtualLabSection />}
      {activeTab === 'kuis' && <QuizSection />}
      {activeTab === 'progres' && <ProgressDashboard />}

      {/* Teacher Tabs (Terproteksi Autentikasi Guru) */}
      {activeTab === 'bank-soal' && (
        <TeacherRouteGuard>
          <QuestionBankSection />
        </TeacherRouteGuard>
      )}
      {activeTab === 'rekap-nilai' && (
        <TeacherRouteGuard>
          <GradeRecapSection />
        </TeacherRouteGuard>
      )}
    </main>
  );
};

const AppShell: React.FC = () => {
  const { authModalOpen, authTargetRole, authReason, closeAuthModal } = useProgress();

  return (
    <div className="app-root-wrapper" id="chemlearn-app">
      <Navbar />
      <MainContent />
      <Footer />

      {/* Global Auth Modal for switching roles with PIN */}
      {authModalOpen && (
        <AuthModal
          key={`${authTargetRole}-${authModalOpen}`}
          isOpen={authModalOpen}
          targetRole={authTargetRole}
          reason={authReason}
          onClose={closeAuthModal}
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <ErrorBoundary>
      <ProgressProvider>
        <AppShell />
      </ProgressProvider>
    </ErrorBoundary>
  );
}

export default App;
