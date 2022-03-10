import { projectsDom, tasksDom } from "./domManipulation";
import { renderTasks } from "./tasks";
export { render, addProject, saveHighlight }

function projectListObject(name, description) {
  return { name, description, id: '', tasks: [], highlighted: false }
}

let _projectListArr = JSON.parse(localStorage.getItem('project.list')) || [];
let _highlightedProject = JSON.parse(localStorage.getItem('highlighted.project')) || 0;

function render() {
  projectsDom.clearListElements(projectsDom.projectListContainer);
  projectsDom.renderProjectList(_projectListArr);
  renderTasks(_projectListArr[_highlightedProject]);
  _saveLocalStorage();
}

function _saveLocalStorage() {
  localStorage.setItem('project.list', JSON.stringify(_projectListArr));
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
  let newProject = projectListObject(projectsDom.projectName.value, projectsDom.projectDescription.value);
  _projectListArr.push(newProject);
  newProject.id = _projectListArr.indexOf(newProject); //sets object id
}

function _formEmptyValidation() {
  if(projectsDom.projectName.value == '') {
    _projectListArr.pop();
    alert("Project Name must be filled out");
  }
}

function _formDuplicate() {
  const uniqueValues = new Set(_projectListArr.map(project => project.name.toLowerCase()));
  if (uniqueValues.size < _projectListArr.length) {
    _projectListArr.pop();
    alert("Project Name already exists");
  }
}

function saveHighlight(highlightedlist) {
  _projectListArr.forEach(project => {
    project.highlighted = false;
    if(project.name == highlightedlist) {
      project.highlighted = true;     
      _highlightedProject = project.id; 
      renderTasks(project);
    }
  })
  _saveLocalStorage(); 
}
