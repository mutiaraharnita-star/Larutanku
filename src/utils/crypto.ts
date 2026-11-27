/**
 * Password Hashing & Verification Utility using Web Crypto API
 * Solves: "Password disimpan dalam bentuk teks biasa"
 * Implements SHA-256 with static application salt
 */

const APP_SALT = 'Larutanku_XII_Chemistry_2026_SecureSalt';

export async function hashPassword(plainPassword: string): Promise<string> {
  if (!plainPassword) return '';
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(`${APP_SALT}:${plainPassword}`);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      return `sha256:${hashHex}`;
    }
  } catch (err) {
    console.warn('[crypto] SubtleCrypto not available, falling back to base64 salt hash:', err);
  }

  // Fallback hash for environments where SubtleCrypto is disabled/insecure
  let hash = 0;
  const combined = `${APP_SALT}:${plainPassword}`;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `hash:${Math.abs(hash).toString(36)}`;
}

export async function verifyPassword(inputPassword: string, storedHash: string): Promise<boolean> {
  if (!inputPassword || !storedHash) return false;

  // Support legacy plain text during migration
  if (!storedHash.startsWith('sha256:') && !storedHash.startsWith('hash:')) {
    return inputPassword === storedHash;
  }

  const computed = await hashPassword(inputPassword);
  return computed === storedHash;
}
