/**
 * Safe storage wrapper with in-memory fallback
 * Solves: "Aplikasi gagal dibuka ketika localStorage mengalami error"
 */

class MemoryStorage implements Storage {
  private store: Map<string, string> = new Map();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] || null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

const memoryLocalStorage = new MemoryStorage();
const memorySessionStorage = new MemoryStorage();

function testStorageAvailability(type: 'localStorage' | 'sessionStorage'): boolean {
  try {
    const storage = window[type];
    const testKey = '__chemlearn_storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const isLocalStorageAvailable = typeof window !== 'undefined' && testStorageAvailability('localStorage');
const isSessionStorageAvailable = typeof window !== 'undefined' && testStorageAvailability('sessionStorage');

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      if (isLocalStorageAvailable) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[safeStorage] Error reading "${key}":`, e);
    }
    return memoryLocalStorage.getItem(key);
  },

  setItem(key: string, value: string): boolean {
    try {
      if (isLocalStorageAvailable) {
        window.localStorage.setItem(key, value);
        return true;
      }
    } catch (e) {
      console.warn(`[safeStorage] Error writing "${key}":`, e);
    }
    try {
      memoryLocalStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  removeItem(key: string): void {
    try {
      if (isLocalStorageAvailable) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`[safeStorage] Error removing "${key}":`, e);
    }
    memoryLocalStorage.removeItem(key);
  },

  getJSON<T>(key: string, fallback: T): T {
    const raw = this.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`[safeStorage] JSON parse error for key "${key}":`, e);
      return fallback;
    }
  },

  setJSON<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      return this.setItem(key, serialized);
    } catch (e) {
      console.warn(`[safeStorage] JSON stringify error for key "${key}":`, e);
      return false;
    }
  },
};

export const safeSession = {
  getItem(key: string): string | null {
    try {
      if (isSessionStorageAvailable) {
        return window.sessionStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[safeSession] Error reading "${key}":`, e);
    }
    return memorySessionStorage.getItem(key);
  },

  setItem(key: string, value: string): boolean {
    try {
      if (isSessionStorageAvailable) {
        window.sessionStorage.setItem(key, value);
        return true;
      }
    } catch (e) {
      console.warn(`[safeSession] Error writing "${key}":`, e);
    }
    try {
      memorySessionStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  removeItem(key: string): void {
    try {
      if (isSessionStorageAvailable) {
        window.sessionStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`[safeSession] Error removing "${key}":`, e);
    }
    memorySessionStorage.removeItem(key);
  },

  getJSON<T>(key: string, fallback: T): T {
    const raw = this.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`[safeSession] JSON parse error for key "${key}":`, e);
      return fallback;
    }
  },

  setJSON<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      return this.setItem(key, serialized);
    } catch (e) {
      console.warn(`[safeSession] JSON stringify error for key "${key}":`, e);
      return false;
    }
  },
};
