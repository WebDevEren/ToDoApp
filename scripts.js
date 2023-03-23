// TODO LİST PROJECT

//? Tüm elementleri seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#todoClearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEverywhere);
  filterInput.addEventListener("keyup", filter);
}
runEvents();

function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");

  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display : block");
      } else {
        todo.setAttribute("style", "display : none !important");
      }
    });
  } else {
    showAlert("warning", "Filtreleme Yapmak İçin En Az 1 ToDo Olmalıdır");
  }
}

function allTodosEverywhere() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    //Ekrandan Silme
    todoListesi.forEach(function (todo) {
      todo.remove();
    });
    // Storageden Silme
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert("success", "Başarılı bir şekilde temizlendi");
  } else {
    showAlert("warning", "Silmek için en az bir ToDo olmalıdır !");
  }
}

function removeTodoToUI(e) {
  if (e.target.className == "fa fa-remove") {
    // Ekrandan Silmek
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    // Storageden Silmek

    removeTodoToStorage(todo.textContent);

    showAlert("success", `${todo.textContent} ToDo'su Başarıyla Silindi`);
  }
}

function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("warning", "Lütfen boş bırakmayınız !");
  } else {
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success", "Todo Eklendi");
  }
  e.preventDefault();
}

function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;
  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";
  const i = document.createElement("i");
  i.className = "fa fa-remove";
  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);
  addInput.value = "";
}

function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  const div = document.createElement("div");
  div.className = `alert alert-${type} mt-3`;
  div.textContent = message;

  firstCardBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2000);
}
