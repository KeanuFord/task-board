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
  
  // Initializing card header, body, type and due date
  const cardHeader = $("<header>");
  cardHeader.addClass('card-header h4');
  cardHeader.text(task.name);

  const cardBody = $("<body>");
  cardBody.add("card-body");

  const cardType = $("<p>");
  cardType.addClass('card-text');

  const cardDate = $("<p>");
  cardType.addClass('card-text');
  cardType.text(task.date);

  // Add delete button
  const cardBtn = $('<button>');
  cardBtn.addClass('btn btn-danger delete');
  cardBtn.text('Delete');
  cardBtn.attr("data-task-id", task.id);

  // Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  if (task.Date && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.Date, 'DD/MM/YYYY');

    // If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardBtn.addClass('border-light');
    }
  }

  cardBody.append(cardType, cardDate, cardBtn);
  taskCard.append(cardHeader, cardBody);
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
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

  // ? Use JQuery UI to make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
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
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) tasks = [];

  const taskId = ui.draggable[0].dataset.taskId;

  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of tasks) {
    // ? Find the project card by the `id` and update the project status.
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
taskModalEl.on('submit', handleAddTask);

$(document).ready(function () {
  
  renderTaskList();

  $('#task-date-input').datepicker({
    changeMonth: true,
    changeYear: true,
  }); 

  // ? Make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});
