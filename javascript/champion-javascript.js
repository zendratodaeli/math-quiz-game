const celebrationAudioElement = document.getElementById("celebration-sound");
const championElement = document.querySelector(".champion");


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

