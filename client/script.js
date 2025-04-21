const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const speakBtn = document.getElementById("speak-button");
const downloadBtn = document.getElementById("download-button");
const audioPlayer = document.getElementById("audio-player");
const voiceSelect = document.getElementById("voice-select");

textInput.addEventListener("input", () => {
  const len = textInput.value.length;
  charCount.innerText = `${len} / 250 karakter`;
  textInput.value = textInput.value.slice(0, 250);
});

speakBtn.addEventListener("click", async () => {
  const text = textInput.value;
  const voice = voiceSelect.value;
  if (!text || !voice) return;
  speakBtn.classList.remove("glow");
  try {
    const res = await fetch("/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice }),
    });
    if (!res.ok) throw new Error("Sunucu hatası");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    audioPlayer.src = url;
    audioPlayer.style.display = "block";
    audioPlayer.play();
    downloadBtn.dataset.url = url;
  } catch (err) {
    alert("Hata: " + err.message);
  }
});

downloadBtn.addEventListener("click", () => {
  const url = downloadBtn.dataset.url;
  const filename = prompt("Dosya ismi:", "ringo.mp3") || "ringo.mp3";
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
});