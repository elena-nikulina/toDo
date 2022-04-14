const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let toDoData = [];

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    if (item.text === "") {
      item.length = 0;
      return;
    } else {
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
    }

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
      render();
    });

    todoList.addEventListener('click', function(event) {

      let li = event.target.closest('li');
      let nodes = Array.from( li.closest('ul').children ); // get array
      let i = nodes.indexOf( li );

      if (li) {
        li.remove();
      }

      toDoData.splice(i, 1);
      console.log(i, toDoData);
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
    });

    todoCompleted.addEventListener('click', function(event) {

      let li = event.target.closest('li');
      let nodes = Array.from( li.closest('ul').children ); // get array
      let i = nodes.indexOf( li );

      if (li) {
        li.remove();
      }

      toDoData.splice(i, 1);
      console.log(i, toDoData);
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
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

const getToDoData = function () {
  toDoData = JSON.parse(window.localStorage.getItem("toDoData")); // global variable
  if (toDoData === null) {
    toDoData = [];
  }
  console.log(toDoData);
};
window.onload = function () {
  getToDoData();
  render();
};
