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