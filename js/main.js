var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
function getElem(id) {
    return document.getElementById(id);
}
function getInput(id) {
    return document.getElementById(id);
}
var picker = datepicker("#date-due");
picker.setMin(new Date());
window.onload = function () {
    var addBtn = getElem("addToDo");
    addBtn.onclick = main.bind(this);
    loadSaveItems();
};
function main() {
    clearErrors();
    var singleToDoItem = getToDoItem();
    if (dataIsValid(singleToDoItem)) {
        displayToDoItem(singleToDoItem);
        saveToDo(singleToDoItem);
    }
}
function loadSaveItems() {
    var itemArray = getToDoItems();
    for (var i = 0; i < itemArray.length; i++) {
        var currItem = itemArray[i];
        displayToDoItem(currItem);
    }
}
function clearErrors() {
    var titleSpan = getElem("title-msg");
    titleSpan.innerText = "*";
    var dateSpan = getElem("date-msg");
    dateSpan.innerText = "*";
    var haveCompleted = getElem("status-msg");
    haveCompleted.innerText = "";
}
function dataIsValid(item) {
    var isAllDataValid = true;
    var title = item.title;
    if (title == "") {
        isAllDataValid = false;
        errorMsg("The title field is required and can not be empty.", "title-msg");
    }
    var dateDue = item.dueDate;
    if (Object.prototype.toString.call(dateDue) === "[object Date]") {
        if (isNaN(dateDue.getTime())) {
            isAllDataValid = false;
            errorMsg("The due date field is required and must be a valid date.", "date-msg");
        }
        else {
            console.log("is valid date");
        }
    }
    return isAllDataValid;
}
function errorMsg(errMsg, id) {
    getInput(id).innerHTML = errMsg;
}
function getToDoItem() {
    var singleToDoItem = new ToDoItem;
    var summary = getInput("title").value;
    singleToDoItem.title = summary;
    var dateDue = getInput("date-due").value;
    singleToDoItem.dueDate = new Date(dateDue);
    var Status = getInput("status").checked;
    singleToDoItem.status = Status;
    return singleToDoItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsCompleted;
    itemDiv.classList.add("todo");
    if (item.status) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.status) {
        var completedToDos = getElem("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else {
        var incompleteToDos = getElem("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currentItemsString = JSON.stringify(currItems);
    localStorage.setItem(toDoKey, currentItemsString);
}
var toDoKey = "todo";
function getToDoItems() {
    var itemString = localStorage.getItem(toDoKey);
    var item = JSON.parse(itemString);
    return item;
}
function markAsCompleted() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completedItems = getElem("complete-items");
    completedItems.appendChild(itemDiv);
}
