/*
* This block creates an object to hold our individual todo items.
* This object has the following four properties:
*
Task Summary as summary:string
Full Task Description as desc:string
Due Date as dueDate:Date
Status as status:string
*/
class ToDoItem {
    title: string;
    dueDate: Date;
    status: boolean;
}

/**
 * Helper function to getInputById and returns the HTMLElement referenced by id.
 * @param id the id of the element you want to grab.
 * @returns HTMLElement that is referenced by the id parameter
 */
function getElem(id: string): HTMLElement {
    return document.getElementById(id);
}

/**
 * Helper function to getInputById and returns the HTMLInputElement referenced by id.
 * @param id the id of the element you want to grab.
 * @returns HTMLInputElement that is referenced by the id parameter
 */
function getInput(id: string): HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#date-due");
picker.setMin(new Date());

const toDoKey = "todo"

/**
 * Handles the on click event for the Add New Video Game button
 */
window.onload = function () {

    let addBtn = getElem("addToDo");
    addBtn.onclick = main.bind(this);

    // Load save items
    loadSaveItems();

    let modal = getElem("myModal");
    modal.style.display = "none";
    // Get the button that opens the modal
    let btn = getElem("myBtn");

    // Get the <span> element that closes the modal
    let span = getElem("close");

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        // Get the modal
        // let modal = getElem("myModal");
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        // Get the modal
        // let modal = getElem("myModal");
        modal.style.display = "none";
    }

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    // Get the modal
    let modal = getElem("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/**
 * Controls the flow of the app
 */
function main(): void {
    clearErrors();
    let singleToDoItem = getToDoItem();
    if (dataIsValid(singleToDoItem)) {
        displayToDoItem(singleToDoItem)
        saveToDo(singleToDoItem)
    }
}

/**
 * loads the previously saved items and adds them to an array.
 */
function loadSaveItems(): void {
    let itemArray = getToDoItems(); // read from localStorage
    for (let i = 0; i < itemArray.length; i++) {
        let currItem = itemArray[i];
        displayToDoItem(currItem);
    }
}

/**
 * Resets all spans to there default state.
 */
function clearErrors(): void {
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
function dataIsValid(item: ToDoItem): boolean {
    let isAllDataValid = true;

    // validates Title
    let title = item.title;
    if (title == "") {
        isAllDataValid = false;
        errorMsg("The title field is required and can not be empty.", "title-msg");
    }

    // validates date-due
    let dateDue = item.dueDate;
    if (Object.prototype.toString.call(dateDue) === "[object Date]") {
        // it is a date
        if (isNaN(dateDue.getTime())) {  // dateDue.valueOf() could also work
            // date is not valid
            isAllDataValid = false;
            errorMsg("The due date field is required and must be a valid date.", "date-msg");
        }
    }
    return isAllDataValid;
}

/**
 * Displays error message in the correct span.
 * @param errMsg The message to display.
 * @param id The id of the span we are targeting.
 */
function errorMsg(errMsg: string, id: string): void {
    getInput(id).innerHTML = errMsg;
}

/**
 * Retrieve the form data from the form and store in the object (ToDoItem).
 */
function getToDoItem(): ToDoItem {
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
function displayToDoItem(item: ToDoItem): void {
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");

    // itemDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString())
    itemDate.innerText = dueDate.toDateString();

    let itemDiv = document.createElement("div");
    itemDiv.setAttribute("data-task-title", item.title);
    itemDiv.onclick = toggleComplete;

    itemDiv.classList.add("todo");
    if (item.status) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if (item.status) {
        let completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else {
        let incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}

/**
 * If the clicked item was incomplete, it will be marked as completed.
 * Otherwise it will be marked incomplete
 */
function toggleComplete() {
    let itemDiv = <HTMLElement>this;
    /*     console.log("Item div is:");
        console.log(itemDiv); */

    if (itemDiv.classList.contains("completed")) {
        // Remove complete class if previously marked as completed
        itemDiv.classList.remove("completed");
        let incompleteItems = document.getElementById("incomplete-items");
        incompleteItems.appendChild(itemDiv);
    }
    else {
        // Add completed item to complete-items div
        itemDiv.classList.add("completed");
        let completedItems = document.getElementById("complete-items");
        completedItems.appendChild(itemDiv);
    }

    let allToDos = getToDoItems();
    let currentToDoTitle = itemDiv.getAttribute("data-task-title");
    for (let index = 0; index < allToDos.length; index++) {
        let nextToDo = allToDos[index]; // Get ToDo out of array
        if (nextToDo.title == currentToDoTitle) {
            nextToDo.status = !nextToDo.status; // Flip complete/incomplete
        }
    }

    saveAllToDos(allToDos);  // Re-save into storage
}

/**
 * Clear all current toDos from storage
 * and save a new list
 * @param allToDos The list to save
 */
function saveAllToDos(allToDos: ToDoItem[]) {
    localStorage.setItem(toDoKey, ""); // Clear current items
    let allItemsString = JSON.stringify(allToDos); // Get new storage string with all ToDos
    localStorage.setItem(toDoKey, allItemsString);
}

/**
 * Save ToDoItems to web storage.
 * @param item the ToDo item object
 */
function saveToDo(item: ToDoItem): void {
    let currItems = getToDoItems();
    if (currItems == null) {// No items found
        currItems = new Array();
    }
    currItems.push(item); // Add new item to the current item list
    let currentItemsString = JSON.stringify(currItems);
    localStorage.setItem(toDoKey, currentItemsString)
}



/**
 * Get stored ToDo items or return null if not found
 */
function getToDoItems(): ToDoItem[] {
    // read from localStorage
    let itemString = localStorage.getItem(toDoKey);
    // Convert string to object
    let item: ToDoItem[] = JSON.parse(itemString);
    return item;
}

/**
 * When you click on the ToDo item mark it as complete.
 */
function markAsCompleted() {
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completedItems = getElem("complete-items");
    completedItems.appendChild(itemDiv);
}