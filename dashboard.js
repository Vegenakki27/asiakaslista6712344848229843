let users = JSON.parse(localStorage.getItem("users") || "[]");

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");

function render() {
  const filter = searchInput.value.toLowerCase();
  tableBody.innerHTML = "";

  users
    .filter(
      u =>
        u.name.toLowerCase().includes(filter) ||
        u.password.toLowerCase().includes(filter)
    )
    .forEach(u => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${u.name}</td><td>${u.password}</td>`;
      tableBody.appendChild(row);
    });
}

function openModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function generatePassword() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) return;

  const password = Math.random().toString(36).substring(2, 8);
  users.push({ name, password });
  localStorage.setItem("users", JSON.stringify(users));

  closeModal();
  render();
}

searchInput.addEventListener("input", render);
render();
