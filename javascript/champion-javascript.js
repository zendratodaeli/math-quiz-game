const celebrationAudioElement = document.getElementById("celebration-sound");
const championElement = document.querySelector(".champion");
championElement.style.display = "none";
const buttonElement = document.getElementById("home-page");
buttonElement.style.display = "none";


const trophyElement = document.createElement("img");
trophyElement.src = './pictures/trophy.png';
trophyElement.alt = 'trophy-image';
trophyElement.id = "trophy-image";
const imageContainerElement = document.getElementById("image-container");
imageContainerElement.appendChild(trophyElement);

celebrationAudioElement.pause();
celebrationAudioElement.volume = 0.2;
setTimeout(() => {
  celebrationAudioElement.play();
  championElement.remove();
}, 15 * 1000);

setTimeout(() => {
  trophyElement.style.display = "block";
}, 16 * 1000);

setTimeout(() => {
  buttonElement.style.display = "block";
}, 8000)

setTimeout(() => {
  championElement.style.display = "block";
}, 2000)



