const paragraph = document.getElementById("paragraph").innerText;
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");
const startBtn = document.getElementById("startBtn");
const finishBtn = document.getElementById("finishBtn");
const resetBtn = document.getElementById("resetBtn");

let time = 0;
let timer = null;
let testActive = false;

// Start Test
startBtn.addEventListener("click", function () {
  testActive = true;
  input.value = "";
  input.disabled = false;
  input.focus();
  time = 0;
  timeDisplay.textContent = 0;
  mistakesDisplay.textContent = 0;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;

  startBtn.disabled = true;
  finishBtn.disabled = false;
  resetBtn.disabled = true;

  timer = setInterval(function () {
    time++;
    timeDisplay.textContent = time;
  }, 1000);
});

// Character input tracking
input.addEventListener("input", function () {
  if (!testActive) return;

  const typedText = input.value;
  let mistakes = 0;

  // Count mistakes
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] !== paragraph[i]) {
      mistakes++;
    }
  }

  mistakesDisplay.textContent = mistakes;

  // Calculate WPM
  let words = typedText.trim().split(/\s+/).length;
  let wpm = Math.round((words / time) * 60);

  if (time > 0) {
    wpmDisplay.textContent = wpm;
  }

  // Calculate Accuracy
  if (typedText.length > 0) {
    let correctChars = typedText.length - mistakes;
    let accuracy = Math.round((correctChars / typedText.length) * 100);
    accuracyDisplay.textContent = accuracy;
  }
});

// Finish Test
finishBtn.addEventListener("click", function () {
  testActive = false;
  clearInterval(timer);
  finishBtn.disabled = true;
  input.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = false;
});

// Reset Test
resetBtn.addEventListener("click", function () {
  testActive = false;
  clearInterval(timer);
  input.value = "";
  input.disabled = true;
  time = 0;
  timeDisplay.textContent = 0;
  mistakesDisplay.textContent = 0;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;

  startBtn.disabled = false;
  finishBtn.disabled = true;
  resetBtn.disabled = true;
});