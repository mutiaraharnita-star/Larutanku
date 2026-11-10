import React, { useState } from 'react';
import {
  Mail,
  Lock,
  KeyRound,
  User,
  GraduationCap,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  LogIn,
  UserPlus,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import type { UserRole, AuthModalView } from '../../types/chemistry';

interface AuthModalProps {
  isOpen: boolean;
  targetRole?: UserRole;
  onClose: () => void;
  reason?: string;
}

const GoogleIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="google-icon-svg">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  targetRole,
  onClose,
  reason,
}) => {
  const {
    authInitialView,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    resetPasswordWithEmail,
    registeredUsers,
  } = useProgress();

  const [view, setView] = useState<AuthModalView>(() => authInitialView || 'login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState<UserRole>(() => (targetRole === 'guru' ? 'guru' : 'siswa'));
  const [regClass, setRegClass] = useState('XII MIPA 1');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1);
  const [forgotOtp, setForgotOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotPass, setShowForgotPass] = useState(false);

  // Feedback states
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);

  if (!isOpen) return null;

  // Handle Quick Demo Fill
  const handleQuickFill = (role: 'siswa' | 'guru') => {
    setErrorMsg('');
    if (role === 'siswa') {
      setLoginEmail('siswa@chemlearn.id');
      setLoginPassword('password123');
    } else {
      setLoginEmail('guru@chemlearn.id');
      setLoginPassword('password123');
    }
  };

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg('Mohon isi email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = loginWithEmail(loginEmail, loginPassword);
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          onClose();
        }, 600);
      } else {
        setErrorMsg(res.message);
      }
    }, 350);
  };

  // Handle Register
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setErrorMsg('Semua kolom wajib diisi dengan lengkap.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter demi keamanan akun Anda.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = registerWithEmail(
        regName,
        regEmail,
        regPassword,
        regRole,
        regRole === 'siswa' ? regClass : undefined
      );
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          onClose();
        }, 700);
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  // Handle Send Reset Code (Forgot Password Step 1)
  const handleSendResetCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = forgotEmail.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMsg('Masukkan alamat email yang terdaftar.');
      return;
    }

    const userExists = registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail);
    if (!userExists) {
      setErrorMsg('Email tersebut tidak terdaftar di sistem ChemLearn XII.');
      return;
    }

    // Generate simulated 6-digit OTP
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(generated);
    setForgotStep(2);
    setSuccessMsg(`Kode verifikasi telah dikirimkan ke email ${cleanEmail}`);
  };

  // Handle Submit New Password (Forgot Password Step 2)
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!forgotOtp.trim()) {
      setErrorMsg('Masukkan kode OTP verifikasi 6-digit.');
      return;
    }

    if (forgotOtp.trim() !== simulatedOtp.trim()) {
      setErrorMsg('Kode OTP verifikasi tidak valid atau telah kedaluwarsa!');
      return;
    }

    if (forgotNewPassword.length < 6) {
      setErrorMsg('Kata sandi baru minimal 6 karakter.');
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setErrorMsg('Konfirmasi kata sandi baru tidak sesuai!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = resetPasswordWithEmail(forgotEmail, forgotNewPassword);
      setIsLoading(false);
      if (res.success) {
        setForgotStep(3);
        setSuccessMsg(res.message);
      } else {
        setErrorMsg(res.message);
      }
    }, 350);
  };

  // Handle Google Login Choice
  const handleSelectGoogleAccount = (account: {
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    studentClass?: string;
  }) => {
    setIsLoading(true);
    setShowGoogleChooser(false);
    setTimeout(() => {
      const res = loginWithGoogle(account);
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        setErrorMsg(res.message);
      }
    }, 350);
  };

  return (
    <div className="modal-backdrop" id="auth-modal-overlay" onClick={onClose}>
      <div
        className="auth-modal-card"
        id="auth-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-heading"
      >
        {/* Header Bar */}
        <div className="auth-card-header">
          <div className="auth-brand-area">
            <div className="auth-brand-badge">
              <Sparkles size={14} className="sparkle-cyan" />
              <span>ChemLearn XII Portal</span>
            </div>
            <h2 id="auth-modal-heading" className="auth-card-title">
              {view === 'forgot'
                ? 'Pemulihan Kata Sandi'
                : view === 'register'
                ? 'Daftar Akun Baru'
                : 'Masuk ke ChemLearn'}
            </h2>
            <p className="auth-card-subtitle">
              {view === 'forgot'
                ? 'Atur ulang kata sandi akun pembelajaran kimia Anda'
                : view === 'register'
                ? 'Daftar akun gratis untuk menyimpan nilai dan sertifikat ke database'
                : 'Login opsional untuk menyimpan riwayat nilai dan sertifikat ke database'}
            </p>
          </div>

          <button
            type="button"
            className="auth-close-btn"
            id="btn-close-auth-modal"
            onClick={onClose}
            aria-label="Tutup jendela otentikasi"
          >
            <X size={18} />
          </button>
        </div>

        {/* Reason Banner if triggered by protected feature */}
        {reason && view !== 'forgot' && (
          <div className="auth-reason-banner">
            <ShieldCheck size={16} className="text-primary" />
            <span>{reason}</span>
          </div>
        )}

        {/* Top Segmented Tab Switcher (Visible in Login & Register) */}
        {view !== 'forgot' && (
          <div className="auth-tabs-segmented" role="tablist">
            <button
              type="button"
              role="tab"
              id="tab-btn-login"
              aria-selected={view === 'login'}
              className={`auth-tab-btn ${view === 'login' ? 'active' : ''}`}
              onClick={() => {
                setView('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
            >
              <LogIn size={15} />
              <span>Masuk (Login)</span>
            </button>
            <button
              type="button"
              role="tab"
              id="tab-btn-register"
              aria-selected={view === 'register'}
              className={`auth-tab-btn ${view === 'register' ? 'active' : ''}`}
              onClick={() => {
                setView('register');
                setErrorMsg('');
                setSuccessMsg('');
              }}
            >
              <UserPlus size={15} />
              <span>Daftar (Register)</span>
            </button>
          </div>
        )}

        {/* Alert Notifications */}
        {errorMsg && (
          <div className="auth-alert alert-error" role="alert">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-alert alert-success" role="status">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* GOOGLE ACCOUNT CHOOSER OVERLAY / DRAWER */}
        {showGoogleChooser && (
          <div className="google-chooser-box">
            <div className="g-chooser-header">
              <GoogleIcon size={20} />
              <div className="g-chooser-titles">
                <strong>Pilih Akun Google</strong>
                <small>Lanjutkan ke ChemLearn XII Kimia SMA</small>
              </div>
              <button
                type="button"
                className="g-close-btn"
                onClick={() => setShowGoogleChooser(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="g-account-list">
              <button
                type="button"
                className="g-account-item"
                onClick={() =>
                  handleSelectGoogleAccount({
                    name: 'Ahmad Fauzi',
                    email: 'ahmad.fauzi@gmail.com',
                    role: 'siswa',
                    studentClass: 'XII MIPA 1',
                    avatar: '👨‍🎓',
                  })
                }
              >
                <div className="g-avatar bg-blue">AF</div>
                <div className="g-acc-info">
                  <span className="g-acc-name">Ahmad Fauzi</span>
                  <span className="g-acc-email">ahmad.fauzi@gmail.com (Siswa XII MIPA 1)</span>
                </div>
              </button>

              <button
                type="button"
                className="g-account-item"
                onClick={() =>
                  handleSelectGoogleAccount({
                    name: 'Dra. Siti Aminah, M.Pd',
                    email: 'siti.aminah@guru.sma.belajar.id',
                    role: 'guru',
                    avatar: '👩‍🏫',
                  })
                }
              >
                <div className="g-avatar bg-purple">SA</div>
                <div className="g-acc-info">
                  <span className="g-acc-name">Dra. Siti Aminah, M.Pd</span>
                  <span className="g-acc-email">siti.aminah@guru.sma.belajar.id (Guru Kimia)</span>
                </div>
              </button>

              <button
                type="button"
                className="g-account-item"
                onClick={() =>
                  handleSelectGoogleAccount({
                    name: 'Putri Ayu Wandira',
                    email: 'putri.ayu@gmail.com',
                    role: 'siswa',
                    studentClass: 'XII MIPA 2',
                    avatar: '🎒',
                  })
                }
              >
                <div className="g-avatar bg-emerald">PA</div>
                <div className="g-acc-info">
                  <span className="g-acc-name">Putri Ayu Wandira</span>
                  <span className="g-acc-email">putri.ayu@gmail.com (Siswa XII MIPA 2)</span>
                </div>
              </button>
            </div>

            <div className="g-chooser-footer">
              <small>Simulasi aman Google OAuth 2.0 untuk pembelajaran kimia</small>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 1: FORM LOGIN
            ========================================================================= */}
        {view === 'login' && !showGoogleChooser && (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            {/* Google Sign In Button */}
            <button
              type="button"
              id="btn-login-with-google"
              className="btn-google-auth"
              onClick={() => setShowGoogleChooser(true)}
              disabled={isLoading}
            >
              <GoogleIcon size={18} />
              <span>Masuk dengan Google</span>
            </button>

            {/* Quick Demo Login Chips */}
            <div className="auth-quick-demo-row">
              <span className="quick-demo-label">Isi Cepat:</span>
              <button
                type="button"
                className="chip-demo chip-siswa"
                onClick={() => handleQuickFill('siswa')}
                title="Isi form dengan akun siswa demo"
              >
                🎒 Demo Siswa
              </button>
              <button
                type="button"
                className="chip-demo chip-guru"
                onClick={() => handleQuickFill('guru')}
                title="Isi form dengan akun guru demo"
              >
                👨‍🏫 Demo Guru
              </button>
            </div>

            <div className="auth-divider">
              <span>atau masuk dengan email</span>
            </div>

            {/* Input Email */}
            <div className="form-group-modern">
              <label htmlFor="login-email-input">Alamat Email / Akun</label>
              <div className="input-icon-wrapper">
                <Mail size={17} className="field-icon" />
                <input
                  type="email"
                  id="login-email-input"
                  name="email"
                  autoComplete="email"
                  placeholder="nama@sekolah.id atau email anda"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="form-group-modern">
              <div className="label-with-link">
                <label htmlFor="login-password-input">Kata Sandi</label>
                <button
                  type="button"
                  id="btn-goto-forgot-password"
                  className="link-text-action"
                  onClick={() => {
                    setView('forgot');
                    setForgotEmail(loginEmail);
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                >
                  Lupa Kata Sandi?
                </button>
              </div>
              <div className="input-icon-wrapper">
                <Lock size={17} className="field-icon" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  id="login-password-input"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Masukkan kata sandi..."
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-eye"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label={showLoginPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="form-checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-submit-login"
              className="btn btn-primary btn-auth-submit"
              disabled={isLoading}
            >
              <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke ChemLearn'}</span>
              <ArrowRight size={17} />
            </button>

            {/* Bottom Switcher */}
            <div className="auth-card-footer">
              <span>Belum memiliki akun?</span>
              <button
                type="button"
                id="btn-switch-to-register"
                className="btn-link-switch"
                onClick={() => {
                  setView('register');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
                Daftar Akun Baru Sekarang
              </button>
            </div>
          </form>
        )}

        {/* =========================================================================
            VIEW 2: FORM REGISTER
            ========================================================================= */}
        {view === 'register' && !showGoogleChooser && (
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            {/* Google Sign Up Button */}
            <button
              type="button"
              id="btn-register-with-google"
              className="btn-google-auth"
              onClick={() => setShowGoogleChooser(true)}
              disabled={isLoading}
            >
              <GoogleIcon size={18} />
              <span>Daftar dengan Google</span>
            </button>

            <div className="auth-divider">
              <span>atau daftar dengan email</span>
            </div>

            {/* Nama Lengkap */}
            <div className="form-group-modern">
              <label htmlFor="reg-name-input">Nama Lengkap</label>
              <div className="input-icon-wrapper">
                <User size={17} className="field-icon" />
                <input
                  type="text"
                  id="reg-name-input"
                  name="name"
                  placeholder="Contoh: Muhammad Bintang"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group-modern">
              <label htmlFor="reg-email-input">Alamat Email</label>
              <div className="input-icon-wrapper">
                <Mail size={17} className="field-icon" />
                <input
                  type="email"
                  id="reg-email-input"
                  name="email"
                  placeholder="nama@email.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Peran / Role Selector */}
            <div className="form-group-modern">
              <label>Peran Akun</label>
              <div className="role-radio-selector">
                <label className={`role-radio-chip ${regRole === 'siswa' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="account-role"
                    value="siswa"
                    checked={regRole === 'siswa'}
                    onChange={() => setRegRole('siswa')}
                  />
                  <div className="chip-content">
                    <User size={16} />
                    <span>Siswa SMA Kelas XII</span>
                  </div>
                </label>

                <label className={`role-radio-chip ${regRole === 'guru' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="account-role"
                    value="guru"
                    checked={regRole === 'guru'}
                    onChange={() => setRegRole('guru')}
                  />
                  <div className="chip-content">
                    <GraduationCap size={16} />
                    <span>Guru / Tenaga Pendidik</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Pilihan Kelas (if Siswa) */}
            {regRole === 'siswa' && (
              <div className="form-group-modern">
                <label htmlFor="reg-class-select">Rombel / Kelas</label>
                <select
                  id="reg-class-select"
                  className="select-modern"
                  value={regClass}
                  onChange={(e) => setRegClass(e.target.value)}
                >
                  <option value="XII MIPA 1">XII MIPA 1</option>
                  <option value="XII MIPA 2">XII MIPA 2</option>
                  <option value="XII MIPA 3">XII MIPA 3</option>
                  <option value="XII IPS 1">XII IPS 1</option>
                  <option value="XII IPS 2">XII IPS 2</option>
                  <option value="Kelas XII Lainnya">Kelas XII Lainnya</option>
                </select>
              </div>
            )}

            {/* Password & Confirm */}
            <div className="form-grid-dual">
              <div className="form-group-modern">
                <label htmlFor="reg-password-input">Kata Sandi</label>
                <div className="input-icon-wrapper">
                  <Lock size={17} className="field-icon" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    id="reg-password-input"
                    name="new-password"
                    placeholder="Min. 6 karakter"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn-toggle-eye"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    aria-label="Tampilkan password"
                  >
                    {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-group-modern">
                <label htmlFor="reg-confirm-password">Konfirmasi Sandi</label>
                <div className="input-icon-wrapper">
                  <Lock size={17} className="field-icon" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    id="reg-confirm-password"
                    name="confirm-password"
                    placeholder="Ulangi sandi"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Match Indicator */}
            {regPassword && regConfirmPassword && (
              <div
                className={`password-match-badge ${
                  regPassword === regConfirmPassword ? 'match' : 'mismatch'
                }`}
              >
                {regPassword === regConfirmPassword ? (
                  <>
                    <Check size={14} /> Kata sandi cocok
                  </>
                ) : (
                  <>
                    <X size={14} /> Kata sandi belum cocok
                  </>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-submit-register"
              className="btn btn-primary btn-auth-submit"
              disabled={isLoading}
            >
              <span>{isLoading ? 'Mendaftarkan Akun...' : 'Daftar Akun Baru'}</span>
              <ArrowRight size={17} />
            </button>

            {/* Bottom Switcher */}
            <div className="auth-card-footer">
              <span>Sudah memiliki akun?</span>
              <button
                type="button"
                id="btn-switch-to-login"
                className="btn-link-switch"
                onClick={() => {
                  setView('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
                Masuk ke Akun
              </button>
            </div>
          </form>
        )}

        {/* =========================================================================
            VIEW 3: MENU LUPA PASSWORD (FORGOT PASSWORD)
            ========================================================================= */}
        {view === 'forgot' && (
          <div className="auth-forgot-flow">
            {/* Step indicator */}
            <div className="forgot-steps-bar">
              <div className={`step-dot ${forgotStep >= 1 ? 'active' : ''}`}>1. Email</div>
              <div className="step-line" />
              <div className={`step-dot ${forgotStep >= 2 ? 'active' : ''}`}>2. Verifikasi OTP</div>
              <div className="step-line" />
              <div className={`step-dot ${forgotStep === 3 ? 'active' : ''}`}>3. Sandi Baru</div>
            </div>

            {/* Step 1: Input Email */}
            {forgotStep === 1 && (
              <form className="auth-form" onSubmit={handleSendResetCode}>
                <p className="forgot-instruction">
                  Masukkan email akun yang terdaftar untuk menerima kode verifikasi OTP pemulihan kata
                  sandi Anda.
                </p>

                <div className="form-group-modern">
                  <label htmlFor="forgot-email-input">Email Terdaftar</label>
                  <div className="input-icon-wrapper">
                    <Mail size={17} className="field-icon" />
                    <input
                      type="email"
                      id="forgot-email-input"
                      placeholder="nama@email.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-send-reset-code"
                  className="btn btn-primary btn-auth-submit"
                >
                  <KeyRound size={17} />
                  <span>Kirim Kode Verifikasi OTP</span>
                </button>
              </form>
            )}

            {/* Step 2: Input OTP & Set New Password */}
            {forgotStep === 2 && (
              <form className="auth-form" onSubmit={handleResetPasswordSubmit}>
                {simulatedOtp && (
                  <div className="otp-simulation-callout">
                    <div className="otp-callout-text">
                      <span className="otp-badge-tag">Simulasi Email Masuk</span>
                      <p>
                        Kode OTP Pemulihan Anda:{' '}
                        <strong className="otp-code-highlight">{simulatedOtp}</strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-autofill-otp"
                      onClick={() => setForgotOtp(simulatedOtp)}
                    >
                      Isi Otomatis
                    </button>
                  </div>
                )}

                <div className="form-group-modern">
                  <label htmlFor="forgot-otp-input">Masukkan 6-Digit Kode OTP</label>
                  <div className="input-icon-wrapper">
                    <KeyRound size={17} className="field-icon" />
                    <input
                      type="text"
                      id="forgot-otp-input"
                      placeholder="Contoh: 123456"
                      maxLength={6}
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-modern">
                  <label htmlFor="forgot-new-pass-input">Kata Sandi Baru</label>
                  <div className="input-icon-wrapper">
                    <Lock size={17} className="field-icon" />
                    <input
                      type={showForgotPass ? 'text' : 'password'}
                      id="forgot-new-pass-input"
                      placeholder="Minimal 6 karakter"
                      value={forgotNewPassword}
                      onChange={(e) => setForgotNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn-toggle-eye"
                      onClick={() => setShowForgotPass(!showForgotPass)}
                      aria-label="Tampilkan kata sandi"
                    >
                      {showForgotPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="form-group-modern">
                  <label htmlFor="forgot-confirm-pass-input">Konfirmasi Sandi Baru</label>
                  <div className="input-icon-wrapper">
                    <Lock size={17} className="field-icon" />
                    <input
                      type={showForgotPass ? 'text' : 'password'}
                      id="forgot-confirm-pass-input"
                      placeholder="Ketik ulang kata sandi baru"
                      value={forgotConfirmPassword}
                      onChange={(e) => setForgotConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-save-new-password"
                  className="btn btn-primary btn-auth-submit"
                  disabled={isLoading}
                >
                  <CheckCircle2 size={17} />
                  <span>{isLoading ? 'Menyimpan...' : 'Perbarui Kata Sandi'}</span>
                </button>
              </form>
            )}

            {/* Step 3: Success Completed */}
            {forgotStep === 3 && (
              <div className="forgot-success-box">
                <div className="success-badge-icon">
                  <CheckCircle2 size={42} className="text-teal" />
                </div>
                <h3>Kata Sandi Berhasil Diperbarui!</h3>
                <p>
                  Kata sandi baru Anda untuk akun <strong>{forgotEmail}</strong> telah aktif. Silakan
                  kembali ke halaman masuk untuk memulai pembelajaran.
                </p>
                <button
                  type="button"
                  id="btn-back-to-login-after-reset"
                  className="btn btn-primary btn-auth-submit"
                  onClick={() => {
                    setView('login');
                    setLoginEmail(forgotEmail);
                    setForgotStep(1);
                    setErrorMsg('');
                    setSuccessMsg('Silakan masuk dengan kata sandi baru Anda.');
                  }}
                >
                  <LogIn size={16} />
                  <span>Masuk dengan Kata Sandi Baru</span>
                </button>
              </div>
            )}

            {/* Return to login link */}
            <div className="forgot-back-row">
              <button
                type="button"
                className="btn-link-back"
                onClick={() => {
                  setView('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                  setForgotStep(1);
                }}
              >
                <ArrowLeft size={15} />
                <span>Kembali ke Halaman Masuk</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
