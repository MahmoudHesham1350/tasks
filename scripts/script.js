

document.addEventListener("DOMContentLoaded", function() {
    renderTasks();

    document.querySelector("#addTask").addEventListener("click", () => {
        const task = document.querySelector("#taskInput").value;
        if (task){
            addTask(task);
        }
    })

    document.querySelectorAll(".remove").forEach(button => {
        button.onclick = () => {
            removeTask(button);
            location.reload();
        }
    });
    
    document.querySelectorAll(".list-group-item").forEach(task => {
        task.onclick = () => {
            const taskText = task.querySelector("span").textContent;
            let tasks = fetchTasks();
            tasks.forEach(task => {
                if (task.text === taskText) {
                    if (task.done){
                        task.done = false;
                    }
                    else {
                        task.done = true;
                    }
                }
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            location.reload();
        }
    });

});

function fetchTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks ? tasks : [];
}

function addTask(task){
    let tasks = fetchTasks();
    if(tasks == null){
        tasks = [{"text": task, "done": false}];
    }
    else {
        tasks.push({"text": task, "done": false});
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks(){
    let tasks = fetchTasks();
    let container = document.querySelector(".list-group");
    for (let task of tasks){
        if (task["done"]){
            container.innerHTML += `<div class="list-group-item d-flex justify-content-between align-items-center" style=" background-color: green;">
            <span style="text-decoration: line-through;">${task["text"]}</span>
            <button class="btn btn-secondary btn-sm remove">Remove</button>
            </div>`
        }
        else {
        container.innerHTML += `<div class="list-group-item d-flex justify-content-between align-items-center">
            <span>${task["text"]}</span>
            <button class="btn btn-danger btn-sm remove">Remove</button>
            </div>`
        }
    }
}

function removeTask(button) {
    const taskText = button.parentElement.querySelector("span").textContent;

    let tasks = fetchTasks();

    tasks = tasks.filter(task => task.text !== taskText);

    localStorage.setItem("tasks", JSON.stringify(tasks));

}