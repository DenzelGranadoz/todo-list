import { addProject, render, saveHighlight } from "./project";
import { deleteProject, editProject, saveHeaderEdit, saveNewTask } from "./tasks";
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
  const addTasks = document.getElementById('add_task');
  const newTaskBar = document.getElementById('new_task_bar');
  const tasksContainer = document.getElementById('tasks_container');
  const newDueDate = document.getElementById('new_due_date');
  const addNewTask = document.getElementById('add_new_task');
  const cancelNewTask = document.getElementById('cancel_new_task');
  const taskName = document.getElementById('task-name');

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

  function renderTasks(project) {
    console.log(project.tasks);
    //or call a function that checks if tasks array is empyty
    //if empty then just end this 
    //if not empty do the queryselectorall
    project.tasks.forEach(task => {
      tasksContainer.innerHTML += `
      <div class="task">
        <input type="checkbox" id="task-${task.id}"/>
        <label for="task-${task.id}">
          <span class="custom-checkbox"></span>
          ${task.name}
        </label>
        <div class="task-properties">
          <div class="task-property due-date" id="due_date">${task.dueDate}</div>
          <div class="task-property delete-task" id="delete_task">X</div>
        </div>
      </div>`
      
      // <div class="task-property due-date" id="due_date">${task.dueDate}</div> 
      //due_task_${task.id}
      //getelementbyid(`due_task_${task.id}`);
      //add event listener to it
      const dueDate = document.getElementById('due_date'); //add due_date_index??? or u could just queryselectorAll then add event listener?
      const deleteTaskBtn = document.getElementById('delete_task');
      const taskChecked = document.getElementById(`task-${task.id}`); //check if true checked? then adjsut the object 

      //foreach checkbox check if checked===true then save that?
      // console.log(taskChecked.checked);
      // taskChecked.addEventListener('click', saveHighlight);)
      dueDate.addEventListener('click', editDueDate);
      deleteTaskBtn.addEventListener('click', deleteTask);
    })
  }

  function editDueDate() {
    console.log('edit due date');
  }

  function deleteTask() {
    console.log('delete task button')
  }

  addTasks.addEventListener('click', toggleAddTask);
  cancelNewTask.addEventListener('click', toggleAddTask);
  addNewTask.addEventListener('click', saveTask)

  function toggleAddTask() {
    projectsDom.toggleDisplay(tasksDom.newTaskBar);
    projectsDom.toggleDisplay(tasksDom.addTasks);
    newDueDate.value = '';
    taskName.value = '';
  }

  function saveTask() {
    validateTaskDetails();
    saveNewTask();
    toggleAddTask();
  }

  function validateTaskDetails() {
    if(newDueDate.value == '' || taskName.value == '') {
      alert('Please fill in both fields');
      render();
    }
  }

  return { 
    header,
    todoBody,
    projectNameEdit,
    projectDescriptionEdit,
    addTasks,
    newTaskBar,
    tasksContainer,
    newDueDate,
    taskName,
    updateProjectDetails,
    toggleHeader,
    renderTasks,
    toggleAddTask
  }
})();