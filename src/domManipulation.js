import { addProject } from "./project";
export { projectsDom }

const projectsDom = (() => {
  const projectListContainer = document.getElementById('project_list');
  const _openAddProjectButton = document.getElementById('open_add_project');
  const _addProjectForm = document.getElementById('form');
  const _addProjectBtn = document.getElementById('add_project');
  const _closeAddProjectBtn = document.getElementById('close_add_project');
  const _projectName = document.getElementById('project_name');
  const _projectDescription = document.getElementById('project_description');
  

  const toggleProjectForm = () => {
    toggleDisplay(_addProjectForm);
    _clearProjectForm();
  };

  const _clearProjectForm = () => {
    _projectName.value = '';
    _projectDescription.value = '';
  };

  _openAddProjectButton.addEventListener('click', toggleProjectForm);
  _closeAddProjectBtn.addEventListener('click', toggleProjectForm);
  _addProjectBtn.addEventListener('click', addProject);

  const toggleDisplay = (element) => {
    return element.classList.toggle('hide');
  };
  
  function renderProjectList(projectArr) {
    projectArr.forEach((project) => {
      const listElement = document.createElement('li');
      listElement.classList.add('project-name');
      listElement.innerHTML = project.name;
      projectListContainer.appendChild(listElement);
    })
  }
  
  function clearListElements(element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  }

  return {
    projectListContainer,
    toggleProjectForm,
    toggleDisplay,
    renderProjectList,
    clearListElements
  }
})();
