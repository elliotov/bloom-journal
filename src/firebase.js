import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCc-qKV08nZ8wOmXyk4vfecBVpKBMPHKhE",
    authDomain: "bloom-journal-12187.firebaseapp.com",
    projectId: "bloom-journal-12187",
    storageBucket: "bloom-journal-12187.firebasestorage.app",
    messagingSenderId: "631968089272",
    appId: "1:631968089272:web:580ff1b6588043fb65204d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
