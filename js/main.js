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
function isValid(item) {
    var isAllDataValid = true;
    var summary = getInById("Summary");
    return isAllDataValid;
}
function getToDoItem() {
    return singleToDoItem;
}
function displayToDoItem(item) {
}
