//project highlighted - done
//access highlighted project obj properties
  //update porject name
  //udpate project description
  //addeventlisteners to delete and edit button
    //delete - deletes highlighted project
    //edit - toggle both todo header bars
//access projects.tasks
  //add tasks
  //render tasks
  //make tasks deletable
  //make due date editable

import { tasksDom } from "./domManipulation";
export { renderTasks }

function renderTasks(project) {
  tasksDom.updateProjectDetails(project);
}
