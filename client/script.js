
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.error) {
      window.location.href = "/uygulama.html";
    } else {
      alert(data.message);
    }
  });
}

function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => alert(data.message));
}

function showRegister() {
  document.getElementById("register-section").style.display = "block";
}
