import { db } from "./firestore.js";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const list = document.getElementById("list");
const search = document.getElementById("search");
let activeId = null;

onSnapshot(collection(db, "tickets"), snap => {
  list.innerHTML = "";

  snap.forEach(d => {
    const data = d.data();
    const tr = document.createElement("tr");
    if (data.used) tr.classList.add("used");

    tr.innerHTML = `
      <div>${data.name}</div>
      <div>${data.password}</div>
      <div class="use" data-id="${data.used ? "" : d.id}">
        ${data.used ? "Käytetty" : "✔ Käytä"}
      </div>
    `;

    list.appendChild(tr);
  });
});

list.onclick = e => {
  if (!e.target.dataset.id) return;
  activeId = e.target.dataset.id;
  document.getElementById("confirmModal").classList.add("show");
};

document.getElementById("cancelBtn").onclick = () =>
  document.getElementById("confirmModal").classList.remove("show");

document.getElementById("confirmBtn").onclick = async () => {
  await updateDoc(doc(db, "tickets", activeId), { used: true });
  document.getElementById("confirmModal").classList.remove("show");
};

search.oninput = () => {
  const v = search.value.toLowerCase();
  [...list.children].forEach(r =>
    r.style.display = r.textContent.toLowerCase().includes(v) ? "" : "none"
  );
};
