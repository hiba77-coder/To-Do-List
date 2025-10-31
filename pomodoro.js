const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const setBtn = document.getElementById("set-btn");
const workInput = document.getElementById("work-input");
const breakInput = document.getElementById("break-input");
const statusText = document.getElementById("status-text");
const emoji = document.getElementById("emoji");
const taskName = document.getElementById("task-name");
const ding = document.getElementById("ding-sound");

let workTime = 25 * 60;
let breakTime = 5 * 60;
let time = workTime;
let isRunning = false;
let isWork = true;
let interval;

const savedTask = JSON.parse(localStorage.getItem("pomodoroTask"));
if (savedTask) {
  workTime = savedTask.time * 60;
  time = workTime;
  taskName.textContent = `Current task: ${savedTask.text}`;
  workInput.value = savedTask.time;
}

function updateDisplay() {
  const m = Math.floor(time / 60);
  const s = time % 60;
  timerDisplay.textContent = `${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  emoji.textContent = "⏳";
  interval = setInterval(() => {
    time--;
    updateDisplay();
    if (time <= 0) {
      clearInterval(interval);
      isRunning = false;
      ding.play();

      if (isWork) {
        statusText.textContent = "Break time ☕";
        emoji.textContent = "☕";
        time = breakTime;
        isWork = false;
      } else {
        statusText.textContent = "Focus time ⏳";
        emoji.textContent = "⏳";
        time = workTime;
        isWork = true;
      }
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
  emoji.textContent = "⏸️";
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  isWork = true;
  time = workTime;
  statusText.textContent = "Focus time ⏳";
  emoji.textContent = "⏳";
  updateDisplay();
}

function setTimes() {
  const workVal = parseInt(workInput.value) || 25;
  const breakVal = parseInt(breakInput.value) || 5;
  workTime = workVal * 60;
  breakTime = breakVal * 60;
  time = workTime;
  resetTimer();
  alert(`Pomodoro set to ${workVal} min work / ${breakVal} min break ✅`);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
setBtn.addEventListener("click", setTimes);
updateDisplay();
