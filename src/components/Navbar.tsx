import React, { useState } from 'react';
import {
  FlaskConical,
  BookOpen,
  HelpCircle,
  BarChart3,
  Home,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { useProgress, type ActiveTab } from '../context/ProgressContext';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, overallPercentage } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Home size={18} /> },
    { id: 'materi', label: 'Materi', icon: <BookOpen size={18} /> },
    { id: 'lab', label: 'Lab Virtual', icon: <FlaskConical size={18} /> },
    { id: 'kuis', label: 'Kuis Evaluasi', icon: <HelpCircle size={18} /> },
    { id: 'progres', label: 'Progres', icon: <BarChart3 size={18} /> },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-container" id="header-navbar">
      <div className="navbar-content">
        {/* Brand / Logo */}
        <div
          className="navbar-brand"
          id="navbar-brand"
          onClick={() => handleSelectTab('beranda')}
          role="button"
          tabIndex={0}
        >
          <div className="brand-icon-wrapper">
            <FlaskConical className="brand-icon" size={24} />
            <Sparkles className="brand-sparkle" size={12} />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              ChemLearn <span className="highlight-xii">XII</span>
            </div>
            <span className="brand-subtitle">Larutan Elektrolit & Nonelektrolit</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Navigasi Utama">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                className={`nav-button ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectTab(item.id)}
                type="button"
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive && <div className="nav-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Progress Pill & Mobile Toggle */}
        <div className="navbar-right">
          <div
            className="progress-pill"
            id="nav-progress-pill"
            onClick={() => handleSelectTab('progres')}
            role="button"
            tabIndex={0}
            title="Klik untuk melihat detail progres belajar"
          >
            <div className="progress-ring-mini">
              <span className="progress-value">{overallPercentage}%</span>
            </div>
            <span className="progress-label-text">Progres</span>
          </div>

          <button
            className="mobile-toggle-btn"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            type="button"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" id="mobile-nav-drawer">
          <div className="mobile-drawer-inner">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                className={`mobile-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => handleSelectTab(item.id)}
                type="button"
              >
                <div className="mobile-item-left">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {activeTab === item.id && <span className="active-badge">Aktif</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
