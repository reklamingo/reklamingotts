
const maxChars = 500;

async function speakText() {
  const speakBtn = document.getElementById('speakBtn');
  speakBtn.classList.remove('glow');

  const text = document.getElementById('textInput').value;
  const voice = document.getElementById('voiceSelect').value;

  if (text.length > maxChars) {
    alert("Maksimum 500 karakter girebilirsiniz.");
    return;
  }

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
  const remaining = maxChars - count;
  document.getElementById('charCount').innerText = `${count} / ${maxChars} karakter`;
  if (count > maxChars) {
    this.value = this.value.substring(0, maxChars);
  }
});

window.onload = () => {
  document.getElementById('speakBtn').classList.add('glow');
};
