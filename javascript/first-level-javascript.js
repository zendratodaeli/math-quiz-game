const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");
const backgroundSound = document.getElementById("backgroundSound");
const winSound = document.getElementById("winGame");
const timerElement = document.querySelector(".time-out");
const nextChallangeElement = document.querySelector(".next-challange")
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

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

function generateProblem() {
  return {
    numberOne: generateNumber(9),
    numberTwo: generateNumber(9),
    operator: ["+", "-"][generateNumber(1)],
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
    mistakesAllowed.textContent = 1 - state.wrongAnswers;
    problemElement.classList.add("animate-wrong");
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 331);
  }

  checkLogic();
}

backgroundSound.volume = 0.03;
backgroundSound.addEventListener("volumechange", () => {
  if (backgroundSound.value !== 0.03) {
    backgroundSound.volume = 0.03;
  }
});

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
      nextChallangeElement.style.display = "block";
    }, 500);
    playWinSound();
    stopTimer();
  }

  if (state.wrongAnswers === 2) {
    endMessage.textContent = "So sad, you lost! Try again, please.";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => resetButton.focus(), 331);
    stopTimer();
    lostGameMistake();
  }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
  stopWinSound();
  document.body.classList.remove("overlay-is-open");
  updateProblem();
  state.score = 0;
  state.wrongAnswers = 0;
  pointsNeeded.textContent = 5;
  mistakesAllowed.textContent = 1;
  renderProgressBar();
  time = 20;
  timerElement.innerHTML = time;
  startTimer();
  nextChallangeElement.style.display = "none";
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 5})`;
}

let time = 20;
let countdownInterval;

function startTimer() {
  countdownInterval = setInterval(() => {
    time--;
    timerElement.innerHTML = time;

    if (time === 0) {
      clearInterval(countdownInterval);
      handleTimerComplete();
      stopTimer();
      lostGameTimesUp()
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