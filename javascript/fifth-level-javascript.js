const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");
const backgroundSound = document.getElementById("backgroundSound");
const winSound = document.getElementById("winGame");
const timerElement = document.querySelector(".time-out");
// const nextChallangeElement = document.querySelector(".next-challange")
const lostGameMistakeElement = document.getElementById("lost-game-mistake");
const lostGameTimesUpElement = document.getElementById("lost-game-times-up");

let state = {
  score: 0,
  wrongAnswers: 0,
};

function updateProblem() {
  state.currentProblem = generateProblem();
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`;
  ourField.value = "";
  ourField.focus();
}

updateProblem();

function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // modify max and min
}

function generateProblem() {
  return {
    numberOne: generateNumber(500, 999), // modify
    numberTwo: generateNumber(500, 999), // modify
    operator: ["+", "-"][generateNumber(0, 1)], // modify
  };
}

ourForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  let correctAnswer = 0;
  const p = state.currentProblem;
  if (p.operator === "+") correctAnswer = p.numberOne + p.numberTwo;
  if (p.operator === "-") correctAnswer = p.numberOne - p.numberTwo;

  if (parseInt(ourField.value, 10) === correctAnswer) {
    state.score++;
    pointsNeeded.textContent = 5 - state.score;
    updateProblem();
    renderProgressBar();
  } else {
    state.wrongAnswers++;
    mistakesAllowed.textContent = 3 - state.wrongAnswers;
    problemElement.classList.add("animate-wrong");
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 331);
  }

  checkLogic();
}

backgroundSound.volume = 0.02;
backgroundSound.addEventListener("volumechange", () => {
  if (backgroundSound.value !== 0.02) {
    backgroundSound.volume = 0.02;
  }
});

winSound.volume = 0.03;
winSound.addEventListener("volumechange", () => {
  if(winSound.volume !== 0.03) {
    winSound.volume = 0.03;
  }
})

lostGameMistakeElement.volume = 0.03;
lostGameMistakeElement.addEventListener("volumechange", () => {
  if(lostGameMistakeElement.volume !== 0.03) {
    lostGameMistakeElement.volume = 0.03;
  }
})

lostGameTimesUpElement.volume = 0.03;
lostGameTimesUpElement.addEventListener("volumechange", () => {
  if(lostGameTimesUpElement.volume !== 0.03) {
    lostGameTimesUpElement.volume = 0.03;
  }
})

function playWinSound() {
  backgroundSound.pause();
  winSound.play();
}

function stopWinSound() {
  winSound.pause();
  winSound.currentTime = 0;
  backgroundSound.play();
}

backgroundSound.addEventListener("ended", () => {
  this.currentTime = 0;
  this.play();
});

function lostGameMistake() {
  lostGameMistakeElement.play();
  backgroundSound.pause();
}

function lostGameTimesUp() {
  lostGameTimesUpElement.play();
  backgroundSound.pause();
}

function checkLogic() {
  if (state.score === 5) {
    endMessage.textContent = "Congrats! You won.";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => {
      resetButton.focus()
      // nextChallangeElement.style.display = "block";
    }, 500);
    playWinSound();
    stopTimer();
    setTimeout(() => congratulation(), 5000)
  }

  if (state.wrongAnswers === 4) {
    endMessage.textContent = "So sad, you lost! Try again, please.";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => resetButton.focus(), 331);
    stopTimer();
    lostGameMistake();
  }
}

function congratulation() {
  location.href = "../champion.html"
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
  stopWinSound();
  document.body.classList.remove("overlay-is-open");
  updateProblem();
  state.score = 0;
  state.wrongAnswers = 0;
  pointsNeeded.textContent = 5;
  mistakesAllowed.textContent = 3;
  renderProgressBar();
  time = 80;
  timerElement.innerHTML = time;
  startTimer();
  // nextChallangeElement.style.display = "none";
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 5})`;
}

let time = 80;
let countdownInterval;

function startTimer() {
  countdownInterval = setInterval(() => {
    time--;
    timerElement.innerHTML = time;

    if (time === 0) {
      clearInterval(countdownInterval);
      handleTimerComplete();
      stopTimer();
      lostGameTimesUp();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(countdownInterval);
}

function handleTimerComplete() {
  if (state.score < 5) {
    endMessage.textContent = "Time's up! You lost. Try again, please.";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => resetButton.focus(), 331);
  }
}

resetGame()