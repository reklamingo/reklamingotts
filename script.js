const textInput = document.getElementById("text-input");
const speakButton = document.getElementById("speak-button");
const downloadButton = document.getElementById("download-button");
const voiceSelect = document.getElementById("voice-select");
const audioPlayer = document.getElementById("audio-player");
const charCount = document.getElementById("char-count");

textInput.addEventListener("input", () => {
  charCount.textContent = textInput.value.length;
});

speakButton.addEventListener("click", async () => {
  const text = textInput.value;
  const voice = voiceSelect.value;
  if (!text) return;

  speakButton.classList.remove("glow");

  const response = await fetch("/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice })
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  audioPlayer.src = url;
  audioPlayer.style.display = "inline-block";
  audioPlayer.play();
  downloadButton.dataset.url = url;
});

downloadButton.addEventListener("click", () => {
  const url = downloadButton.dataset.url;
  if (!url) return;
  const filename = prompt("Dosya ismi girin:", "ringo-ses.mp3") || "ringo-ses.mp3";
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
});
