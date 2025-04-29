// Login Sayfası
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('error');

    try {
      const response = await fetch('https://your-backend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/user.html';
      } else {
        errorEl.textContent = data.message || 'Giriş başarısız';
      }
    } catch (err) {
      errorEl.textContent = 'Bir hata oluştu';
    }
  });
}

// Kullanıcı Sayfası
if (document.getElementById('userEmail')) {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/';
    return;
  }

  fetch('https://your-backend.onrender.com/api/user', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(data => {
      if (data.email) {
        document.getElementById('userEmail').textContent = data.email;
      } else {
        window.location.href = '/';
      }
    })
    .catch(() => {
      window.location.href = '/';
    });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  });
}