import React, { useState } from 'react';
import {
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
  ShieldAlert,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import type { UserRole } from '../../types/chemistry';

interface AuthModalProps {
  isOpen: boolean;
  targetRole: UserRole;
  onClose: () => void;
  reason?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  targetRole,
  onClose,
  reason,
}) => {
  const { verifyAndSwitchRole, guruPin, siswaPin, session } = useProgress();

  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [name, setName] = useState<string>(() =>
    targetRole === 'guru'
      ? session.role === 'guru' ? session.name : 'Dra. Siti Aminah, M.Pd'
      : session.role === 'siswa' && session.name !== 'Tamu / Belum Login'
      ? session.name
      : 'Ahmad Fauzi'
  );
  const [studentClass, setStudentClass] = useState<string>(
    () => session.studentClass || 'XII MIPA 1'
  );
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  if (!isOpen) return null;

  const isGuru = targetRole === 'guru';
  const demoPin = isGuru ? guruPin : siswaPin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!pin.trim()) {
      setErrorMsg('Silakan masukkan PIN autentikasi terlebih dahulu.');
      return;
    }

    const res = verifyAndSwitchRole(targetRole, pin, name, studentClass);

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleUseDemoPin = () => {
    setPin(demoPin);
    setErrorMsg('');
  };

  return (
    <div className="modal-backdrop" id="auth-modal-overlay" onClick={onClose}>
      <div
        className="auth-modal-dialog"
        id="auth-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Modal Header */}
        <div className={`auth-modal-header ${isGuru ? 'header-guru' : 'header-siswa'}`}>
          <div className="auth-header-icon-wrapper">
            {isGuru ? <GraduationCap size={28} /> : <User size={28} />}
          </div>
          <div className="auth-header-text">
            <div className="auth-header-badge">
              <Lock size={12} />
              <span>{isGuru ? 'Akses Pendidik Kimia' : 'Akses Siswa Kelas XII'}</span>
            </div>
            <h2 id="auth-modal-title" className="auth-modal-title">
              {isGuru ? 'Masuk ke Akun Guru' : 'Masuk ke Akun Siswa'}
            </h2>
          </div>
          <button
            type="button"
            className="auth-modal-close"
            onClick={onClose}
            aria-label="Tutup form login"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="auth-modal-body">
          {reason && (
            <div className="auth-reason-banner">
              <ShieldAlert size={18} />
              <span>{reason}</span>
            </div>
          )}

          <p className="auth-modal-intro">
            {isGuru
              ? 'Akses akun Guru dilindungi PIN untuk mengelola Bank Soal kuis dan mengakses Rekapitulasi Nilai seluruh siswa.'
              : 'Akses akun Siswa dengan PIN untuk mencatat hasil latihan kuis, eksperimen lab virtual, dan portofolio belajar.'}
          </p>

          {/* Demo Hint Banner */}
          <div className="auth-demo-hint">
            <div className="demo-hint-left">
              <Sparkles size={16} className="hint-icon" />
              <div>
                <span className="hint-label">PIN Demo Default {isGuru ? 'Guru' : 'Siswa'}:</span>
                <strong className="hint-pin-code">{demoPin}</strong>
              </div>
            </div>
            <button
              type="button"
              className="btn-use-demo-pin"
              onClick={handleUseDemoPin}
              title="Isi otomatis dengan PIN demo"
            >
              Gunakan PIN Demo
            </button>
          </div>

          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="auth-input-name" className="form-label">
              <User size={15} />
              <span>{isGuru ? 'Nama Guru / Pendidik' : 'Nama Siswa'}</span>
            </label>
            <input
              id="auth-input-name"
              type="text"
              className="form-control"
              placeholder={isGuru ? 'Contoh: Dra. Siti Aminah, M.Pd' : 'Contoh: Ahmad Fauzi'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Student Class Field */}
          {!isGuru && (
            <div className="form-group">
              <label htmlFor="auth-input-class" className="form-label">
                <GraduationCap size={15} />
                <span>Kelas / Rombel</span>
              </label>
              <input
                id="auth-input-class"
                type="text"
                className="form-control"
                placeholder="Contoh: XII MIPA 1"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                required
              />
            </div>
          )}

          {/* PIN Input */}
          <div className="form-group">
            <label htmlFor="auth-input-pin" className="form-label">
              <KeyRound size={15} />
              <span>Masukkan PIN {isGuru ? 'Guru' : 'Siswa'} (4 Digit)</span>
            </label>
            <div className="pin-input-wrap">
              <input
                id="auth-input-pin"
                type={showPin ? 'text' : 'password'}
                inputMode="numeric"
                maxLength={8}
                className="form-control pin-input"
                placeholder="Ketik PIN..."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                autoFocus
                required
              />
              <button
                type="button"
                className="btn-toggle-pin"
                onClick={() => setShowPin(!showPin)}
                aria-label={showPin ? 'Sembunyikan PIN' : 'Tampilkan PIN'}
              >
                {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="auth-alert alert-error">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="auth-alert alert-success">
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Notice: No direct switch */}
          <div className="auth-security-notice">
            <Lock size={13} />
            <span>
              Perlindungan Aktif: Sistem tidak mengizinkan peralihan role secara langsung tanpa
              verifikasi PIN yang tepat.
            </span>
          </div>

          {/* Modal Actions */}
          <div className="auth-modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className={`btn ${isGuru ? 'btn-primary' : 'btn-success-solid'}`}
            >
              <KeyRound size={16} />
              <span>Verifikasi & Masuk</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
