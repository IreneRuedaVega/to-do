"use strict";

let arrayTasks = [];
const dateNumEl = document.querySelector(".js-number");
const dateNameEl = document.querySelector(".js-day");
const dateMonthYearEl = document.querySelector(".js-month-year");
const buttonAdd = document.querySelector(".button--add");
const buttonPlus = document.querySelector(".button--plus");
const background = document.querySelector(".background");

//Al cargar la página se imprimen las tareas que estén almacenadas en el localStorage
printLocalStorage();

//Función para obtener la fecha actual

function printDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const dayNumber = date.getDate();
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const appDate = { date, dayNumber, day, month, year };

  document.appDate = appDate;

  dateNumEl.innerHTML = appDate.dayNumber;
  dateNameEl.innerHTML = appDate.day;
  dateMonthYearEl.innerHTML = `${appDate.month}, ${appDate.year}`;
}

printDate();

//Boton (+) despliega el modal

function addNewTask() {
  const enterTask = document.querySelector(".new-task");
  background.classList.toggle("hidden");
}

buttonPlus.addEventListener("click", addNewTask);

//Mostrar / ocultar background
window.addEventListener("click", function (e) {
  if (e.target == background) {
    background.classList.add("hidden");
  }
});

//Ocultar el background al pulsar la tecla intro
window.addEventListener("keydown", function (event) {
  if (event.key == 13) {
    background.classList.add("hidden");
  }
});

function createNewTask() {
  const inputTask = document.querySelector(".js-input").value;
  const status = false;
  const task = {
    name: inputTask,
    completed: status,
  };
  document.querySelector(".js-input").value = "";
  localStorageToDoList(task);
}

buttonAdd.addEventListener("click", function () {
  createNewTask();
  addNewTask();
});

//Se almacenan los datos en el LocalStorage
function localStorageToDoList(task) {
  if (localStorage.getItem("arrayTasks") == null) {
    arrayTasks = [];
    arrayTasks.push(task);
    localStorage.setItem("arrayTasks", JSON.stringify(arrayTasks));
  } else {
    arrayTasks = JSON.parse(localStorage.getItem("arrayTasks"));
    arrayTasks.push(task);
    localStorage.setItem("arrayTasks", JSON.stringify(arrayTasks));
  }

  printLocalStorage();
}

//Se imprimen los datos almacenados en localStorage

function printLocalStorage() {
  const taskLocStorage = JSON.parse(localStorage.getItem("arrayTasks"));
  if (taskLocStorage != null) {
    let ul = document.querySelector(".todo-list");
    let ulCompleted = document.querySelector(".done");
    let listCompleted = "";
    let listUncompleted = "";
    taskLocStorage.reverse(); // reverso del localStorage
    for (let i = 0; i < taskLocStorage.length; i++) {
      if (taskLocStorage[i].completed) {
        listCompleted +=
          '<li class="task-li strike"><input type="checkbox" checked="checked" class="checkbox" name="status" id="checkbox' +
          i +
          ' "/><label class="label-checkbox" for="checkbox' +
          i +
          '">' +
          taskLocStorage[i].name +
          "</label></li>";
      } else {
        listUncompleted +=
          '<li class="task-li"><input type="checkbox" class="checkbox" name="status" id="checkbox' +
          i +
          '"/><label class="label-checkbox" for="checkbox' +
          i +
          '">' +
          taskLocStorage[i].name +
          "</label></li>";
      }
    }
    ul.innerHTML = listUncompleted;
    ulCompleted.innerHTML = listCompleted;

    // Escucha el evento click de los checkboxes de las tareas del localStorage
    let checkboxes = document.querySelectorAll(".checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener("click", changeStatusTasks);
    }
  }
}

// Marcar/Desmarcar tareas
function changeStatusTasks(event) {
  let taskLocStorage = JSON.parse(localStorage.getItem("arrayTasks"));
  let currentTask = event.currentTarget;
  currentTask.parentNode.classList.toggle("strike");
  let labelTask = currentTask.nextSibling.innerHTML;
  let taskDone = [];
  let posiciontaskDone = 0;

  for (let i = 0; i < taskLocStorage.length; i++) {
    if (labelTask === taskLocStorage[i].name) {
      taskDone = taskLocStorage[i];
      posiciontaskDone = i;
      taskLocStorage[i].completed = !taskLocStorage[i].completed; //Toggle del valor de la propiedad 'completed'
    }
  }
  taskLocStorage.splice(posiciontaskDone, 1); // Eliminamos taskDone del array taskLocStorage;
  taskLocStorage.unshift(taskDone); // Colocamos el elemento eliminado al principio del array en localStorage (aparece al final de la lista);
  localStorage.setItem("arrayTasks", JSON.stringify(taskLocStorage));
  printLocalStorage();
}
