document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "" && dueDateInput.value !== "") {
        const task = {
            text: taskInput.value,
            dueDate: dueDateInput.value,
            completed: false
        };

        saveTaskToLocal(task);
        taskInput.value = "";
        dueDateInput.value = "";
        loadTasks();
    }
}

function saveTaskToLocal(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear current tasks
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sort tasks by due date

    tasks.forEach((task, index) => {
        const newTask = document.createElement("li");
        newTask.innerHTML = `
            <div class="task-content">
                <span class="task-text ${task.completed ? 'completed' : ''}">
                    ${task.text} (Due: ${new Date(task.dueDate).toLocaleDateString()})
                </span>
                <div class="task-buttons">
                    <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </div>
            </div>
        `;
        taskList.appendChild(newTask);
    });
}

function completeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed; // Toggle completed status
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1); // Remove task at the specified index
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks[index];

    const newTaskText = prompt("Edit task", task.text);
    const newDueDate = prompt("Edit due date", task.dueDate);

    if (newTaskText.trim() !== "" && newDueDate) {
        task.text = newTaskText;
        task.dueDate = newDueDate;
        tasks[index] = task;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function filterTasks(status) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear current tasks
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let filteredTasks = tasks;
    if (status === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (status === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sort filtered tasks by due date

    filteredTasks.forEach((task, index) => {
        const newTask = document.createElement("li");
        newTask.innerHTML = `
            <div class="task-content">
                <span class="task-text ${task.completed ? 'completed' : ''}">
                    ${task.text} (Due: ${new Date(task.dueDate).toLocaleDateString()})
                </span>
                <div class="task-buttons">
                    <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </div>
            </div>
        `;
        taskList.appendChild(newTask);
    });
}
