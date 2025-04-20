function speakText() {
  const text = document.getElementById("textInput").value;
  const loader = document.getElementById("loading");
  loader.classList.remove("hidden");

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "tr-TR";
  speechSynthesis.speak(utterance);

  utterance.onend = () => {
    loader.classList.add("hidden");
  };
}

function downloadAudio() {
  alert("Demo sürümde ses indirilemez.");
}
