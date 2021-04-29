let TaskData = [];

function eTaskSetUp() {
    PerpareLocalStorage();
    let tasks = getData();
    //SetLocalStorage(tasks);
    ListTasks(tasks);
}


function loadTasks() {
    let tasks = [];
    tasks = getData();
    ListTask(tasks);
}

function getData() {
    let tasks = JSON.parse(localStorage.getItem("TaskData")) || [];


    if (tasks.length == 0) {
        tasks = TaskData;
        localStorage.setItem("TaskData", JSON.stringify(tasks));
    }
    return tasks;
}

function GenerateID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function PerpareLocalStorage() {
    if (GetLocalStorage() == null)
        SetLocalStorage(new Array());
}

function GetLocalStorage() {
    return JSON.parse(localStorage.getItem("TaskData"))
}

function SetLocalStorage(data) {
    localStorage.setItem("TaskData", JSON.stringify(data));
}

function saveTask() {

    let tasks = GetLocalStorage();
    let task = {};

    let currentDatetime = new Date()
    let formattedDate = displayDate(currentDatetime);

    task["id"] = GenerateID();
    task["create"] = formattedDate;
    task["complete"] = "Pending";
    task["title"] = document.getElementById("newTaskTitle").value;
    task["dueDate"] = displayDate(document.getElementById("newTaskDueDate").value);


    tasks.push(task);
    SetLocalStorage(tasks);
    ListTasks(tasks);

}

function ListTasks(allCurrentTask) {

    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");

    //clear the table
    resultsBody.innerHTML = "";


    for (let i = 0; i < allCurrentTask.length; i++) {
        const dataRow = document.importNode(template.content, true);

        //dataRow.getElementById("taskStatus").textContent = allCurrentTask[i].complete;
        dataRow.getElementById("taskStatus").textContent = allCurrentTask[i].complete;
        dataRow.getElementById("id").textContent = allCurrentTask[i].id;
        dataRow.getElementById("title").textContent = allCurrentTask[i].title;
        dataRow.getElementById("create").textContent = allCurrentTask[i].create;
        dataRow.getElementById("dueDate").textContent = allCurrentTask[i].dueDate;

        resultsBody.appendChild(dataRow);
    }
}

function completeTask(element) {
    // will refactor using a function
    //let taskId = getId();

    let taskId = $(element).parent().siblings(".d-none").text();

    let tasks = GetLocalStorage();

    let task = tasks.find(t => t.id == taskId);
    task.complete = "Done";

    SetLocalStorage(tasks);
    //alert("I'm Here");
    ListTasks(GetLocalStorage());
}

function deleteTask(element) {
    //alert("I'm here delete task ");


    let taskId = $(element).parent().siblings(".d-none").text();



    let tasks = GetLocalStorage();

    //let tasks = getLocalStorage();

    let tasksfiltered = tasks.filter((t) => t.id !== taskId);
    SetLocalStorage(tasksfiltered);
    ListTasks(GetLocalStorage());
}

function formatDate(dateString) {
    let [year, month, day] = dateString.split('-');
    return [month, day, year].join('/');
}

function displayDate(dateString) {
    let mydate = new Date(dateString)
    let res = ""
    res += mydate.getMonth() + 1
    res += "/"
    res += mydate.getDate()
    res += "/"
    res += mydate.getFullYear()
    return res
}

function getId(ele) {
    let taskId = $(element).parent().siblings(".d-none").text();
    return taskId;
}