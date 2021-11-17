var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
function getById(id) {
    return document.getElementById(id);
}
function getInput(id) {
    return document.getElementById(id);
}
var picker = datepicker("#date-due");
picker.setMin(new Date());
window.onload = function () {
    var addBtn = getById("addToDo");
    addBtn.onclick = addToDoItem.bind(this);
};
function addToDoItem() {
    var singleToDoItem = getToDoItem();
    if (dataIsValid(singleToDoItem)) {
        displayToDoItem(singleToDoItem);
    }
}
function dataIsValid(item) {
    var isAllDataValid = true;
    var title = item.title;
    if (title == "") {
        isAllDataValid = false;
        errorMsg("The summary field is required and can not be empty.", "summary-msg");
    }
    var dateDue = item.dueDate;
    if (!dateDue) {
        isAllDataValid = false;
        errorMsg("The due date field is required and must be a valid date.", "date-msg");
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
    itemDate.innerText = item.dueDate.toDateString();
    var itemDiv = document.createElement("div");
    if (item.status) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.status) {
        var completedToDos = getById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else {
        var incompleteToDos = getById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}
