
async function register() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  alert(data.message || "Kayıt tamamlandı.");
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.karakter !== undefined) {
    alert(`Hoş geldin, ${data.email}! Kredin: ${data.karakter}`);
    window.location.href = "ringo.html";
  } else {
    alert(data.message || "Giriş başarısız.");
  }
}

async function applyCode() {
  const code = document.getElementById("code-input").value;
  const email = document.getElementById("login-email").value;
  const res = await fetch("/apply-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code })
  });
  const data = await res.json();
  alert(data.message || "Kod uygulandı.");
}
