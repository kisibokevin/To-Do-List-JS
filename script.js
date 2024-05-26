
window.onload = function() {
    loadTasks();
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let task = taskInput.value;

    if(task){
        let tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);
        taskInput.value = '',
        renderTasks();
        updateTaskCount();
    }
}

function getTasks() {
    let tasks = localStorage.getItem("tasks");
    return tasks? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
    updateTaskCount();
}


function renderTasks() {
    let tasks = getTasks();
    let tasksList = document.getElementById("tasksList");
    tasksList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task;
        li.appendChild(createDeleteButton(index));
        tasksList.appendChild(li);
    });
}


function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
    updateTaskCount();
}

function createDeleteButton(index) {
    let button = document.createElement("span");
    button.innerHTML = "\u00D7";
    button.addEventListener("click", () => {
        deleteTask(index);
    });
    return button;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
})

let taskList = document.getElementById("tasksList");
taskList.addEventListener("click", (e) => {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    updateTaskCount();
},false);


function updateTaskCount() {
    //const taskList = document.getElementById('taskList');
    const taskCount = taskList.children.length;
    document.getElementById('task-count').textContent = `You have ${taskCount} task${taskCount !== 1 ? 's' : ''} remaining`;
}