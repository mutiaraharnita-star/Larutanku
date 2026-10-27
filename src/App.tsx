import React, { useEffect } from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeSection } from './components/home/HomeSection';
import { MaterialsSection } from './components/materials/MaterialsSection';
import { VirtualLabSection } from './components/lab/VirtualLabSection';
import { QuizSection } from './components/quiz/QuizSection';
import { ProgressDashboard } from './components/progress/ProgressDashboard';
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
    </main>
  );
};

export function App() {
  return (
    <ProgressProvider>
      <div className="app-root-wrapper" id="chemlearn-app">
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </ProgressProvider>
  );
}

export default App;
