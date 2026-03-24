import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

export async function registerUser(email, password, profileData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      name: profileData.name || "Nuovo Utente",
      emoji: profileData.emoji || "🦁",
      pin: profileData.pin || "123456",
      createdAt: new Date().toISOString()
    });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), { lastLogin: new Date().toISOString() }, { merge: true });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function logoutUser() {
  await signOut(auth);
  sessionStorage.removeItem('cf_logged');
  return { success: true };
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, async (user) => {
    // 1. Check for Cloud User
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      const profile = docSnap.exists() ? docSnap.data() : { name: "Il Capo", emoji: "🦁" };
      localStorage.setItem('cf_profile', JSON.stringify(profile));
      callback(user, profile);
      return;
    }

    // 2. Check for Local PIN Session (Bypass for preview)
    const isLocalAuth = sessionStorage.getItem('cf_logged') === '1';
    if (isLocalAuth) {
      const profile = JSON.parse(localStorage.getItem('cf_profile') || '{"name":"Il Capo","emoji":"🦁"}');
      callback(null, profile);
    } else {
      callback(null, null);
    }
  });
}
