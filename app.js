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

function generatePassword() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

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

onSnapshot(collection(db, "tickets"), snapshot => {
  list.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    const tr = document.createElement("tr");
    if (data.used) tr.classList.add("used");

    const nameTd = document.createElement("td");
    nameTd.textContent = data.name;

    const passTd = document.createElement("td");
    passTd.textContent = data.password;

    const statusTd = document.createElement("td");
    if (data.used) {
      statusTd.textContent = "Käytetty!";
      statusTd.className = "used-text";
    } else {
      statusTd.textContent = "Käyttämätön";
      statusTd.className = "use";
      statusTd.dataset.id = docSnap.id;
    }

    tr.appendChild(nameTd);
    tr.appendChild(passTd);
    tr.appendChild(statusTd);

    list.appendChild(tr);
  });
});

list.addEventListener("click", e => {
  if (!e.target.dataset.id) return;

  activeId = e.target.dataset.id;
  document.getElementById("confirmModal").classList.add("show");
});

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

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  [...list.children].forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(value)
      ? ""
      : "none";
  });
});
