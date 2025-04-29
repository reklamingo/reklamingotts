
async function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    alert(data.message);
}

async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (res.ok) {
        const data = await res.json();
        alert(`Hoş geldin, ${data.email}! Kredin: ${data.kredi}`);
        window.location.href = "uygulama.html";
    } else {
        const err = await res.json();
        alert(err.message || "Giriş başarısız.");
    }
}

async function useCode() {
    const code = document.getElementById("kredi-kodu").value;

    const res = await fetch("/use-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
    });

    const data = await res.json();
    alert(data.message);
}
