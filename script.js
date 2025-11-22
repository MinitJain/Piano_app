const pianokeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-checkbox input");
const keysDisplay = document.querySelector(".showKeys span");

let allKeys = [];
let audio = new Audio("tunes/a.wav");

const playTune = (key) => {
  if (!allKeys.includes(key)) return;

  audio.src = `tunes/${key}.wav`;
  audio.currentTime = 0;
  audio.play().catch(() => {});

  const clickedKey = document.querySelector(
    `.piano-keys .key[data-key="${key}"]`
  );
  if (clickedKey) {
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
  }

  keysDisplay.textContent = key;
};

pianokeys.forEach((keyEl) => {
  const key = keyEl.dataset.key;
  allKeys.push(key);
  keyEl.addEventListener("click", () => playTune(key));
});

const toggleKeyDisplay = () => {
  pianokeys.forEach((key) => key.classList.toggle("hide"));
};

const handleVolume = (e) => {
  audio.volume = e.target.value / 100;
};

const pressedKey = (e) => {
  const key = e.key.toLowerCase();
  playTune(key);
};

keysCheckbox.addEventListener("click", toggleKeyDisplay);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

keysDisplay.textContent = "";
