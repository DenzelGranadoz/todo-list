import { projectsDom } from "./domManipulation";
export { makeList, addProject }

//tasks key: value?
const projectListObject = (name, description) => {
  return {name, description}
};

function makeList() {
  let projectListArr = [];                                            //this list has to be accessible elsewhere for the localstorage thing?
  projectListArr.push(projectListObject('Sample', 'jfdakfkdlfdsla')); //when add btn in form clicked, trigger function that does this
  _render(projectListArr);
}

// projectListArr.push(projectListObject('Sample2', 'ietuwiotuiweo'));
//have an event listener that calls render first time round?

function _render(projectArr) {
  projectsDom.clearListElements(projectsDom.projectListContainer);    //id = index
  projectsDom.renderProjectList(projectArr);
}

function addProject() {
  
  //take value from name and description input boxes
    //have makelist take two parameters, name and the description
    //then projectListArr.push(projectListObject(first param, 2nd param))
  //create object with such parameters
  
  projectsDom.toggleProjectForm();
  //clear the value of both input boxes
  //toggle off the form 
};
