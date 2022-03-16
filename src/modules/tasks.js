//project highlighted - done
//access highlighted project obj properties - done
  //update porject name - done
  //udpate project description - done 
  //addeventlisteners to delete and edit button - done
    //delete - deletes highlighted project - done
    //edit - toggle both todo header bars - done
      //add cancel and save event listeners  - done
      //cancel just calls edit() - done
      //save has to render - done
//access projects.tasks - done
  //add tasks - 50%
    //addeventlistener to this - 50%
    //take details - 50%
    //render projects.tasks - done
  //render tasks - done
  //make tasks deletable
  //make due date editable - date_fns

//being able to saved finished todo
//adding a proper to do
//date_fns
//fixing event listeners for each todo
//check if no projects then hide the todo shiz

import { projectsDom, tasksDom } from "./domManipulation";
import { projectListArr, render, _highlightedProject } from "./project";
import { format, formatDistance, subDays } from 'date-fns'
export { renderTasks, deleteProject, editProject, saveHeaderEdit, toggleTodoDisplay, saveNewTask }

let highlightedProject;

function getHighlightedProject() {
  projectListArr.forEach(project => {
    if(project.highlighted) highlightedProject = project;
  });
}

function renderTasks(project) {
  tasksDom.updateProjectDetails(project);
  projectsDom.clearListElements(tasksDom.tasksContainer);
  tasksDom.renderTasks(project);
  if(tasksDom.addTasks.classList.contains('hide')) tasksDom.toggleAddTask();
}

function TaskListObject(name, dueDate) {
  return {name, dueDate, id: '', complete: false}
}

function deleteProject() {
  getHighlightedProject();
  projectListArr.splice(highlightedProject.id, 1);
  projectListArr.length != 0 ? projectListArr[0].highlighted = true : window.location.reload();
  _highlightedProject = 0;
  console.log(highlightedProject);
  updateId(projectListArr);
  render();
}

function updateId(list) {
  list.forEach(item => {
    item.id = list.indexOf(item);
  });
}

function saveNewTask() {
  console.log(tasksDom.newDueDate.value);
  console.log(tasksDom.taskName.value);
  getHighlightedProject();
  highlightedProject.tasks.push(TaskListObject(tasksDom.taskName.value, formatDate(tasksDom.newDueDate.value)));
  updateId(highlightedProject.tasks);
  render();
}

function formatDate(due) {
  const year = due.split('-')[0];
  const month = due.split('-')[1];
  const day = due.split('-')[2];
  // displayDate();
  return format(new Date(year, month-1, day), 'MM/dd/yyyy'); //I don't know why it adds a month on its own
}

// function displayDate() {
//   let formatDistance = require('date-fns/formatDistance')
//   let result = formatDistance(
//     formatDate(tasksDom.newDueDate.value),
//     {addSuffix: true}
//   )
//   console.log(result);
// }

//dom functions, move this later
function editProject() {
  getHighlightedProject();
  tasksDom.toggleHeader();
  tasksDom.projectNameEdit.value = highlightedProject.name;
  tasksDom.projectDescriptionEdit.value = highlightedProject.description;
}

 function saveHeaderEdit() {
  tasksDom.toggleHeader();
  highlightedProject.name = tasksDom.projectNameEdit.value;
  highlightedProject.description = tasksDom.projectDescriptionEdit.value;
  render();
}

function toggleTodoDisplay() {
  projectsDom.toggleDisplay(tasksDom.todoBody);
  projectsDom.toggleDisplay(tasksDom.header);
}