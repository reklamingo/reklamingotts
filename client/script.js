
document.getElementById("text-input").addEventListener("input", () => {
    const text = document.getElementById("text-input").value;
    document.getElementById("char-count").innerText = text.length + " / 250 karakter";
});

document.getElementById("speak-button").addEventListener("click", () => {
    const text = document.getElementById("text-input").value;
    const voice = document.getElementById("voice-select").value;
    alert("Seslendirilecek: " + text + "\nSes: " + voice);
});

function logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
