const LOGIN_PASSWORD = "1234";

document.getElementById("loginBtn").addEventListener("click", () => {
  const input = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (input === LOGIN_PASSWORD) {
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    error.textContent = "Väärä salasana";
  }
});
