const form = document.querySelector('form');
const ul = document.querySelector('ul');
const input = form.querySelector('input');
const taskCount = document.querySelectorAll('.task-count span')[1];
const emptyMessage = document.querySelector('.empty p');

// Contador de tareas
let taskCounter = 0;

// Cargar tareas desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  updateTaskCount();
  checkEmptyMessage();
});

// Función para cargar tareas desde localStorage
function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  savedTasks.forEach(taskText => {
    addTaskToDOM(taskText);
  });
}

// Función para agregar tarea al DOM
function addTaskToDOM(taskText) {
  const li = document.createElement('li');
  const taskTextElement = document.createElement('p');
  taskTextElement.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn-delete';
  deleteButton.textContent = 'X';
  deleteButton.addEventListener('click', () => {
    ul.removeChild(li);
    taskCounter--;
    updateTaskCount();
    checkEmptyMessage();
    saveTasksToLocalStorage();
  });

  li.appendChild(taskTextElement);
  li.appendChild(deleteButton);
  ul.appendChild(li);

  taskCounter++;
  saveTasksToLocalStorage();
}

// Función para guardar tareas en localStorage
function saveTasksToLocalStorage() {
  const tasks = Array.from(ul.querySelectorAll('p')).map(p => p.textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Agregar tarea
function addTask() {
  const taskText = input.value.trim();

  if (taskText) {
    addTaskToDOM(taskText);
    input.value = '';
    updateTaskCount();
    checkEmptyMessage();
  }
}

// Actualizar contador
function updateTaskCount() {
  taskCount.textContent = taskCounter;
}

// Mostrar u ocultar el mensaje "You have no pending tasks."
function checkEmptyMessage() {
  if (taskCounter === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
  }
}

// Evento de envío del formulario
form.addEventListener('submit', function (event) {
  event.preventDefault();
  addTask();
});

// Agregar una tarea haciendo clic en el botón
const addButton = form.querySelector('.btn-add');
addButton.addEventListener('click', addTask);
