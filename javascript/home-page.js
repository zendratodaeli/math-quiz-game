const backgroundSoundElement = document.getElementById("home-background-sound");


backgroundSoundElement.volume = 0.1;

backgroundSoundElement.addEventListener("ended", () => {
  backgroundSoundElement.currentTime = 0;
  backgroundSoundElement.play();
});
