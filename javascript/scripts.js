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
const bgVideo = document.getElementById("bg-video");
const changeBgBtn = document.getElementById("change-bg-btn");

let oldInputValue;



//// Funcoes

//fundo que altera
const videoSources = ["imagens/bgcat.mp4", "imagens/home.mp4", "imagens/galaxy.mp4", "imagens/code.mp4", "imagens/colors.mp4"];

let currentVideoIndex = 0;

const changeBackgroundButton = document.getElementById("change-bg-btn");
const backgroundVideo = document.getElementById("bg-video");

changeBackgroundButton.addEventListener("click", () => {
  currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
  const newSource = videoSources[currentVideoIndex];

  const sourceElement = backgroundVideo.querySelector("source");
  sourceElement.setAttribute("src", newSource);
  backgroundVideo.load(); // recarrega o vídeo
  backgroundVideo.play(); // toca novamente
});

//botao github
const btn = document.getElementById('github-btn');

btn.addEventListener('click', () => {
  window.open(
    'https://github.com/login',
    'githubPopup',
    'width=900,height=400,display=flex,top=200,left=300,resizable=yes,scrollbars=yes'
  );
});

//botao linkedin
document.getElementById('linkedin-btn').addEventListener('click', function() {
  window.open(
    'https://www.linkedin.com/login/pt',
    'linkedinPopup',
    'width=900,height=400,display=flex,top=200,left=300,resizable=yes,scrollbars=yes'
  );
});

//notas adesivas
const notesBtn = document.getElementById('notes-btn');
const notesModal = document.getElementById('notes-modal');
const notesModalBg = document.getElementById('notes-modal-bg');
const notesText = document.getElementById('notes-text');
const saveNotesBtn = document.getElementById('save-notes');
const closeNotesBtn = document.getElementById('close-notes');

notesText.value = localStorage.getItem('stickyNotes') || '';


notesBtn.addEventListener('click', () => { //abrir modal
  notesModal.style.display = 'block';
  notesModalBg.style.display = 'block';
});


closeNotesBtn.addEventListener('click', () => { //fechar modal das notas
  notesModal.style.display = 'none';
  notesModalBg.style.display = 'none';
});
notesModalBg.addEventListener('click', () => {
  notesModal.style.display = 'none';
  notesModalBg.style.display = 'none';
});


saveNotesBtn.addEventListener('click', () => { //salvar notas
  localStorage.setItem('stickyNotes', notesText.value);
  notesModal.style.display = 'none';
  notesModalBg.style.display = 'none';
});



//lista de tarefas - todo list check, editar e remover
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
    window.open(url, "popupWindow", "width=900,height=400,display=flex,top=200,left=300");
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

//calendario

const calendarDates = document.getElementById('calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

const eventModal = document.getElementById('event-modal');
const modalBg = document.getElementById('modal-bg');
const modalDate = document.getElementById('modal-date');
const eventText = document.getElementById('event-text');
const saveEventBtn = document.getElementById('save-event');
const closeModalBtn = document.getElementById('close-modal');

let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

function renderCalendar(date) {
  calendarDates.innerHTML = '';
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  monthYear.textContent = `${monthNames[month]} ${year}`;

  for (let i = 0; i < firstDay; i++) {
    calendarDates.appendChild(document.createElement('div'));
  }

  for (let day = 1; day <= lastDate; day++) {
    const dateCell = document.createElement('div');
    dateCell.textContent = day;
    dateCell.classList.add('calendar-day');

    const dateKey = `${String(day).padStart(2, '0')}-${String(month + 1).padStart(2, '0')}`;
      const holidays = [
        '01-01',
        '21-04',
        '01-05',
        '19-06',
        '07-09',
        '12-10',
        '02-11',
        '15-11',
        '25-12',
      ];

      if (holidays.includes(dateKey)) {
    dateCell.classList.add('holiday');
  }

    if (events[dateKey]) {
      dateCell.classList.add('has-event');
      dateCell.title = events[dateKey];
    }

    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dateCell.classList.add('today');
    }

    dateCell.addEventListener('click', () => openEventModal(dateKey));
    calendarDates.appendChild(dateCell);
  }
}

function openEventModal(dateKey) {
  modalDate.textContent = `Lembrete para: ${dateKey}`;
  eventText.value = events[dateKey] || '';
  eventModal.style.display = 'block';
  modalBg.style.display = 'block';

  saveEventBtn.onclick = () => {
    const text = eventText.value.trim();
    if (text) {
      events[dateKey] = text;
    } else {
      delete events[dateKey];
    }
    localStorage.setItem('calendarEvents', JSON.stringify(events));
    closeEventModal();
    renderCalendar(currentDate);
  };

  closeModalBtn.onclick = closeEventModal;
  modalBg.onclick = closeEventModal;
}

function closeEventModal() {
  eventModal.style.display = 'none';
  modalBg.style.display = 'none';
}

prevMonthBtn.addEventListener('click', () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);

///// cronometro
const cronometro = document.getElementById('cronometro');
const inputHours = document.getElementById('input-hours');
const inputMinutes = document.getElementById('input-minutes');
const inputSeconds = document.getElementById('input-seconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const alarme = document.getElementById('alarme');

let totalSeconds = 0;
let interval = null;
let isPaused = false;

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [
    hrs.toString().padStart(2, '0'),
    mins.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0'),
  ].join(':');
}

function updateDisplay() {
  cronometro.textContent = formatTime(totalSeconds);
}

function startCountdown() {
  if (interval) return; // evita múltiplos intervals

  if (totalSeconds <= 0) {
    alert('Defina um tempo maior que zero!');
    return;
  }

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;

  interval = setInterval(() => {
    if (!isPaused) {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();
      } else {
        clearInterval(interval);
        interval = null;

        // Tocar o som ao final
        alarme.currentTime = 0;
        alarme.play().catch(e => console.log("Erro ao tocar som:", e));

        alert('O tempo de estudos finalizou!');

        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
      }
    }
  }, 1000);
}

function pauseCountdown() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? '' : '';
}

function resetCountdown() {
  clearInterval(interval);
  interval = null;
  isPaused = false;
  pauseBtn.textContent = '';
  totalSeconds = 0;
  updateDisplay();

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;

  inputHours.value = '';
  inputMinutes.value = '';
  inputSeconds.value = '';
}

startBtn.addEventListener('click', () => {
  // calcula total de segundos
  const hrs = parseInt(inputHours.value, 10) || 0;
  const mins = parseInt(inputMinutes.value, 10) || 0;
  const secs = parseInt(inputSeconds.value, 10) || 0;

  if (hrs < 0 || mins < 0 || secs < 0 || mins > 59 || secs > 59) {
    alert('Por favor, insira valores válidos.');
    return;
  }

  totalSeconds = hrs * 3600 + mins * 60 + secs;
  updateDisplay();
  startCountdown();
});

pauseBtn.addEventListener('click', pauseCountdown);
resetBtn.addEventListener('click', resetCountdown);

// inicia display
updateDisplay();
