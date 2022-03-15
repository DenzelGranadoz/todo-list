import { addProject, saveHighlight } from "./project";
import { deleteProject, editProject, saveHeaderEdit } from "./tasks";
export { projectsDom, tasksDom }

const projectsDom = (() => {
  const projectListContainer = document.getElementById('project_list');
  const projectListItems = projectListContainer.childNodes;
  const _openAddProjectButton = document.getElementById('open_add_project');
  const _addProjectForm = document.getElementById('form');
  const _addProjectBtn = document.getElementById('add_project');
  const _closeAddProjectBtn = document.getElementById('close_add_project');
  const projectName = document.getElementById('project_name');
  const projectDescription = document.getElementById('project_description');
  

  const toggleProjectForm = () => {
    toggleDisplay(_addProjectForm);
    _clearProjectForm();
  };

  const _clearProjectForm = () => {
    projectName.value = '';
    projectDescription.value = '';
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
      if(project.highlighted == true) listElement.classList.add('active-project'); //makes highlight of project stay
      listElement.addEventListener('click', _highlightItem);
      projectListContainer.appendChild(listElement);
    })
  }

  function _highlightItem(e) {
    projectListItems.forEach(projectItem => {
      projectItem.classList.remove('active-project');
    });
    e.target.classList.add('active-project');
    saveHighlight(e.target.innerHTML);
  }

  function clearListElements(element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  }

  return {
    projectListContainer,
    projectName,
    projectDescription,
    toggleProjectForm,
    toggleDisplay,
    renderProjectList,
    clearListElements
  }
})();

const tasksDom = (() => {
  const header = document.getElementById('todo_header');
  const editHeader = document.getElementById('todo_header_toggle');
  const todoBody = document.getElementById('todo_body');
  const projectName = document.getElementById('project_name_display');
  const projectDescription = document.getElementById('project_description_display');
  const deleteProjectBtn = document.getElementById('delete_project');
  const editProjectBtn = document.getElementById('edit_project');
  const projectNameEdit = document.getElementById('project-name-edit');
  const projectDescriptionEdit = document.getElementById('project-description-edit');
  const cancleEditHeader = document.getElementById('cancel_edit_header');
  const saveEditHeader = document.getElementById('save_edit_header');

  function updateProjectDetails(project) {
    projectName.innerHTML = project.name;
    projectDescription.innerHTML = project.description;
  }

  deleteProjectBtn.addEventListener('click', deleteProject);
  editProjectBtn.addEventListener('click', editProject);

  function toggleHeader() {
    projectsDom.toggleDisplay(header);
    projectsDom.toggleDisplay(editHeader);
  }

  cancleEditHeader.addEventListener('click', toggleHeader);
  saveEditHeader.addEventListener('click', saveHeaderEdit);

  return { 
    header,
    todoBody,
    projectNameEdit,
    projectDescriptionEdit,
    updateProjectDetails,
    toggleHeader,
  }
})();