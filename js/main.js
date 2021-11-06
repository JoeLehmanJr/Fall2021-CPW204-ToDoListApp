var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
function getById(id) {
    return document.getElementById(id);
}
function getInById(id) {
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
    var summary = getInById("Summary");
    return isAllDataValid;
}
function getToDoItem() {
    var singleToDoItem = new ToDoItem;
    var summary = getInById("Summary").value;
    singleToDoItem.summary = summary;
    var description = getInById("description").value;
    singleToDoItem.desc = description;
    var dateDue = getInById("date-due").value;
    singleToDoItem.dueDate = new Date(dateDue);
    var Status = getInById("status").checked;
    singleToDoItem.status = Status;
    return singleToDoItem;
}
function displayToDoItem(item) {
}
