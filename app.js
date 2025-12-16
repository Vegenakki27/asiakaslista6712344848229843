import { db } from "./firestore.js";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc
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

  snapshot.forEach(d => {
    const data = d.data();
    const tr = document.createElement("tr");
    tr.className = data.used ? "used" : "";

    tr.innerHTML = `
      <td>${data.name}</td>
      <td>${data.password}</td>
      <td class="icon use ${data.used ? "disabled" : ""}"
          data-id="${d.id}">✔</td>
    `;

    list.appendChild(tr);
  });
});

list.addEventListener("click", e => {
  if (!e.target.dataset.id) return;
  if (e.target.classList.contains("disabled")) return;

  activeId = e.target.dataset.id;
  document.getElementById("confirmModal").classList.add("show");
});

document.getElementById("cancelBtn").onclick = () => {
  activeId = null;
  document.getElementById("confirmModal").classList.remove("show");
};

document.getElementById("confirmBtn").onclick = async () => {
  if (!activeId) return;

  await updateDoc(doc(db, "tickets", activeId), {
    used: true
  });

  activeId = null;
  document.getElementById("confirmModal").classList.remove("show");
};

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  [...list.children].forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(value)
      ? ""
      : "none";
  });
});
