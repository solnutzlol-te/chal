/**
 * Firebase Configuration
 * 
 * Šis fails inicializē Firebase savienojumu, izmantojot hardcoded konfigurāciju.
 * 
 * HARDCODED CONFIG:
 * Šajā projektā Firebase konfigurācija ir tieši kodam iekļauta, nevis no environment variables.
 * Tas ir vienkāršāks veids development vidē.
 * 
 * PRODUCTION WARNING:
 * Production vidē ieteicams izmantot environment variables, bet Firebase API keys
 * ir public-safe (var būt redzamas client-side kodā).
 * 
 * Lietošana:
 * ```tsx
 * import { db, storage } from '@/lib/firebase-config';
 * ```
 */

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

/**
 * Firebase konfigurācija (Hardcoded)
 * 
 * 🔥 IEVIETO SAVAS FIREBASE CREDENTIALS ŠEIT:
 */
const firebaseConfig = {
  apiKey: "AIzaSyATitUIvzSkMrQMMnxiGDH9N4wLS6QDAfc",
  authDomain: "chalkies-memes.firebaseapp.com",
  projectId: "chalkies-memes",
  storageBucket: "chalkies-memes.firebasestorage.app",
  messagingSenderId: "689765838188",
  appId: "1:689765838188:web:d86e5a21e2b4946d855749",
  measurementId: "G-TDBZ90RD1T"
};

/**
 * Pārbauda, vai visas nepieciešamās Firebase config vērtības ir iestatītas
 */
const isFirebaseConfigured = () => {
  return !!firebaseConfig.apiKey && 
         !!firebaseConfig.projectId && 
         !!firebaseConfig.storageBucket;
};

/**
 * Inicializē Firebase app
 * Ja config nav iestatīts, atgriež null (Firebase features būs disabled)
 */
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

try {
  if (isFirebaseConfigured()) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('✅ Firebase initialized successfully');
    console.log('📊 Project ID:', firebaseConfig.projectId);
  } else {
    console.warn('⚠️ Firebase not configured. Firebase features will be disabled.');
    console.warn('📝 Please add Firebase config values to src/lib/firebase-config.ts');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.error('📝 Check if you have enabled Firestore and Storage in Firebase Console');
}

export { app, db, storage, isFirebaseConfigured };
