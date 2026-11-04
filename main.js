const camera = document.getElementById("camera");

camera.addEventListener("pointermove", (event) => {
  const rect = camera.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  console.log(`x: ${x}, y: ${y}`);
});

const shutter = document.getElementById("shutter");
const paper = document.getElementById("paper");
const message = document.getElementById("txt");


const advice = [
  "You look tired, get some rest.",
  "Smile a little more, it suits you.",
  "Shoulders look tight, drop them and breathe.",
  "Eyes look strained, look away from screens for a minute.",
  "Posture’s a little slumped, sit up straighter.",
  "You look focused, don’t overthink it.",
  "Skin looks dry, drink some water.",
  "Expression’s neutral, a small smile would help.",
  "Background’s messy, clear it for a better shot.",
  "Overall vibe is solid, shoot more.",
  "Angle flatters you, stay with it.",
  "Your hair looks great.",
  "Color suits you, nice choice.",
  "You look great today, keep that energy."
]



shutter.addEventListener("click", (event) => {
  if (paper.classList.contains("ejected")) {
    return; // Let this click bubble to the camera
  }

  event.stopPropagation();
  paper.classList.add("ejected");

  const index = Math.floor(Math.random() * advice.length);
  message.textContent = advice[index];
});

camera.addEventListener("click", () => {
  if (paper.classList.contains
    ("ejected") && !paper.classList.contains("remove")) {
    paper.classList.add("remove");
  }
});

paper.addEventListener("animationend", (event) => {
  if (
    event.animationName !== "paper-fall"
  ) return;

  paper.style.transition = "none";
  paper.classList.remove("remove", "ejected");
  void paper.getBoundingClientRect(); // Apply the reset immediately
  paper.style.removeProperty("transition");
});

const lighter = document.querySelector('.lt');

lighter.addEventListener('mousedown', () => {
  requestAnimationFrame(() => {
    lighter.classList.add('animate');
  });
});

lighter.addEventListener('mouseup', () => {
  requestAnimationFrame(() => {
    lighter.classList.remove('animate'); // Fixed variable name from 'lt' to 'lighter'
  });
});

const playPauseButton = document.querySelector('.play-pause-button');
const startButton = document.querySelector('.power-button');
const stopEjectButton = document.querySelector('.stopeject-button');
const nextButton = document.querySelector('.next-button');
const previousButton = document.querySelector('.previous-button');  
const cassettePlayer = document.querySelector('.casette-player');

const songs = [
  "../01 Drive My Car (Remastered 2009).mp3",
  "../02 Norwegian Wood (This Bird Has Flown) (Remastered 2009) [Y_V6y1ZCg_8].mp3",
  "../03 You Won't See Me.mp3",
  "../04 Nowhere Man (Remastered 2009) .mp3",
  "../05 Think For Yourself (Remastered 2009) .mp3",
  "../06 The Word (Remastered 2009) .mp3",
  "../07 The Beatles - Michelle (Remastered 2009).mp3",
  "../08 What Goes On (Remastered 2009).mp3",
  "../09 Girl (Remastered 2009) .mp3",
  "../10 I'm Looking Through You (Remastered 2009).mp3",
  "../11 The Beatles - In My Life (Remastered 2009).mp3",
  "../12 Wait (Remastered 2009) .mp3",
  "../13 If I Needed Someone (Remastered 2009).mp3",
  "../14 The Beatles - Run For Your Life (Remastered 2009).mp3"
];

let currentSongIndex = 0;
let isPlaying = false;

let currentAudio = new Audio(songs[currentSongIndex]);

currentAudio.addEventListener('playing', () => {
  cassettePlayer.classList.toggle('is-playing', !currentAudio.paused && !currentAudio.ended);
});

for (const eventName of ['pause', 'waiting', 'emptied', 'ended', 'error']) {
  currentAudio.addEventListener(eventName, () => {
    cassettePlayer.classList.remove('is-playing');
  });
}

async function playCurrentSong() {
  try {
    await currentAudio.play();
    isPlaying = !currentAudio.paused;
    if (isPlaying) {
      console.log('Playing:', songs[currentSongIndex]);
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.info('Playback interrupted by another player action.');
      return;
    }
    isPlaying = false;
    console.error('Unable to play:', currentAudio.src, error);
  }
}

function loadAndPlaySong(index) {
  const resumePlayback = isPlaying || !currentAudio.paused;
  isPlaying = false;
  currentAudio.src = songs[index];
  currentAudio.load();
  if (resumePlayback) {
    playCurrentSong();
  }
}

startButton.addEventListener('click', playCurrentSong);

playPauseButton.addEventListener('click', () => {
  if (!currentAudio.paused) {
    currentAudio.pause();
    isPlaying = false;
    console.log('Paused');
  } else {
    playCurrentSong();
  }
});

nextButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadAndPlaySong(currentSongIndex);
}); 

previousButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadAndPlaySong(currentSongIndex);
});

stopEjectButton.addEventListener('click', () => {
  currentAudio.pause();
  currentAudio.currentTime = 0;
  isPlaying = false;
  console.log('Stopped and ejected');
});

currentAudio.addEventListener('ended', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  currentAudio.src = songs[currentSongIndex];
  playCurrentSong();
});
