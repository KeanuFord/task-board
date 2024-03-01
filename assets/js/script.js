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
  const taskCard = $('<div>').addClass('card task-card draggable my-3');
  taskCard.attr('data-task-id', task.id)

  // TODO: Create a new card header element and add the classes `card-header` and `h4`. Also set the text of the card header to the project name.
  const cardHeader = $("<header>");
  cardHeader.addClass('card-header h4');
  cardHeader.text(task.name);

  // TODO: Create a new card body element and add the class `card-body`.
  const cardBody = $("<body>");
  cardBody.add("card-body");

  // TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project type.
  const cardType = $("<p>");
  cardType.addClass('card-text');

  // TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project due date.
  const cardDate = $("<p>");
  cardType.addClass('card-text');
  cardType.text(task.date);

  // TODO: Create a new button element and add the classes `btn`, `btn-danger`, and `delete`. Also set the text of the button to "Delete" and add a `data-project-id` attribute and set it to the project id.
  const cardBtn = $('<button>');
  cardBtn.addClass('btn btn-danger delete');
  cardBtn.text('Delete');
  cardBtn.attr("data-task-id", task.id);

  // ? Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  if (task.Date && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.Date, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardBtn.addClass('border-light');
    }
  }

  // TODO: Append the card description, card due date, and card delete button to the card body.
  cardBody.append(cardType, cardDate, cardBtn);

  // TODO: Append the card header and card body to the card.
  taskCard.append(cardHeader, cardBody);

  // ? Return the card so it can be appended to the correct lane.
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  console.log("Rendering Tasks");
  
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) tasks = [];

  //Clearing lanes of pre-existing cards
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  for(let task of tasks) {
    const taskCard = createTaskCard(task);
    if(task.status === 'to-do') {
      todoList.append(taskCard);
    } else if (task.status === 'in-progress') {
      inProgressList.append(taskCard);
    } else {
      doneList.append(taskCard);
    }
  }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();
  
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

  //Read previous tasks from storage
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) tasks = [];
  
  //Add new task
  tasks.push(newTask);

  //Put new list back into storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
taskModalEl.on('submit', handleAddTask);

$(document).ready(function () {
  
  renderTaskList();

  $('#task-date-input').datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
