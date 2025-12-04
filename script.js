const pianokeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-checkbox input");
const keysDisplay = document.querySelector(".showKeys span");

let allKeys = [];
const audioFiles = {};

pianokeys.forEach((keyEl) => {
  const key = keyEl.dataset.key;
  allKeys.push(key);
  audioFiles[key] = new Audio(`tunes/${key}.wav`);
});

let clearTextTimer;

const playTune = (key) => {
  if (!allKeys.includes(key)) return;

  const audio = audioFiles[key];
  audio.currentTime = 0;
  audio.volume = volumeSlider.value / 100;
  audio.play().catch(() => {});

  const clickedKey = document.querySelector(
    `.piano-keys .key[data-key="${key}"]`
  );
  if (clickedKey) {
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
  }

  clearTimeout(clearTextTimer);
  keysDisplay.textContent = key;

  clearTextTimer = setTimeout(() => {
    keysDisplay.textContent = "";
  }, 1000);
};

pianokeys.forEach((keyEl) => {
  const key = keyEl.dataset.key;
  keyEl.addEventListener("click", () => playTune(key));
});

const toggleKeyDisplay = () => {
  pianokeys.forEach((key) => key.classList.toggle("hide"));
};

const handleVolume = (e) => {
  Object.values(audioFiles).forEach((audio) => {
    audio.volume = e.target.value / 100;
  });
};

const pressedKey = (e) => {
  const key = e.key.toLowerCase();
  playTune(key);
};

keysCheckbox.addEventListener("click", toggleKeyDisplay);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

keysDisplay.textContent = "";
