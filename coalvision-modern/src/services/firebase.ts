import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBZbkbWTlYtScXenDL9n-CgYSNluFtRf9E",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dataadd-8cf4f.firebaseapp.com",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://dataadd-8cf4f-default-rtdb.firebaseio.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dataadd-8cf4f",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dataadd-8cf4f.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "163416489588",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:163416489588:web:d786217186f5e6ebe01b21",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-W8YZ1PKF5X"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;
