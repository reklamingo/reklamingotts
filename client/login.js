function register() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  if (!email || !password) return alert("Lütfen tüm alanları doldurun.");
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email]) return alert("Bu e-posta zaten kayıtlı.");
  users[email] = { password: password, credit: 250 };
  localStorage.setItem("users", JSON.stringify(users));
  alert("Kayıt başarılı!");
}

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const user = users[email];
  if (!user || user.password !== password) return alert("Hatalı giriş.");
  localStorage.setItem("currentUser", email);
  alert("Hoş geldin, " + email + "! Kredin: " + user.credit);
  window.location.href = "index.html?email=" + email;
}

function applyCode() {
  const code = document.getElementById("code-input").value.trim();
  const email = localStorage.getItem("currentUser");
  if (!email) return alert("Lütfen önce giriş yapın.");
  if (code !== "REKLAMINGO10K") return alert("Geçersiz kod.");
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  users[email].credit = (users[email].credit || 0) + 10000;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Kredi yüklendi. Yeni kredi: " + users[email].credit);
}
