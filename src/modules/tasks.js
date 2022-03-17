import { projectsDom, tasksDom } from "./domManipulation";
import { projectListArr, render, _highlightedProject } from "./project";
import { formatDistance } from 'date-fns'
export { renderTasks, deleteProject, editProject, saveHeaderEdit, saveNewTask, editDueDate, deleteTask, saveEditedDue }

let highlightedProject;

function TaskListObject(name, dueDateWord, dueDate) {
  return {name, dueDateWord, dueDate, id: '', complete: false}
}

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

function deleteProject() {
  getHighlightedProject();
  projectListArr.splice(highlightedProject.id, 1);
  projectListArr.length != 0 ? projectListArr[0].highlighted = true : window.location.reload();
  _highlightedProject = 0;
  updateId(projectListArr);
  render();
}

function updateId(list) {
  list.forEach(item => {
    item.id = list.indexOf(item);
  });
}

function saveNewTask() {
  getHighlightedProject();
  highlightedProject.tasks.push(TaskListObject(tasksDom.taskName.value, wordFormatDate(tasksDom.newDueDate.value), tasksDom.newDueDate.value));
  updateId(highlightedProject.tasks);
  render();
}

function wordFormatDate(due) {
  const year = due.split('-')[0];
  const month = due.split('-')[1];
  const day = due.split('-')[2];
  let result = formatDistance(
    new Date(year, month-1, day), 
    new Date(), 
    {addSuffix: true}
  )
  return result;
}

function editDueDate(e) {
  getHighlightedProject();
  const selectedTask = highlightedProject.tasks.filter(task => e.target.id == task.id);
  tasksDom.toggleTaskProperties(selectedTask[0]);
}

function saveEditedDue(e){
  getHighlightedProject();
  const selectedTask = highlightedProject.tasks.filter(task => e.target.id == task.id);
  tasksDom.saveTaskPropertes(selectedTask[0]);
  console.log(selectedTask)
  selectedTask[0].dueDateWord = wordFormatDate(selectedTask[0].dueDate);
  render();

}

function deleteTask(e) {
  getHighlightedProject();
  highlightedProject.tasks = highlightedProject.tasks.filter(task => e.target.id != task.id);
  render();
}

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




// function checkTask(e) {
//   getHighlightedProject();
//   const selectedTask = highlightedProject.tasks.filter(task => e.target.id == task.id);
//   console.log(selectedTask);
//   if(selectedTask[0].complete == true) selectedTask[0].complete = false;
//   else selectedTask[0].complete = true;
//   tasksDom.checkAttribute(selectedTask[0]);
// }