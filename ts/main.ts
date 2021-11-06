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
 * Check to see if the form data is valid.
 * @returns if valid return true otherwise return false.
 */
//TODO: creat validation function
function isValid(item:ToDoItem):boolean {
    let isAllDataValid = true;

    // validates Summary
    let summary = getInById("Summary");
    return isAllDataValid;
}

/**
 * Retrieve the form data from the form and store in the object (ToDoItem).
 */
//TODO: Creat function to get the form data and store it in our ToDoItem object
function getToDoItem():ToDoItem {
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