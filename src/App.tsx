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
import './App.css';

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

      {/* Teacher Tabs (Akses Bebas Tanpa Kunci/PIN) */}
      {activeTab === 'bank-soal' && <QuestionBankSection />}
      {activeTab === 'rekap-nilai' && <GradeRecapSection />}
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
