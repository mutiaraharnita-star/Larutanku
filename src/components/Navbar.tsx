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
  Lock,
  User,
  GraduationCap,
  FileQuestion,
  FileSpreadsheet,
  ArrowRightLeft,
  LogOut,
} from 'lucide-react';
import { useProgress, type ActiveTab } from '../context/ProgressContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    overallPercentage,
    session,
    openAuthModal,
    logout,
  } = useProgress();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isGuru = session.role === 'guru';

  // Base navigation items according to current role
  const navItems: {
    id: ActiveTab;
    label: string;
    icon: React.ReactNode;
    isTeacherOnly?: boolean;
  }[] = isGuru
    ? [
        { id: 'beranda', label: 'Beranda', icon: <Home size={18} /> },
        {
          id: 'bank-soal',
          label: 'Bank Soal',
          icon: <FileQuestion size={18} />,
          isTeacherOnly: true,
        },
        {
          id: 'rekap-nilai',
          label: 'Rekap Nilai',
          icon: <FileSpreadsheet size={18} />,
          isTeacherOnly: true,
        },
        { id: 'materi', label: 'Materi', icon: <BookOpen size={18} /> },
        { id: 'lab', label: 'Lab Virtual', icon: <FlaskConical size={18} /> },
      ]
    : [
        { id: 'beranda', label: 'Beranda', icon: <Home size={18} /> },
        { id: 'materi', label: 'Materi', icon: <BookOpen size={18} /> },
        { id: 'lab', label: 'Lab Virtual', icon: <FlaskConical size={18} /> },
        { id: 'kuis', label: 'Kuis Evaluasi', icon: <HelpCircle size={18} /> },
        { id: 'progres', label: 'Progres', icon: <BarChart3 size={18} /> },
      ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestSwitchRole = (target: 'guru' | 'siswa') => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    if (target === 'guru') {
      openAuthModal(
        'guru',
        'Untuk beralih ke Akun Guru dan membuka Bank Soal serta Rekap Nilai, masukkan PIN Guru.'
      );
    } else {
      openAuthModal(
        'siswa',
        'Untuk beralih ke Akun Siswa, masukkan PIN Siswa.'
      );
    }
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
                className={`nav-button ${isActive ? 'active' : ''} ${
                  item.isTeacherOnly ? 'nav-teacher-btn' : ''
                }`}
                onClick={() => handleSelectTab(item.id)}
                type="button"
              >
                {item.icon}
                <span>{item.label}</span>
                {item.isTeacherOnly && <span className="teacher-badge-mini">Guru</span>}
                {isActive && <div className="nav-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Navbar Right: Role Pill, Switcher, Progress, Mobile Toggle */}
        <div className="navbar-right">
          {/* Progress Pill (shown for students) */}
          {!isGuru && (
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
          )}

          {/* Role Status Pill & Dropdown */}
          <div className="role-switcher-wrapper">
            <button
              type="button"
              id="role-indicator-pill"
              className={`role-indicator-pill ${isGuru ? 'role-guru' : 'role-siswa'}`}
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              title="Klik untuk info akun atau beralih akun dengan PIN"
            >
              <div className="role-pill-icon">
                {isGuru ? <GraduationCap size={16} /> : <User size={16} />}
              </div>
              <div className="role-pill-info">
                <span className="role-pill-type">{isGuru ? 'Guru' : 'Siswa'}</span>
                <span className="role-pill-name">{session.name}</span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="role-dropdown-menu" id="role-profile-dropdown">
                <div className="dropdown-header">
                  <span className="dropdown-title">Status Akun Aktif</span>
                  <div className={`status-badge-mini ${isGuru ? 'badge-guru' : 'badge-siswa'}`}>
                    {isGuru ? '👨‍🏫 Guru Kimia' : '🎒 Siswa XII'}
                  </div>
                </div>

                <div className="dropdown-body">
                  <div className="dropdown-user-info">
                    <span className="d-name">{session.name}</span>
                    <span className="d-role">
                      {isGuru ? 'Akses Pengelolaan Bank Soal & Rekap' : `Kelas: ${session.studentClass || 'XII MIPA 1'}`}
                    </span>
                  </div>

                  <div className="dropdown-divider" />

                  {/* Switch Account Action - Always opens PIN Modal */}
                  {isGuru ? (
                    <button
                      type="button"
                      className="dropdown-item-btn"
                      onClick={() => handleRequestSwitchRole('siswa')}
                    >
                      <ArrowRightLeft size={16} />
                      <div className="dd-item-text">
                        <span>Beralih ke Akun Siswa</span>
                        <small>Memerlukan verifikasi PIN Siswa</small>
                      </div>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="dropdown-item-btn"
                      onClick={() => handleRequestSwitchRole('guru')}
                    >
                      <Lock size={16} />
                      <div className="dd-item-text">
                        <span>Beralih ke Akun Guru</span>
                        <small>Memerlukan verifikasi PIN Guru</small>
                      </div>
                    </button>
                  )}

                  <div className="dropdown-divider" />

                  <button
                    type="button"
                    className="dropdown-item-btn text-danger"
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Keluar (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Direct Switch Role Quick Button (prominent on desktop) */}
          <button
            type="button"
            id="quick-switch-role-btn"
            className={`quick-switch-btn ${isGuru ? 'switch-to-siswa' : 'switch-to-guru'}`}
            onClick={() => handleRequestSwitchRole(isGuru ? 'siswa' : 'guru')}
            title={
              isGuru
                ? 'Beralih ke akun siswa (harus memasukkan PIN Siswa)'
                : 'Beralih ke akun guru (harus memasukkan PIN Guru)'
            }
          >
            <Lock size={14} />
            <span>{isGuru ? 'Beralih ke Siswa' : 'Masuk Guru'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
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
            {/* Mobile Role Banner */}
            <div className={`mobile-role-card ${isGuru ? 'role-guru' : 'role-siswa'}`}>
              <div className="m-role-info">
                {isGuru ? <GraduationCap size={20} /> : <User size={20} />}
                <div>
                  <strong>{isGuru ? 'Mode Guru' : 'Mode Siswa'}</strong>: {session.name}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() => handleRequestSwitchRole(isGuru ? 'siswa' : 'guru')}
              >
                <Lock size={13} />
                <span>{isGuru ? 'Beralih ke Siswa (PIN)' : 'Beralih ke Guru (PIN)'}</span>
              </button>
            </div>

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
                  {item.isTeacherOnly && <span className="teacher-badge-mini">Guru</span>}
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
