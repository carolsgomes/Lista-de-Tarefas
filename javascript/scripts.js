//////////////LISTA DE TAREFAS////////////////

//// Selecao de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select"); 
const eraseButton = document.querySelector("#erase-button");
const miniGoogleInput = document.getElementById("mini-google-input");
const miniGoogleBtn = document.getElementById("mini-google-btn");


let oldInputValue;



//// Funcoes
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-eraser"></i>';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);

  todoInput.value = ""; //apagar campo quando digitar tarefa
  todoInput.focus();  //focar no input tarefa
};

const toggleForms = () => { // faz aparecer somente o edit
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

const updateTodo = (text) => { //funcao do atualizar para edicao

  const todos = document.querySelectorAll(".todo"); //seleciona tds

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3"); //pega o titulo mapeado

    if (todoTitle.innerText === oldInputValue) {//comparando titulos e alterando
      todoTitle.innerText = text;
    } 

  })
}

//buscar
  const searchTasks = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const tasks = document.querySelectorAll(".todo");

  tasks.forEach((task) => {
    const title = task.querySelector("h3").innerText.toLowerCase();
    const matchesSearch = title.includes(searchTerm);

    task.style.display = matchesSearch ? "flex" : "none";
  });
}

 const clearSearch = (e) => { // limpa a busca e mostra as tarefas novamente
  e.preventDefault();
  searchInput.value = "";
  searchTasks();
}

// filtrar 
function filterByStatus() {
  const selectedStatus = filterSelect.value; // pega o valor 
  const tasks = document.querySelectorAll(".todo");    

  tasks.forEach((task) => {
    const isDone = task.classList.contains("done"); // verifica se a tarefa tem classe 'done'

    let show = false;

    if (selectedStatus === "all") {
      show = true;
    } else if (selectedStatus === "done" && isDone) {
      show = true;
    } else if (selectedStatus === "todo" && !isDone) {
      show = true;
    }

    task.style.display = show ? "flex" : "none";  // mostra ou oculta a tarefa
  });
}


//popup dp google
const openMiniSearch = () => {
  const term = miniGoogleInput.value.trim();

  if (term !== "") {
    const url = "https://www.google.com/search?q=" + encodeURIComponent(term);
    window.open(url, "popupWindow", "width=800,height=400,display=flex,top=200,left=300");
    miniGoogleInput.value = ""; 
  } else {
    alert("Digite algo para pesquisar");
  }
};



///// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        //salvar tarefa na lista
        saveTodo(inputValue);
    }

});

// verificar quando um botão for clicado
document.addEventListener("click", (e) => { 

  const targetEl = e.target;
  const parentEl = targetEl.closest("div"); //elemento pai e div mais prox
  
  let todoTitle; //mapear título para edição
  if(parentEl && parentEl.querySelector("h3")) { //verificar titulo
    todoTitle = parentEl.querySelector("h3").innerText; //busca p titulo
  }
  
  //done - tarefa concluida
  if (targetEl.classList.contains("finish-todo")) { 
    parentEl.classList.toggle("done"); //desmarcar
    } 
    
    //edit - editar
    if (targetEl.classList.contains("edit-todo")) {
      toggleForms();
      
      //salvando variaveis
      editInput.value = todoTitle;
      oldInputValue = todoTitle; 
    } 

    //remove - remover 
    if (targetEl.classList.contains("remove-todo")) {
      parentEl.remove();
      
      
    }      
});

//salvando o edit
editForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {//atualizar
    updateTodo(editInputValue);
  }

  toggleForms();

}) 

//cancelar - não processeguir com o formulario
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

//executa a busca por texto
searchInput.addEventListener("input", searchTasks);

//aplica o filtro por status
filterSelect.addEventListener("change", filterByStatus);

//limpa o campo de busca
eraseButton.addEventListener("click", clearSearch);

//mini-google
miniGoogleBtn.addEventListener("click", openMiniSearch);

miniGoogleInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); 
    miniGoogleBtn.click();
  }
});

