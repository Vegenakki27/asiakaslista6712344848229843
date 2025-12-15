// login.js
function login() {
  const pass = document.getElementById("passwordInput").value;
  if (pass === "1234") {
    window.location.href = "dashboard.html"; // vanha index.html
  } else {
    document.getElementById("error").textContent = "Väärä salasana";
  }
}
