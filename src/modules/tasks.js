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

import { tasksDom } from "./domManipulation";
import { projectListArr, render, _highlightedProject } from "./project";
export { renderTasks, deleteProject, editProject, saveHeaderEdit }

let highligtedProject;

function getHighlightedProject() {
  projectListArr.forEach(project => {
    if(project.highlighted) {
      highligtedProject = project;
    }
  });
}

function renderTasks(project) {
  tasksDom.updateProjectDetails(project);
}

function deleteProject() {
  getHighlightedProject();
  projectListArr.splice(highligtedProject.id, 1);
  projectListArr[0].highlighted = true;
  _highlightedProject = 0;
  render();
}

function editProject() {
  getHighlightedProject();
  tasksDom.toggleHeader();
  //when saving just reverse this
  tasksDom.projectNameEdit.value = highligtedProject.name;
  tasksDom.projectDescriptionEdit.value = highligtedProject.description;
}

 function saveHeaderEdit() {
  tasksDom.toggleHeader();
  highligtedProject.name = tasksDom.projectNameEdit.value;
  highligtedProject.description = tasksDom.projectDescriptionEdit.value;
  render();
}