// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBymixunzlYK8rpMQlYzezZeUsYckn2qjg",
  authDomain: "cmmc-39068.firebaseapp.com",
  projectId: "cmmc-39068",
  storageBucket: "cmmc-39068.firebasestorage.app",
  messagingSenderId: "463614445459",
  appId: "1:463614445459:web:1f56faebeafd5cce6a0a66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ensure user is logged in
export const requireAuth = (redirect = "index.html") => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.warn("Unauthorized access — redirecting.");
      window.location.href = redirect;
    }
  });
};

// Get current user
export const getUser = (callback) => {
  onAuthStateChanged(auth, (user) => callback(user));
};

// Sign out
export const logout = async () => {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (err) {
    console.error("Logout error:", err);
  }
};

// Export auth for other scripts
export { auth };
