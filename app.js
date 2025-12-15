import { db, collection, addDoc, onSnapshot, serverTimestamp } from "./firestore.js";

const list = document.getElementById("list");
const nameInput = document.getElementById("nameInput");
const search = document.getElementById("search");

function generatePassword() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

document.getElementById("generateBtn").addEventListener("click", async () => {
  const name = nameInput.value.trim();
  if (!name) return;

  await addDoc(collection(db, "tickets"), {
    name,
    password: generatePassword(),
    createdAt: serverTimestamp()
  });

  nameInput.value = "";
});

onSnapshot(collection(db, "tickets"), snapshot => {
  list.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${data.name}</td><td>${data.password}</td>`;
    list.appendChild(tr);
  });
});

search.addEventListener("input", () => {
  const term = search.value.toLowerCase();
  [...list.children].forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(term)
      ? ""
      : "none";
  });
});
