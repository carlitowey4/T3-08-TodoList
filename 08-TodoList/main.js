// Coger elementos
const form = document.querySelector('form');
const ul = document.querySelector('ul');
const input = form.querySelector('input');
const taskCount = document.querySelectorAll('.task-count span')[1];
const emptyMessage = document.querySelector('.empty p');

// Contador de tareas
let taskCounter = 0;

// Agregar tarea
function addTask() {
  const taskText = input.value.trim();

  if (taskText) {
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
    });

    li.appendChild(taskTextElement);
    li.appendChild(deleteButton);
    ul.appendChild(li);

    input.value = '';
    taskCounter++;
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
form.addEventListener('submit', function (mensaje) {
  mensaje.preventDefault();
  addTask();
});

// Agregar una tarea haciendo clic en el botón
const addButton = form.querySelector('.btn-add');
addButton.addEventListener('click', addTask);

