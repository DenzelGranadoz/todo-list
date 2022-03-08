//know which list item is active
//add event to add project btn
//have forms call makeList() 

export {makeList}

const projectListContainer = document.querySelector('.project-list');

const projectListObject = (name, description) => {
  return {name, description}
};

function makeList() {
  let projectListArr = [];
  projectListArr.push(projectListObject('Sample', 'jfdakfkdlfdsla'));
  projectListArr.push(projectListObject('Sample2', 'ietuwiotuiweo'));
  render(projectListArr);
}

function render(projectArr) {
  clearElements(projectListContainer);
  projectArr.forEach((project) => {
    const listElement = document.createElement('li');
    listElement.classList.add('project-name');
    listElement.innerHTML = project.name;
    projectListContainer.appendChild(listElement);
  })
}

function clearElements(element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
}
