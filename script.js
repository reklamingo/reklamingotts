
function speakText() {
  const text = document.getElementById('text-input').value;
  if (!text) return alert("Lütfen bir metin girin.");
  fetch('/speak', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text })
  })
  .then(res => res.blob())
  .then(blob => {
    const audioURL = URL.createObjectURL(blob);
    const player = document.getElementById('audio-player');
    player.src = audioURL;
    player.style.display = 'block';
    player.play();
  });
}
function downloadAudio() {
  const text = document.getElementById('text-input').value;
  if (!text) return alert("Lütfen bir metin girin.");
  fetch('/speak', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text })
  })
  .then(res => res.blob())
  .then(blob => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ringo.mp3';
    link.click();
  });
}
document.getElementById('text-input').addEventListener('input', function () {
  document.getElementById('char-count').textContent = this.value.length + " karakter";
});
