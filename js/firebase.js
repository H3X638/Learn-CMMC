// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
	getAuth,
	onAuthStateChanged,
	signOut,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
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

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- Authentication Utilities ---
export const requireAuth = (redirect = "index.html") => {
	onAuthStateChanged(auth, (user) => {
		if (!user) {
			console.warn("Unauthorized access — redirecting.");
			window.location.href = redirect;
		}
	});
};

export const getUser = (callback) => {
	onAuthStateChanged(auth, (user) => callback(user));
};

export const logout = async () => {
	try {
		await signOut(auth);
		window.location.href = "index.html";
	} catch (err) {
		console.error("Logout error:", err);
	}
};

// --- Email/Password Login ---
export const signInWithEmail = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
};

// --- Register New User ---
export const signUpWithEmail = async (email, password, name) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		if (name) {
			await updateProfile(userCredential.user, { displayName: name });
		}
		return userCredential.user;
	} catch (error) {
		throw error;
	}
};

// --- Google Sign-In ---
export const signInWithGoogle = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		return result.user;
	} catch (error) {
		throw error;
	}
};

// --- Export Auth for reuse ---
export { auth };