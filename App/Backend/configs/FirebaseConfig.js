// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOOvZwp-Nx8Mp9l3ld9XWsGqRtyqepvHg",
  authDomain: "collegebuddy-f9b56.firebaseapp.com",
  projectId: "collegebuddy-f9b56",
  storageBucket: "collegebuddy-f9b56.appspot.com",
  messagingSenderId: "1049640210168",
  appId: "1:1049640210168:web:e86325f2117214c1b0350d",
  measurementId: "G-ZDG29MDTVZ"
};

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '1049640210168-n4lkotv45nq8b3ju845cc9gif4srk47u.apps.googleusercontent.com', // From Firebase console
  offlineAccess: true, // If you want to access Google API
});

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

