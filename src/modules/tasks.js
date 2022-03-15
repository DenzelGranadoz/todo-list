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

import { projectsDom, tasksDom } from "./domManipulation";
import { projectListArr, render, _highlightedProject } from "./project";
export { renderTasks, deleteProject, editProject, saveHeaderEdit, toggleTodoDisplay, addTask }

let highlightedProject;

function getHighlightedProject() {
  projectListArr.forEach(project => {
    if(project.highlighted) highlightedProject = project;
    // console.log(highlightedProject);
    // console.log(highlightedProject.tasks)
  });
}

function renderTasks(project) {
  tasksDom.updateProjectDetails(project);
  projectsDom.clearListElements(tasksDom.tasksContainer);
  tasksDom.renderTasks(project);
}

function addTask() {
  getHighlightedProject();
  highlightedProject.tasks.push(TaskListObject('This is test task numbah 1', '03/14/1999'));
  updateId(highlightedProject.tasks);
  render();
}

function TaskListObject(name, dueDate) {
  // highlightedProject.tasks.push({
  //   name,
  //   dueDate,
  //   id: '',
  //   complete: false
  // })
  return {name, dueDate, id: '', complete: false}
}
//dynamically set id of each task


//on first project press
//if todo body classlist . have . hide
//toggle it off 
//else continue wiht whole program

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