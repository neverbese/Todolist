(function () {
  'use strict';

  //保存したdateを取得する
  var todos = localStorage.getItem('todos');
  if (todos) {
    todos = JSON.parse(todos);
  } else {
    todos = [];
  }

  var todoForm = document.getElementById('todo-form');
  var todoList = document.getElementById('todo-list');
  var todoInput = document.querySelector('#todo-form input');//追加された内容

  var addItem = function (event) {

    event.preventDefault();

    if (!todoInput.value) {
      return;
    }

    //todos 
    todos.push({ text: todoInput.value, done: false });
    render();

    todoInput.value = '';
  };


  var render = function () {

    todoList.innerHTML = '';
    todos.forEach(function (todo) {

      var checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.checked = todo.done;
      checkBox.addEventListener('change', function (event) {
        todo.done = event.target.checked;
      })

      var span = document.createElement('span');
      span.textContent = todo.text;

      var label = document.createElement('label');
      label.appendChild(checkBox);
      label.appendChild(span);

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'delete';

      deleteButton.addEventListener('click', function () {
        var index = todos.indexOf(todo);
        todos.splice(index, 1);
        render();

      });

      var listItem = document.createElement('li');
      listItem.appendChild(label);
      listItem.appendChild(deleteButton);

      todoList.appendChild(listItem);

      //データをJSON形式でローカルストレージに保存する
      localStorage.setItem('todos', JSON.stringify(todos));
    });
  }
  // var deleteItem = function (event) {
  //   var listItem = event.target.parentElement;
  //   todoList.removeChild(listItem);
  // }

  todoForm.addEventListener('submit', addItem);

  //todolistを表示する
  render();
}());
