function register() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  fetch("/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(() => alert("Kayıt sırasında bir hata oluştu"));
}

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  fetch("/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      alert(`Hoş geldin, ${email}! Kredin: ${data.credits}`);
      window.location.href = "tts.html?email=" + encodeURIComponent(email);
    } else {
      alert(data.message);
    }
  })
  .catch(() => alert("Giriş sırasında bir hata oluştu"));
}
