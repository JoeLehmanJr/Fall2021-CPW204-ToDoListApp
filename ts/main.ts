/*
* This block creates an object to hold our individual todo items.
* This object has the following four properties:
*
Task Summary as summary:string
Full Task Description as desc:string
Due Date as dueDate:Date
Status as status:string
*/
class ToDoItem{
    summary:string;
    desc:string;
    dueDate:Date;
    status:boolean;
}

/**
 * Helper function to getInputById and returns the HTMLElement referenced by id.
 * @param id the id of the element you want to grab.
 * @returns HTMLElement that is referenced by the id parameter
 */
function getById(id:string):HTMLElement{
    return document.getElementById(id);
}

/**
 * Helper function to getInputById and returns the HTMLInputElement referenced by id.
 * @param id the id of the element you want to grab.
 * @returns HTMLInputElement that is referenced by the id parameter
 */
function getInById(id:string):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#date-due");
picker.setMin(new Date());

/**
 * Handles the on click event for the Add New Video Game button
 */
 window.onload = function() {
    let addBtn = getById("addToDo");
    addBtn.onclick = addToDoItem.bind(this);
}

function addToDoItem():void {
    let singleToDoItem = getToDoItem();
    if (dataIsValid(singleToDoItem)) {
        displayToDoItem(singleToDoItem)
    }
}

/**
 * Check to see if the form data is valid.
 * @returns if valid return true otherwise return false.
 */
//TODO: creat validation function
function dataIsValid(item:ToDoItem):boolean {
    let isAllDataValid = true;

    // validates Summary
    let summary = getInById("Summary");
    return isAllDataValid;
}

/**
 * Retrieve the form data from the form and store in the object (ToDoItem).
 */
function getToDoItem():ToDoItem {
    let singleToDoItem = new ToDoItem;

    //Retrieve task summary
    let summary = getInById("Summary").value;
    singleToDoItem.summary = summary;

    //Retrieve full text of the task
    let description = getInById("description").value;
    singleToDoItem.desc = description;

    //Retrieve Due Date of the task
    let dateDue = getInById("date-due").value;
    singleToDoItem.dueDate = new Date(dateDue);

    //Retrieve status of the Task
    let Status = getInById("status").checked;
    singleToDoItem.status = Status;
    return singleToDoItem;

}

/**
 * Display given ToDoItem on the web page
 */
//TODO: Create a function to Display ToDoItem on the web page.
function displayToDoItem(item:ToDoItem):void{

}

//TODO: Allow user to mark a ToDoItem as completed
//TODO: Store ToDoItem in web storage