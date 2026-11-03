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
import { Lock, ShieldAlert, KeyRound } from 'lucide-react';
import './App.css';

const AccessRestrictedCard: React.FC<{ featureName: string }> = ({ featureName }) => {
  const { openAuthModal } = useProgress();

  return (
    <div className="access-denied-container" id="access-restricted-card">
      <div className="access-denied-card">
        <div className="denied-icon-wrap">
          <ShieldAlert size={48} />
        </div>
        <div className="denied-badge">
          <Lock size={14} />
          <span>Fitur Terkunci (Khusus Pendidik)</span>
        </div>
        <h2 className="denied-title">Akses Panel {featureName} Dibatasi</h2>
        <p className="denied-desc">
          Panel <strong>{featureName}</strong> hanya dapat diakses oleh Guru / Tenaga Pendidik
          menggunakan PIN autentikasi Guru. Siswa tidak diizinkan mengakses kunci jawaban bank soal
          atau rekapitulasi nilai siswa lain demi integritas evaluasi.
        </p>
        <div className="denied-actions">
          <button
            type="button"
            className="btn btn-primary btn-glow"
            onClick={() =>
              openAuthModal(
                'guru',
                `Masukkan PIN Guru untuk membuka akses ${featureName}.`
              )
            }
          >
            <KeyRound size={18} />
            <span>Masukkan PIN Guru untuk Buka Akses</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { activeTab, session } = useProgress();
  const isGuru = session.role === 'guru';

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

      {/* Teacher Protected Tabs */}
      {activeTab === 'bank-soal' && (
        isGuru ? <QuestionBankSection /> : <AccessRestrictedCard featureName="Bank Soal" />
      )}
      {activeTab === 'rekap-nilai' && (
        isGuru ? <GradeRecapSection /> : <AccessRestrictedCard featureName="Rekap Nilai Siswa" />
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
    <ProgressProvider>
      <AppShell />
    </ProgressProvider>
  );
}

export default App;
