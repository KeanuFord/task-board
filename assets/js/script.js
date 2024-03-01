// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const taskModalEl = $('#task-modal');
const taskNameInputEl = $('#task-name-input');
const taskDateInputEl = $('#task-date-input');
const taskDescInputEl = $('#task-desc-input');

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return crypto.randomUUID();
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  let taskName = taskNameInputEl.val();
  let taskDate = taskDateInputEl.val();
  let taskDesc = taskDescInputEl.val();
  console.log("Task Name: " + taskName);
  console.log("Task Date: " + taskDate);
  console.log("Task Description: " + taskDesc);

  const newTask = {
    id: generateTaskId(),
    name: taskName,
    date: taskDate,
    description: taskDesc,
    status: 'to-do',
  };
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker


$(document).ready(function () {
  
  taskModalEl.on('submit', handleAddTask);

  $('#task-date-input').datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
