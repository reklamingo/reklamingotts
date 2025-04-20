
const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const speakBtn = document.getElementById("speak-button");
const downloadBtn = document.getElementById("download-button");
const audioPlayer = document.getElementById("audio-player");

textInput.addEventListener("input", () => {
  charCount.innerText = textInput.value.length + " / 500 karakter";
});

speakBtn.addEventListener("click", async () => {
  const text = textInput.value;
  const voice = document.getElementById("voice-select").value;
  if (!text) return;
  speakBtn.classList.remove("glow");

  const res = await fetch("/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice }),
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  audioPlayer.src = url;
  audioPlayer.style.display = "block";
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
