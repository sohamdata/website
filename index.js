const images = [];

const songs = [
  {
    name: "Closer2",
    file: "assets/music/closer2.aac",
    bpm: 170.5,
  },
  {
    name: "Peaked",
    file: "assets/music/peaked.aac",
    bpm: 195,
  },
  {
    name: "Ego",
    file: "assets/music/ego.aac",
    bpm: 128,
  },
  {
    name: "Sci-Fi",
    file: "assets/music/scifi.aac",
    bpm: 94,
  },
  {
    name: "StartEnd",
    file: "assets/music/startend.aac",
    bpm: 148,
  },
  {
    name: "Icarus",
    file: "assets/music/icarus.aac",
    bpm: 134,
  },
  {
    name: "TomTom",
    file: "assets/music/tomtom.aac",
    bpm: 136,
  },
  {
    name: "twenty24",
    file: "assets/music/twenty24.aac",
    bpm: 75,
  },
];

let randomIndex = localStorage.getItem("audioIndex");
if (randomIndex === null) {
  randomIndex = Math.floor(Math.random() * songs.length);
  localStorage.setItem("audioIndex", randomIndex);
} else {
  randomIndex = (parseInt(randomIndex) + 1) % songs.length;
  localStorage.setItem("audioIndex", randomIndex);
}

const selectedSong = songs[randomIndex];
const audio = new Audio(selectedSong.file);
audio.volume = 0.3;
console.log(`current song: ${selectedSong.name} (${selectedSong.bpm} bpm)`);

window.onload = () => {
  console.log("loaded");
  console.log("move mouse or tap to play if on mobile");

  document.body.addEventListener("mousedown", () => audio.play());
};

for (let i = 1; i <= 18; i++) {
  const image = document.getElementById(`i${i}`);
  image.complete
    ? load(image, i)
    : image.addEventListener("load", () => load(image, i));
}

function load(image, index) {
  images.push(image);
  if (images.length === 1) image.style.display = "block";
}

// if (window.matchMedia('(pointer: coarse)').matches) {
if (1 === 1) {
  let currentIndex = 0;
  setInterval(() => {
    if (images.length === 0) return;
    images[currentIndex].style.display = "none";
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.display = "block";
  }, 60000 / selectedSong.bpm);
} else {
  let lastUpdate = Date.now();
  let lastX = -1;
  let lastY = -1;
  let counterValue = 10;
  let counter = counterValue;
  let currentIndex = 0;

  window.addEventListener("mousemove", (event) => {
    if (images.length === 0) return;
    if (lastX === -1 || lastY === -1) {
      lastX = event.x;
      lastY = event.y;
    }
    const now = Date.now();
    if (now < lastUpdate + 1000 / 60) return;
    const timeDelta = now - lastUpdate;
    const dx = event.x - lastX;
    const dy = event.y - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = distance / timeDelta;
    lastX = event.x;
    lastY = event.y;
    lastUpdate = now;
    counter -= speed * speed;
    if (counter < 0) {
      counter = counterValue;
      images[currentIndex].style.display = "none";
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].style.display = "block";
    }
  });
}
