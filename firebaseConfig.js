import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgseE-fFN7kG4KJnxt2T6ocftB1Dax3rA",
    authDomain: "info-61320-lab03.firebaseapp.com",
    projectId: "info-61320-lab03",
    storageBucket: "info-61320-lab03.firebasestorage.app",
    messagingSenderId: "90278057440",
    appId: "1:90278057440:web:406f1af365d3315eee0785"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db };
