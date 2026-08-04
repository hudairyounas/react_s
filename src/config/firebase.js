import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDSjGKe1zsDEWtfpqotd0SdViB6Zr-mwrw",
    authDomain: "fp-b2-a8c91.firebaseapp.com",
    projectId: "fp-b2-a8c91",
    storageBucket: "fp-b2-a8c91.firebasestorage.app",
    messagingSenderId: "901032874844",
    appId: "1:901032874844:web:372e3a3183e94dcf6de799",
    measurementId: "G-H1ZK547STK"
};
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);



