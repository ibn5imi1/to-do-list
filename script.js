// start all variables
const body = document.body;
const wrapper = document.querySelector(".wrapper");
const menuBtns = document.querySelector(".menu-btns");
const backBtn = document.querySelector(".back-btn");
const screenBackdrop = document.querySelector(".screen-backdrop");
const catagoriesContainer = document.querySelector(".catagories");
const catagoryTitle = document.querySelector(".catagory-title");
const totalCatagoryTasks = document.querySelector(".catagory-tasks");
const totalTasks = document.querySelector(".total-tasks");
const catagoryImg = document.querySelector("#catagory-img");
const toggle = document.querySelector("#toggle");
const catagorySelect = document.querySelector("#catagory-select");
const catagory = document.querySelectorAll(".catagory");
const chaeckmark = document.querySelectorAll(".checkmark");
const trash = document.querySelectorAll(".delete");
const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");
const taskInput = document.querySelector("#task-input");
// end all variables

// for change to dark mood
toggle.addEventListener("change", function() {
    if(toggle.checked) {
        body.style.backgroundColor = "#262a38";
        body.style.color = "#fff";
        screenBackdrop.style.backgroundColor = "#858796";
        catagory.forEach((c)=> {
            c.style.backgroundColor = "#848273";
        });
        chaeckmark.forEach((c)=> {
            c.style.borderColor = "#fff";
        });
        trash.forEach((c)=> {
            c.style.color = "#fff";
        });
    }else {
        body.style.backgroundColor = "#fff";
        body.style.color = "#2e2e2e";
        screenBackdrop.style.backgroundColor = "#f9ea85";
        catagory.forEach((c)=> {
            c.style.backgroundColor = "#fff";
        });
        chaeckmark.forEach((c)=> {
            c.style.borderColor = "#2e2e2e";
        });
        trash.forEach((c)=> {
            c.style.color = "#2e2e2e";
        });
    };
});

// to show catagories 
menuBtns.addEventListener("click", ()=> {
    wrapper.classList.toggle("show-catagory");
});
// to go back to main page
backBtn.addEventListener("click", ()=> {
    wrapper.classList.toggle("show-catagory");
});

// to show add task form
addTaskBtn.addEventListener("click", ()=> {
    addTaskForm.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
});
// to remove add task form
blackBackdrop.addEventListener("click", ()=> {
    addTaskForm.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
});
// add catagories with js
let catagories = [
    {
        title: "Personal",
        img: "boy.png",
    },
    {
        title: "Work",
        img: "briefcase.png",
    },
    {
        title: "Shopping",
        img: "shopping.png",
    },
    {
        title: "Coding",
        img: "web-design.png",
    },
    {
        title: "Health",
        img: "healthcare.png",
    },
    {
        title: "Fitness",
        img: "dumbbell.png",
    },
    {
        title: "Education",
        img: "education.png",
    },
    {
        title: "Finance",
        img: "saving.png",
    },
];

let tasks = [
 
];

let selectedCatagory = catagories[0];

const calculateTotal = ()=> {
    const catagoryTasks = JSON.parse(localStorage.getItem("tasks")).filter(
      (task)=> task.catagory.toLowerCase() === selectedCatagory.title.toLowerCase()
    );
    totalCatagoryTasks.innerHTML = `${catagoryTasks.length} Tasks`;
    totalTasks.innerHTML = tasks.length;
};
// for render all catagories
const renderCatagories = ()=> {
    catagoriesContainer.innerHTML = "";
    catagories.forEach((catagory)=> {
        const catagoryTasks = tasks.filter(
            (task)=> task.catagory.toLowerCase() == catagory.title.toLowerCase()
        );
        const div = document.createElement("div");
        div.classList.add("catagory");
        div.addEventListener("click", ()=> {
            wrapper.classList.add("show-catagory");
            selectedCatagory = catagory;
            catagoryTitle.innerHTML = catagory.title;
            catagoryImg.src = `images/${catagory.img}`;
            calculateTotal();
            // render tasks when change catagory
            renderTasks();
        });
        // for put all details to div
        div.innerHTML = `
            <div class="left">
                            <img src="images/${catagory.img}" alt="here is image">
                            <div class="content">
                                <h1>${catagory.title}</h1>
                                <p>${catagoryTasks.length} Tasks</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="toggle-btn">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
        `
        catagoriesContainer.appendChild(div);
    });
};
// for render tasks
const tasksContainer = document.querySelector(".tasks");
const renderTasks = ()=> {
  tasksContainer.innerHTML = "";
  const catagoryTasks = tasks.filter(
    (task)=> task.catagory.toLowerCase() === selectedCatagory.title.toLowerCase()
  )
  if(catagoryTasks.length === 0) {
    tasksContainer.innerHTML = `
      <p class="no-task">No Task For This Catagory</p>
    `
  }else {
    catagoryTasks.forEach((task)=> {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;

      // add completed and save local
      checkbox.addEventListener("change", ()=> {
        const index = tasks.findIndex((t)=> t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        saveLocal();
      });

      div.innerHTML = `
        <div class="delete">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor"
                                class="w-6 h-6">
                                    <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
      `
      label.innerHTML = `
        <span class="checkmark">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                                >
                                    <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </span>
                            <p>${task.task}</p>
      `
      label.prepend(checkbox);
      div.prepend(label);
      tasksContainer.appendChild(div);

      // for delete task
      const deleteBtn = div.querySelector(".delete");
      deleteBtn.addEventListener("click", ()=> {
        const index = tasks.findIndex((t)=> t.id === task.id);
        tasks.splice(index, 1);
        saveLocal();
        renderTasks();
      });
    });
    renderCatagories();
    calculateTotal();
  };
};

// save and get task local in local storage
const saveLocal = ()=> {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getLocal = ()=> {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));
  if(localTasks) {
    tasks = localTasks
  };
};
// for add tasks 

// render all catagories in select
cancelBtn.addEventListener("click", ()=> {
    addTaskForm.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
});
addBtn.addEventListener("click", ()=> {
    const task = taskInput.value;
    const catagory = catagorySelect.value;
    if(task === "") {
      alert("please enter a task");
    }else {
      const newTask = {
        id: tasks.length + 1,
        task,
        catagory,
        completed: false,
      };
      tasks.push(newTask);
      saveLocal();
      addTaskForm.classList.toggle("active");
      blackBackdrop.classList.toggle("active");
      addTaskBtn.classList.toggle("active");
      renderTasks();
      taskInput.value = "";
    };
})
catagories.forEach((catagory)=> {
    const option = document.createElement("option");
    option.value = catagory.title.toLowerCase();
    option.textContent = catagory.title;
    catagorySelect.appendChild(option);
})

renderCatagories();
calculateTotal();
renderTasks();
getLocal();


