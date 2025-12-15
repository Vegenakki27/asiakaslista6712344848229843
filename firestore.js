// 🔹 Firebase SDK:t CDN:stä (PAKOLLINEN GitHub Pagesissa)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔹 SINUN FIREBASE CONFIG (sellaisenaan)
const firebaseConfig = {
  apiKey: "AIzaSyDxe19JvYyhtVfplp3A5DPNmxmojBX0LlU",
  authDomain: "lista1-517d0.firebaseapp.com",
  projectId: "lista1-517d0",
  storageBucket: "lista1-517d0.firebasestorage.app",
  messagingSenderId: "387301231524",
  appId: "1:387301231524:web:5f9faa071c51c5b9a1cf31"
};

// 🔹 Alusta Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Firestore-instanssi
const db = getFirestore(app);

// 🔹 HTML-elementit (testiä varten)
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const output = document.getElementById("output");

// 🔹 Tallenna testidata Firestoreen
saveBtn.addEventListener("click", async () => {
  try {
    await addDoc(collection(db, "test"), {
      message: "Firestore toimii!",
      createdAt: serverTimestamp()
    });
    output.textContent = "Tallennus onnistui ✅";
  } catch (err) {
    output.textContent = "Virhe tallennuksessa ❌\n" + err;
  }
});

// 🔹 Lataa data Firestoresta
loadBtn.addEventListener("click", async () => {
  output.textContent = "";
  const snapshot = await getDocs(collection(db, "test"));

  snapshot.forEach(doc => {
    output.textContent += JSON.stringify(doc.data(), null, 2) + "\n\n";
  });
});
