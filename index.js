// start selections
let input = document.querySelector(".inputs input");
let makeTask = document.querySelector(".inputs i");
let outputs = document.querySelector(".outputs");

let nav = document.querySelector(".nav");
let count = document.querySelector(".count span");
let allTask = document.querySelector(".all");
let active = document.querySelector(".active");
let completed = document.querySelector(".completed");
let clearCompleted = document.querySelector(".clearCompleted");
// end selections

let tasks;
if(localStorage.task != null) {
    tasks = JSON.parse(localStorage.task);
}else {
    tasks = [];
};
getData();


makeTask.onclick = function() {
    if(input.value != "") {
        showData(input.value);
        input.value = "";
    }else {
        window.alert("write your task");
        input.focus();
    }
    counterTasks()
}


function showData(taskValue) {
    let task = {
        id: Date.now(),
        title: taskValue,
        completed: false,
    }
    tasks.push(task);
    createTasks(tasks);
    saveData(tasks);
}

function createTasks(tasks) {
    outputs.innerHTML = "";
    tasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id", task.id);

        if(task.completed == true) {
            div.className = "task done";
        }

        let circleIcon = document.createElement("i");
        circleIcon.className = "fa-regular fa-circle circle";

        let p = document.createElement("p");
        p.className = "taskValue";
        p.append(task.title);

        let trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash trash";

        div.appendChild(circleIcon);
        div.appendChild(p);
        div.appendChild(trashIcon);
        outputs.appendChild(div)
    });
};

function saveData(tasks) {
    window.localStorage.setItem("task", JSON.stringify(tasks));
}

function getData() {
    let data = localStorage.getItem("task");
    if(data) {
        createTasks(JSON.parse(data))
    }
}




outputs.addEventListener('click', function(e) {
    if(e.target.classList.contains("trash")) {
        e.target.parentElement.remove();
        deleteFromLS(e.target.parentElement.getAttribute("data-id"));
    };
    if(e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
        makeDone(e.target.getAttribute("data-id"));
        
    }
});

function deleteFromLS(id) {
    tasks = tasks.filter((task)=> task.id != id);
    saveData(tasks);
    counterTasks();
};

function makeDone(id) {
    for(let i=0; i<tasks.length; i++) {
        if(tasks[i].id == id) {
            tasks[i].completed == true ? (tasks[i].completed = false) : (tasks[i].completed = true)
        }
    }
    saveData(tasks);
    counterTasks();
};


function counterTasks() {
    let counterTasks = 0;
    for(let i=0; i<tasks.length; i++) {
        if(tasks[i].completed == false){
            counterTasks+=1;
        }
    }
    count.innerHTML = counterTasks
}
counterTasks();


clearCompleted.addEventListener('click', function() { 
    tasks = tasks.filter((obj)=> !obj.completed);
    saveData(tasks);
    getData(tasks);
});

completed.addEventListener('click', function() {
    outputs.innerHTML = "";
    tasks.forEach((task)=> {
        if(task.completed) {
            let div = document.createElement("div");
            div.className = "task done";
            div.setAttribute("data-id", task.id);

            let circleIcon = document.createElement("i");
            circleIcon.className = "fa-regular fa-circle circle";


            let p = document.createElement("p");
            p.className = "taskValue";
            p.append(task.title);

            let trashIcon = document.createElement("i");
            trashIcon.className = "fa-solid fa-trash trash";

            div.appendChild(circleIcon);
            div.appendChild(p);
            div.appendChild(trashIcon);
            outputs.appendChild(div);
        }
    })
})
active.addEventListener('click', function() {
    outputs.innerHTML = "";
    tasks.forEach((task)=> {
        if(task.completed == false) {
            let div = document.createElement("div");
            div.className = "task";
            div.setAttribute("data-id", task.id);

            let circleIcon = document.createElement("i");
            circleIcon.className = "fa-regular fa-circle circle";


            let p = document.createElement("p");
            p.className = "taskValue";
            p.append(task.title);

            let trashIcon = document.createElement("i");
            trashIcon.className = "fa-solid fa-trash trash";

            div.appendChild(circleIcon);
            div.appendChild(p);
            div.appendChild(trashIcon);
            outputs.appendChild(div);
        }
    })
})


allTask.addEventListener(("click"), function() {
    getData(tasks)
})