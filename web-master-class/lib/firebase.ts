import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCQSco8jRHONMJexeTqfdpv7_VzvoWFpr8",
  authDomain: "test-8cbc3.firebaseapp.com",
  projectId: "test-8cbc3",
  storageBucket: "test-8cbc3.firebasestorage.app",
  messagingSenderId: "717613632012",
  appId: "1:717613632012:web:657720345376f07f5b3c29",
  measurementId: "G-8FK3G00SGD"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
