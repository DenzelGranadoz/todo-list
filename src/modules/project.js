import { projectsDom, tasksDom } from "./domManipulation";
import { renderTasks } from "./tasks";
export { render, addProject, saveHighlight, projectListArr, _highlightedProject}

function ProjectListObject(name, description) {
  return { name, description, id: '', tasks: [], highlighted: false }
}

let projectListArr = JSON.parse(localStorage.getItem('project.list')) || [];
let _highlightedProject = JSON.parse(localStorage.getItem('highlighted.project')) || 0;

function render() {
  projectsDom.clearListElements(projectsDom.projectListContainer);
  projectsDom.renderProjectList(projectListArr);
  if(projectListArr.length !== 0) renderTasks(projectListArr[_highlightedProject]);
  else tasksDom.toggleTodoDisplay()
  _saveLocalStorage();
}

function _saveLocalStorage() {
  localStorage.setItem('project.list', JSON.stringify(projectListArr));
  localStorage.setItem('highlighted.project', JSON.stringify(_highlightedProject));
}

function addProject() {
  _createProjectObj();
  _formEmptyValidation();
  _formDuplicate();
  render();
  projectsDom.toggleProjectForm();
}

function _createProjectObj() {
  let newProject = ProjectListObject(projectsDom.projectName.value, projectsDom.projectDescription.value);
  projectListArr.push(newProject);
  newProject.id = projectListArr.indexOf(newProject); //sets object id
}

function _formEmptyValidation() {
  if(projectsDom.projectName.value == '') {
    projectListArr.pop();
    alert("Project Name must be filled out");
  }
}

function _formDuplicate() {
  const uniqueValues = new Set(projectListArr.map(project => project.name.toLowerCase()));
  if (uniqueValues.size < projectListArr.length) {
    projectListArr.pop();
    alert("Project Name already exists");
  }
}

function saveHighlight(highlightedlist) {
  projectListArr.forEach(project => {
    project.highlighted = false;
    if(project.name == highlightedlist) {
      project.highlighted = true;     
      _highlightedProject = project.id; 
      renderTasks(project);
      if(tasksDom.todoBody.classList.contains('hide')) tasksDom.toggleTodoDisplay();
    }
  })
  _saveLocalStorage(); 
}
