import { projectsDom } from "./domManipulation";
export { makeList, addProject }

//tasks key: value?
const projectListObject = (name, description) => {
  return {name, description}
};

let _projectListArr = [];  //this list has to be accessible elsewhere for the localstorage thing?

function makeList() {
  _projectListArr.push(projectListObject('Sample', 'jfdakfkdlfdsla')); //when add btn in form clicked, trigger function that does this
  _render(_projectListArr);
}

// projectListArr.push(projectListObject('Sample2', 'ietuwiotuiweo'));
//have an event listener that calls render first time round?

function _render(projectArr) {
  projectsDom.clearListElements(projectsDom.projectListContainer);    //id = index
  projectsDom.renderProjectList(projectArr);
}

function addProject() {
  _projectListArr.push(projectListObject(projectsDom.projectName.value, projectsDom.projectDescription.value));
  if(projectsDom.projectName.value == '') {
    _projectListArr.pop();
    return;
  }
  console.log(_projectListArr)
  _render(_projectListArr);
  projectsDom.toggleProjectForm();
};
