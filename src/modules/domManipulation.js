import { addProject, saveHighlight } from "./project";
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
  const editHeader = document.getElementById('todo_header_edit');
  const projectName = document.getElementById('project_name_display');
  const projectDescription = document.getElementById('project_description_display');

  function updateProjectDetails(project) {
    projectName.innerHTML = project.name;
    projectDescription.innerHTML = project.description;
  }

  return { 
    updateProjectDetails
  }
})();


{/* <div class="todo-header " id="todo_header">
      <div class="todo-header-bar">
        <h2>Odin</h2>
        <div class="todo-edit-remaining">
          <p class="show-project-list">Open Project List</p>
          <p>N Task(s) Remaining</p>
          <div class="todo-edit-delete">
            <p class="delete">Delete</p>
            <p class="edit">Edit</p>
          </div>
        </div>
      </div>
      <h4>Project Description</h4>
    </div> */}