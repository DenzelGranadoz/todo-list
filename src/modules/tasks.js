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
//access projects.tasks
  //add tasks
    //addeventlistener to this
    //take details
    //render projects.tasks
  //render tasks
  //make tasks deletable
  //make due date editable - date_fns

import { projectsDom, tasksDom } from "./domManipulation";
import { projectListArr, render, _highlightedProject } from "./project";
export { renderTasks, deleteProject, editProject, saveHeaderEdit, toggleTodoDisplay }

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
  console.log(project)
  // TaskListObject('This is test task numbah 1', '03/14/1999');
  // TaskListObject('This is test task numbah 2', '03/14/1999');
  // getHighlightedProject();
  // console.log(highlightedProject);
  // highlightedProject.tasks.push(TaskListObject('Sample2', 'ietuwiotuiweo')); 
  // TaskListObject('This is test task numbah 3', '03/14/1999');
  //render each to do
    //access the object array of the highlighted.task
    //create theelement based off that
    //append to container
}

// function _createProjectObj() {
//   let newProject = ProjectListObject(projectsDom.projectName.value, projectsDom.projectDescription.value);
//   projectListArr.push(newProject);
//   newProject.id = projectListArr.indexOf(newProject); //sets object id
// }

// container.innerHTML += ``
// <!-- <div class="task">
// <input type="checkbox" id="task-3"/>
// <label for="task-3">
//   <span class="custom-checkbox"></span>
//   This is a todo 3
// </label>
// <div class="task-properties">
//   <div class="task-property due-date">12/4/1999</div>
//   <div class="task-property delete-task">X</div>
// </div>
// </div>


// function TaskListObject(name, dueDate) {
//   highlightedProject.tasks.push({
//     name,
//     dueDate,
//     id: '',
//     complete: false
//   })
// }

//on first project press
//if todo body classlist . have . hide
//toggle it off 
//else continue wiht whole program

function deleteProject() {
  getHighlightedProject();
  projectListArr.splice(highlightedProject.id, 1);
  projectListArr.length != 0 ? projectListArr[0].highlighted = true : window.location.reload();
  _highlightedProject = 0;
  updateId();
  render();
}

function updateId() {
  projectListArr.forEach(project => {
    project.id = projectListArr.indexOf(project);
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