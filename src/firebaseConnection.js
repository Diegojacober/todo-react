import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCF1E4XnYZ9m4M9jeVxU_niATGv6PgGspI",
    authDomain: "curso-udemy-cc0c3.firebaseapp.com",
    projectId: "curso-udemy-cc0c3",
    storageBucket: "curso-udemy-cc0c3.appspot.com",
    messagingSenderId: "66074919232",
    appId: "1:66074919232:web:d637736e0f037fa23ffaa5",
    measurementId: "G-H33EC0BEFB"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth()


export { db, auth }