import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC2m1JpCg-Sr-pqXFi0MMtg6xufoTapNDw",
  authDomain: "afrobank-api.firebaseapp.com",
  projectId: "afrobank-api",
  storageBucket: "afrobank-api.firebasestorage.app",
  messagingSenderId: "708439992749",
  appId: "1:708439992749:web:a833a769b0f12cf53a5924",
  measurementId: "G-FC4W7GYSWG"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };
