import { projectsDom } from "./domManipulation";
export { render, addProject }

function projectListObject(name, description) {
  return { name, description, id: '', tasks: [] }
}

let _projectListArr = JSON.parse(localStorage.getItem('projectlist')) || [];

function render() {
  projectsDom.clearListElements(projectsDom.projectListContainer);
  projectsDom.renderProjectList(_projectListArr);
  _saveLocalStorage();
}

function _saveLocalStorage() {
  localStorage.setItem('projectlist', JSON.stringify(_projectListArr));
}

function addProject() {
  _createProjectObj();
  _formEmptyValidation();
  _formDuplicate();
  render(_projectListArr);
  _saveLocalStorage();
  projectsDom.toggleProjectForm();
}

function _createProjectObj() {
  let newProject = projectListObject(projectsDom.projectName.value, projectsDom.projectDescription.value);
  _projectListArr.push(newProject);
  newProject.id = _projectListArr.indexOf(newProject); //sets id
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
