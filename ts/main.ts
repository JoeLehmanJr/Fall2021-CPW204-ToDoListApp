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
function getElem(id:string):HTMLElement{
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
    let addBtn = getElem("addToDo");
    addBtn.onclick = main.bind(this);

    // Load save items
    loadSaveItems();
}

function main():void {
    clearErrors();
    let singleToDoItem = getToDoItem();
    if (dataIsValid(singleToDoItem)) {
        displayToDoItem(singleToDoItem)
        saveToDo(singleToDoItem)
    }
}

function loadSaveItems(){
    let item = getToDo(); // read from localStorage
    displayToDoItem(item);
}


function clearErrors():void{
    // Clear title span
    let titleSpan = getElem("title-msg");
    titleSpan.innerText = "*";

    // Clear Date span
    let dateSpan = getElem("date-msg");
    dateSpan.innerText = "*";

    //Clear have Completed span
    let haveCompleted = getElem("status-msg");
    haveCompleted.innerText = "";
}

/**
 * Check to see if the form data is valid.
 * @returns if valid return true otherwise return false.
 */
function dataIsValid(item:ToDoItem):boolean {
    let isAllDataValid = true;

    // validates Title
    let title = item.title;
    if (title == "") {
        isAllDataValid = false;
        errorMsg("The title field is required and can not be empty.","title-msg");
    }

    // validates date-due
    let dateDue = item.dueDate;
    if (Object.prototype.toString.call(dateDue) === "[object Date]") {
        // it is a date
        if (isNaN(dateDue.getTime())) {  // dateDue.valueOf() could also work
          // date is not valid
          isAllDataValid = false;
          errorMsg("The due date field is required and must be a valid date.","date-msg");
        }
        else {
          // date is valid
          console.log("is valid date");
        }
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
function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
    // itemDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString())
    itemDate.innerText = dueDate.toDateString();

    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsCompleted;
    itemDiv.classList.add("todo");
    if(item.status){
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.status){
        let completedToDos = getElem("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = getElem("incomplete-items");
         incompleteToDos.appendChild(itemDiv);
    }
}


function saveToDo(item: ToDoItem):void {
    // Convert ToDoItem into JSON  string
    let itemString = JSON.stringify(item);

    // Save string
    localStorage.setItem(toDoKey, itemString);
}

const toDoKey ="todo"

/**
 * Get stored ToDo item or return null if not found
 */
function getToDo():ToDoItem {
    // read from localStorage
    let itemString = localStorage.getItem(toDoKey);
    // Convert string to object
    let item:ToDoItem = JSON.parse(itemString);
    return item;
}


function markAsCompleted(){
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completedItems = getElem("complete-items");
    completedItems.appendChild(itemDiv);
}
