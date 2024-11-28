
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0hM5hfd3VZLw6cW7HSvfb7MjEP-lBvTM",
  authDomain: "docker-proj-65040.firebaseapp.com",
  projectId: "docker-proj-65040",
  storageBucket: "docker-proj-65040.appspot.com",
  messagingSenderId: "139119354465",
  appId: "1:139119354465:web:b6d5aa7dab0240407c8020",
  measurementId: "G-8ZR5SGK9LX"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
