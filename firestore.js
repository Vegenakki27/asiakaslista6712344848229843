import { initializeApp } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxe19JvYyhtVfplp3A5DPNmxmojBX0LlU",
  authDomain: "lista1-517d0.firebaseapp.com",
  projectId: "lista1-517d0",
  storageBucket: "lista1-517d0.appspot.com",
  messagingSenderId: "387301231524",
  appId: "1:387301231524:web:5f9faa071c51c5b9a1cf31"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
