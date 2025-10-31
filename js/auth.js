import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import { auth } from "./firebase.js";

// Email Login
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

// Create Account
document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully!");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

// Google Login
document.getElementById("googleLoginBtn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    alert("Google login successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});
