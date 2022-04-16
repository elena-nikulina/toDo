const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let toDoData = [];

const getToDoData = function () {
  toDoData = JSON.parse(window.localStorage.getItem("toDoData")) || []; // global variable
 // if (toDoData === null) {
   // toDoData = [];
  //}
  //console.log(toDoData);
};

const render = function () {
  getToDoData();
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");


      li.innerHTML =
        '<span class="text-todo">' +
        item.text +
        "</span>" +
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        "</div>";
      if (item.completed) {
        todoCompleted.append(li);
      } else {
        todoList.append(li);
      }
    

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
      render();
    });

    
    let btn = li.querySelector(".todo-remove");
    
    btn.addEventListener('click', (e) => {
      toDoData.splice(index, 1);
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
      render();
    });
    
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  if (newToDo !== "" || newToDo !== null) {
    toDoData.push(newToDo);
    localStorage.setItem("toDoData", JSON.stringify(toDoData));
    //console.log(localStr);
  }

  headerInput.value = "";
  render();
});

  
render();

