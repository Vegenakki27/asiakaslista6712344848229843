import { db } from "./firestore.js";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Login
document.getElementById("loginBtn").onclick = () => {
  if (document.getElementById("adminPass").value === "1234") {
    document.getElementById("loginOverlay").classList.remove("show");
  }
};

// Luo lippu
document.getElementById("createBtn").onclick = async () => {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) return;

  await addDoc(collection(db, "tickets"), {
    name,
    password: Math.random().toString(36).substring(2,8).toUpperCase(),
    used: false,
    createdAt: serverTimestamp()
  });

  document.getElementById("nameInput").value = "";
};

// Loki
onSnapshot(collection(db, "tickets"), snap => {
  const log = document.getElementById("log");
  log.innerHTML = "";

  snap.forEach(d => {
    const t = d.data().createdAt?.toDate();
    log.innerHTML += `
      <div>
        ${d.data().name} —
        ${t ? t.toLocaleString() : ""}
      </div>
    `;
  });
});
