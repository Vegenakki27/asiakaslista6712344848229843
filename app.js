import { db } from "./firestore.js";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const list = document.getElementById("list");
const nameInput = document.getElementById("nameInput");
const search = document.getElementById("search");
const generateBtn = document.getElementById("generateBtn");

let activeId = null;

// Salasanan generointi
function generatePassword() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Luo uusi lippu
generateBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  if (!name) return;

  await addDoc(collection(db, "tickets"), {
    name,
    password: generatePassword(),
    used: false,
    createdAt: serverTimestamp()
  });

  nameInput.value = "";
});

// Kuuntele Firestorea
onSnapshot(collection(db, "tickets"), snapshot => {
  list.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    const tr = document.createElement("tr");
    if (data.used) tr.classList.add("used");

    const statusCell = document.createElement("td");
    if (data.used) {
      statusCell.textContent = "Käytetty";
      statusCell.className = "used-text";
    } else {
      statusCell.textContent = "✔";
      statusCell.className = "use";
      statusCell.dataset.id = docSnap.id;
    }

    tr.innerHTML = `
      <td>${data.name}</td>
      <td>${data.password}</td>
    `;

    tr.appendChild(statusCell);
    list.appendChild(tr);
  });
});

// Klikki "käytä"
list.addEventListener("click", e => {
  if (!e.target.dataset.id) return;

  activeId = e.target.dataset.id;
  document.getElementById("confirmModal").classList.add("show");
});

// Modal napit
document.getElementById("cancelBtn").addEventListener("click", () => {
  activeId = null;
  document.getElementById("confirmModal").classList.remove("show");
});

document.getElementById("confirmBtn").addEventListener("click", async () => {
  if (!activeId) return;

  await updateDoc(doc(db, "tickets", activeId), {
    used: true
  });

  activeId = null;
  document.getElementById("confirmModal").classList.remove("show");
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
