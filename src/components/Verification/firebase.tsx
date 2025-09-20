// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBer07BXqwyDfc8sO2vRO6KLP9qbS-Vq90",
  authDomain: "pending-1d1c5.firebaseapp.com",
  projectId: "pending-1d1c5",
  storageBucket: "pending-1d1c5.firebasestorage.app",
  messagingSenderId: "698374952219",
  appId: "1:698374952219:web:e5c7bf97e81a5f06aa2fbe",
  measurementId: "G-Q8N7PBG7D5"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const analytics = getAnalytics(app);

auth.useDeviceLanguage()

export { auth, analytics, RecaptchaVerifier, signInWithPhoneNumber };
