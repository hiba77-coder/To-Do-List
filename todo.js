const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.className = task.done ? "done" : "";
    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date}</td>
      <td>${task.time} min</td>
      <td>${task.done ? "✅" : "⏳"}</td>
      <td>
        <button class="action-btn" onclick="markDone(${index})">Done</button>
        <button class="action-btn" onclick="usePomodoro(${index})">⏳ Use</button>
        <button class="action-btn" onclick="deleteTask(${index})">🗑️</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;
  const time = parseInt(timeInput.value);

  if (!text || !date || !time) return alert("Please fill all fields!");

  tasks.push({ text, date, time, done: false });
  saveTasks();
  renderTasks();

  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
}

function markDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function usePomodoro(index) {
  const task = tasks[index];
  localStorage.setItem("pomodoroTask", JSON.stringify(task));
  alert(`Task "${task.text}" sent to Pomodoro timer!`);
  location.reload();
}

addBtn.addEventListener("click", addTask);
renderTasks();
