import { db } from "./firestore.js";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const list = document.getElementById("list");
const nameInput = document.getElementById("nameInput");
const search = document.getElementById("search");
const generateBtn = document.getElementById("generateBtn");

// Salasanan generointi
function generatePassword() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Lisää Firestoreen
generateBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  if (!name) return;

  await addDoc(collection(db, "tickets"), {
    name,
    password: generatePassword(),
    createdAt: serverTimestamp()
  });

  nameInput.value = "";
});

// Reaaliaikainen lista
onSnapshot(collection(db, "tickets"), snapshot => {
  list.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${data.name}</td><td>${data.password}</td>`;
    list.appendChild(tr);
  });
});

// Haku
search.addEventListener("input", () => {
  const term = search.value.toLowerCase();
  [...list.children].forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(term)
      ? ""
      : "none";
  });
}
);