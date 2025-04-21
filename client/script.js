
const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const speakBtn = document.getElementById("speak-button");
const downloadBtn = document.getElementById("download-button");
const audioPlayer = document.getElementById("audio-player");
const playerWrapper = document.querySelector(".player-wrapper");

textInput.addEventListener("input", () => {
  const textLength = textInput.value.length;
  charCount.innerText = textLength + " / 250 karakter";
  if (textLength > 250) {
    textInput.value = textInput.value.substring(0, 250);
    charCount.innerText = "250 / 250 karakter";
  }
});

speakBtn.addEventListener("click", async () => {
  const text = textInput.value;
  const voiceValue = document.getElementById("voice-select").value;

  if (!text || !voiceValue) {
    alert("Lütfen hem metin hem de ses seçin.");
    return;
  }

  speakBtn.classList.remove("glow");

  const [languageCode, name] = voiceValue.split("|");
  const res = await fetch("/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice: { languageCode, name } }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    alert(errorData.message || "Bir hata oluştu.");
    return;
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  audioPlayer.src = url;
  playerWrapper.style.display = "flex";
  playerWrapper.style.justifyContent = "center";
  audioPlayer.play();
  downloadBtn.dataset.url = url;
});

downloadBtn.addEventListener("click", () => {
  const url = downloadBtn.dataset.url;
  const filename = prompt("Dosya ismi:", "ringo-ses.mp3") || "ringo.mp3";
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
});
