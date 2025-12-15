// login.js
function login() {
  const pass = document.getElementById("passwordInput").value;
  if (pass === "1234") {
    <script>
  window.location.href = "login.html";
</script>
  } else {
    document.getElementById("error").textContent = "Väärä salasana";
  }
}
