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
  keyEl.addEventListener("click", () => playTune(key));
});

let clearTextTimer;

const playTune = (key) => {
  if (!allKeys.includes(key)) return;

  const audio = audioFiles[key];
  if (!audio) return;

  audio.currentTime = 0;
  audio.volume = Number(volumeSlider.value) / 100;
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

const toggleKeyDisplay = () => {
  pianokeys.forEach((el) => el.classList.toggle("hide"));
};

const handleVolume = (e) => {
  const v = Number(e.target.value) / 100;
  Object.values(audioFiles).forEach((audio) => {
    audio.volume = v;
  });
};

const pressedKey = (e) => {
  const key = e.key.toLowerCase();
  playTune(key);
};

keysCheckbox.addEventListener("change", toggleKeyDisplay);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

keysDisplay.textContent = "";
