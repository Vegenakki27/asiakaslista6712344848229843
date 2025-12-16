import { db } from "./firestore.js";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const list = document.getElementById("list");
const nameInput = document.getElementById("nameInput");
const search = document.getElementById("search");
const generateBtn = document.getElementById("generateBtn");

let deleteTargetId = null;

// Salasanan generointi
function generatePassword() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Lisää uusi lippu
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

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${data.name}</td>
      <td>${data.password}</td>
      <td class="icon use" data-id="${docSnap.id}">✔</td>
      <td class="icon delete" data-id="${docSnap.id}">🗑</td>
    `;

    list.appendChild(tr);
  });
});


// Klikit (käytä / poista)
list.addEventListener("click", e => {
  if (!e.target.dataset.id) return;

  if (e.target.classList.contains("use") ||
      e.target.classList.contains("delete")) {
    openConfirm(e.target.dataset.id);
  }
});


// Haku
search.addEventListener("input", () => {
  const term = search.value.toLowerCase();
  [...list.children].forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(term)
      ? ""
      : "none";
  });
});

// Modal
function openConfirm(id) {
  deleteTargetId = id;
  document.getElementById("confirmModal").classList.add("show");
}

document.getElementById("cancelBtn").addEventListener("click", () => {
  deleteTargetId = null;
  document.getElementById("confirmModal").classList.remove("show");
});

document.getElementById("confirmBtn").addEventListener("click", async () => {
  if (!deleteTargetId) return;

  await deleteDoc(doc(db, "tickets", deleteTargetId));

  deleteTargetId = null;
  document.getElementById("confirmModal").classList.remove("show");
});
