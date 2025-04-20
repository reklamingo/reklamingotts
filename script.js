
async function speakText() {
  const text = document.getElementById('textInput').value;
  const voice = document.getElementById('voiceSelect').value;

  const response = await fetch('/speak', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice })
  });

  const data = await response.json();

  if (data.audioContent) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = 'data:audio/mp3;base64,' + data.audioContent;
    audioPlayer.play();
  } else {
    alert("Ses oluşturulamadı.");
  }
}

function downloadAudio() {
  const audio = document.getElementById('audioPlayer');
  const a = document.createElement('a');
  a.href = audio.src;
  a.download = 'ses.mp3';
  a.click();
}

document.getElementById('textInput').addEventListener('input', function () {
  const count = this.value.length;
  document.getElementById('charCount').innerText = `${count} karakter`;
});
