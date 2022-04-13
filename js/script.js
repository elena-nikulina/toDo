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
      render();
    });

    let liAll = document.querySelectorAll("li");

    for (let i = 0; i < liAll.length; i++) {
      liAll[i]
        .querySelector(".todo-remove")
        .addEventListener("click", function () {
          liAll[i].remove();

          toDoData.splice(i, 1);
          console.log(i, toDoData);
          localStorage.setItem("toDoData", JSON.stringify(toDoData));
        });
    }
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  /*
    let toDoData = JSON.parse(window.localStorage.getItem('toDoData'));
    if (toDoData === null) {
        toDoData = [];
    }
    */

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
//console.log(getToDoData());
//window.addEventListener('load', function() {
//    if ((localStorage.getItem(toDoData).length === 0) || ( toDoData === null)) {
//       toDoData.length = 0;
//       return ;
//   } else {
//       toDoData = JSON.parse (localStorage.getItem ("toDoData"));
//   }
//});

/*window.onload = function() {
    

    if ((localStorage.getItem(toDoData) === null || localStorage.getItem(toDoData) === '') && (toDoData.length === '' || toDoData === null)) {

       toDoData.length = 0;
        return ;

    } else {
        toDoData = JSON.parse (localStorage.getItem ("toDoData"));
        console.log(toDoData);
    }
};*/

//if ((localStorage.getItem(toDoData) !== null) && ( toDoData !== null)) {
//   window.onload = function() {
//       toDoData = JSON.parse (localStorage.getItem ("toDoData"));
//   };
//}
