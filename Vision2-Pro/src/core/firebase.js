import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// The user should provide/verify these keys in the settings page.
// These are currently placeholders or copied from the previous session.
const firebaseConfig = {
  apiKey: "AIzaSy...", // Placeholder, will be synced from legacy config if available
  authDomain: "content-factory-agenti.firebaseapp.com",
  projectId: "content-factory-agenti",
  storageBucket: "content-factory-agenti.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
