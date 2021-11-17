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
    title:string;
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
function getInput(id:string):HTMLInputElement {
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

    // validates Title
    let title = item.title;
    if (title == "") {
        isAllDataValid = false;
        errorMsg("The summary field is required and can not be empty.","summary-msg");
    }



    // validates date-due
    let dateDue = item.dueDate;

    if (!dateDue){
        isAllDataValid = false;
        errorMsg("The due date field is required and must be a valid date.","date-msg");
    }
    return isAllDataValid;
}

function errorMsg(errMsg:string,id:string):void{
    getInput(id).innerHTML = errMsg;
}


/**
 * Retrieve the form data from the form and store in the object (ToDoItem).
 */
function getToDoItem():ToDoItem {
    let singleToDoItem = new ToDoItem;

    //Retrieve task Title
    let summary = getInput("title").value;
    singleToDoItem.title = summary;

    //Retrieve Due Date of the task
    let dateDue = getInput("date-due").value;
    singleToDoItem.dueDate = new Date(dateDue);


    //Retrieve status of the Task
    let Status = getInput("status").checked;
    singleToDoItem.status = Status;

    return singleToDoItem;

}

/**
 * Display given ToDoItem on the web page
 */
//TODO: Create a function to Display ToDoItem on the web page.
function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toDateString();

    let itemDiv = document.createElement("div");
    if(item.status){
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.status){
        let completedToDos = getById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = getById("incomplete-items");
         incompleteToDos.appendChild(itemDiv);
    }
}

//TODO: Allow user to mark a ToDoItem as completed
//TODO: Store ToDoItem in web storage