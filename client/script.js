
async function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    alert(data.message || data.error);
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
        alert('Hoş geldin, ' + data.user.email + '! Kredin: ' + data.user.credits);
        window.location.href = '/index.html'; // Gerçek sisteme yönlendirme burada yapılacak
    } else {
        alert(data.error);
    }
}
