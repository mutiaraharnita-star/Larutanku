/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID?: string;

  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_SHORT_NAME?: string;
  readonly VITE_APP_DESCRIPTION?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_APP_ENV?: string;
  readonly VITE_APP_PORT?: string;
  readonly VITE_DEFAULT_GURU_PIN?: string;
  readonly VITE_DEFAULT_SISWA_PIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'firebase/app' {
  export const initializeApp: any;
  export const getApps: any;
  export type FirebaseApp = any;
}

declare module 'firebase/auth' {
  export const getAuth: any;
  export const GoogleAuthProvider: any;
  export const signInWithPopup: any;
  export const signInWithEmailAndPassword: any;
  export const createUserWithEmailAndPassword: any;
  export const signOut: any;
  export const sendPasswordResetEmail: any;
  export const updateProfile: any;
  export const onAuthStateChanged: any;
  export type Auth = any;
  export type User = any;
}

declare module 'firebase/firestore' {
  export const getFirestore: any;
  export const collection: any;
  export const doc: any;
  export const setDoc: any;
  export const getDoc: any;
  export const getDocs: any;
  export const addDoc: any;
  export const updateDoc: any;
  export const deleteDoc: any;
  export const onSnapshot: any;
  export const query: any;
  export const orderBy: any;
  export const serverTimestamp: any;
  export type Firestore = any;
}

