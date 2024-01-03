document.addEventListener("DOMContentLoaded", function (){
    loadTasks();
    document.getElementById('add-task').addEventListener(
        'click', addHandler);
});

function addHandler (){
    const taskInput = document.getElementById('new-task').value;
    if (taskInput){
        addTask(taskInput);
        document.getElementById('new-task').value = '';
        saveTasks();
    }
}

function addTask (taskValue, isCompleted = false){
    const taskList = document.getElementById('task-list');
    const newTaskLi = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', toggleTask);

    const text = document.createElement('span');
    text.textContent = taskValue;
    text.style.textDecoration = isCompleted ? 'line-through' : 'none';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.id = 'edit-button';
    editButton.addEventListener('click', editTask);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.id = 'delete-button';
    deleteButton.addEventListener('click', deleteTask);

    newTaskLi.appendChild(checkbox);
    newTaskLi.appendChild(text);
    newTaskLi.appendChild(editButton);
    newTaskLi.appendChild(deleteButton);
    taskList.appendChild(newTaskLi);
}

function saveTasks(){
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(
        function (taskLi){
            const text = taskLi.querySelector('span').textContent;
            const isCompleted = taskLi.querySelector('input').checked;
            tasks.push({text, isCompleted});
        });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem(
        'tasks'
    )) || [];
    tasks.forEach(function (task){
        addTask(task.text, task.isCompleted);
    });
}

function toggleTask(event){
    const text = event.target.nextElementSibling;
    text.style.textDecoration = event.target.checked ? 'line-through' : 'none';
    saveTasks();
}

function deleteTask(event){
    const removeLi = event.target.parentNode;
    removeLi.parentNode.removeChild(removeLi);
    saveTasks();
}

function editTask(event){
    const textSpan = event.target.previousElementSibling;
    const newText = prompt('Edit your task', textSpan.textContent);
    if (newText !== null) {
        textSpan.textContent = newText;
        saveTasks();
    }
}
