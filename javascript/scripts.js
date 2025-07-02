// Projeto Lista de Tarefas - Ana Carolina Gomes, Clarisse Santana, Flavia Mota e Laiza Kevelly //

//////////////LISTA DE TAREFAS////////////////

// atributos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");
const eraseButton = document.querySelector("#erase-button");

// variaveis
let oldInputValue;
let todos = JSON.parse(localStorage.getItem("todos")) || []; 

// funcoes da Lista de Tarefas
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

    todoList.insertBefore(todo, todoList.firstChild); // mais recente primeiro

    todoInput.value = ""; // apagar campo quando digitar tarefa
    todoInput.focus();  // focar no input tarefa
};

const toggleForms = () => { // faz aparecer somente o edit
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => { // funcao do atualizar para edicao
    const todos = document.querySelectorAll(".todo"); // seleciona tds

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3"); // pega o titulo mapeado

        if (todoTitle.innerText === oldInputValue) {// comparando titulos e alterando
            todoTitle.innerText = text;
        }
    })
}

const searchTasks = () => { // buscar tarefas
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

function filterByStatus() { // filtrar tarefas
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

//// event listeners da lista de tarefas
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        // salvar tarefa na lista
        saveTodo(inputValue);
    }
});

// verificar quando um botão for clicado
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div"); //elemento pai e div mais prox

    let todoTitle; // mapear título para edição
    if(parentEl && parentEl.querySelector("h3")) { // verificar titulo
        todoTitle = parentEl.querySelector("h3").innerText; // busca p titulo
    }

    // done - tarefa concluida
    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done"); // desmarcar
    }

    // edit - editar
    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        // salvando variaveis
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    // remove - remover
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }
});

editForm.addEventListener("submit", (e) => { // salvando o edit
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {// atualizar
        updateTodo(editInputValue);
    }

    toggleForms();
});

cancelEditBtn.addEventListener("click", (e) => { // cancelar o formulario
    e.preventDefault();
    toggleForms();
});

searchInput.addEventListener("input", searchTasks); // executa a busca por texto
filterSelect.addEventListener("change", filterByStatus); // aplica o filtro por status
eraseButton.addEventListener("click", clearSearch); // limpa o campo de busca

//////////////ALTERAR FUNDO (BACKGROUND VIDEO)////////////////

// atributos
const bgVideo = document.getElementById("bg-video");
const changeBgBtn = document.getElementById("change-bg-btn");

// variaveis 
const videoSources = ["imagens/bgcat.mp4", "imagens/moon.mp4", "imagens/galaxy.mp4", "imagens/home.mp4", "imagens/boreal.mp4", "imagens/code.mp4", "imagens/letter.mp4", "imagens/lights.mp4", "imagens/colors.mp4"];
let currentVideoIndex = 0;

// event listeners do Fundo
changeBgBtn.addEventListener("click", () => {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    const newSource = videoSources[currentVideoIndex];

    const sourceElement = bgVideo.querySelector("source");
    sourceElement.setAttribute("src", newSource);
    bgVideo.load(); // recarrega o video
    bgVideo.play(); // toca novamente
});

//////////////POPUP DO GOOGLE E LINKS////////////////

// atributos
const miniGoogleInput = document.getElementById("mini-google-input");
const miniGoogleBtn = document.getElementById("mini-google-btn");
const githubBtn = document.getElementById('github-btn');

// funções do mini google e popups
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

// event listeners do mini google e popups
miniGoogleBtn.addEventListener("click", openMiniSearch); // Mini-Google
miniGoogleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        miniGoogleBtn.click();
    }
});

// botao github
githubBtn.addEventListener('click', () => {
    window.open(
        'https://github.com/login',
        'githubPopup',
        'width=900,height=400,display=flex,top=200,left=300,resizable=yes,scrollbars=yes'
    );
});

// botao linkedin
document.getElementById('linkedin-btn').addEventListener('click', function() {
    window.open(
        'https://www.linkedin.com/login/pt',
        'linkedinPopup',
        'width=900,height=400,display=flex,top=200,left=300,resizable=yes,scrollbars=yes'
    );
});

// botao drive
document.getElementById('drive-btn').addEventListener('click', function() {
    window.open(
        'https://drive.google.com/drive',
        'drivePopup',
        'width=900,height=400,display=flex,top=200,left=300,resizable=yes,scrollbars=yes'
    );
});

// botao GPT
document.getElementById('gpt-btn').addEventListener('click', function() {
    window.open(
        'https://chatgpt.com/',
        'gptPopup',
        'width=900,height=400,display=flex,top=200,left=300,resizable=yes,scrollbars=yes'
    );
});

//////////////NOTAS ADESIVAS////////////////

// atributos
const notesBtn = document.getElementById('notes-btn');
const notesModal = document.getElementById('notes-modal');
const notesModalBg = document.getElementById('notes-modal-bg');
const notesText = document.getElementById('notes-text');
const saveNotesBtn = document.getElementById('save-notes');
const closeNotesBtn = document.getElementById('close-notes');

// variaveis 
notesText.value = localStorage.getItem('stickyNotes') || ''; // carrega as notas salvas ao iniciar

// event listeners das notas
notesBtn.addEventListener('click', () => { // abrir modal
    notesModal.style.display = 'block';
    notesModalBg.style.display = 'block';
});

closeNotesBtn.addEventListener('click', () => { // fechar modal das notas
    notesModal.style.display = 'none';
    notesModalBg.style.display = 'none';
});

notesModalBg.addEventListener('click', () => { // fechar modal clicando no background
    notesModal.style.display = 'none';
    notesModalBg.style.display = 'none';
});

saveNotesBtn.addEventListener('click', () => { // salvar notas
    localStorage.setItem('stickyNotes', notesText.value);
    notesModal.style.display = 'none';
    notesModalBg.style.display = 'none';
});

//////////////CALENDARIO////////////////

// atributos
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

// variaveis 
let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

// funcoes do calendario
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

        const dateKey = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
        const holidays = [ // dias de feriado
            '01-01',
            '21-04',
            '01-05',
            '19-06',
            '24-06',
            '07-09',
            '12-10',
            '02-11',
            '15-11',
            '25-12',
        ];

        const dayMonthKey = `${String(day).padStart(2, '0')}-${String(month + 1).padStart(2, '0')}`;
        if (holidays.includes(dayMonthKey)) {
            dateCell.classList.add('holiday');}


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

// event listeners calendario
prevMonthBtn.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    renderCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    renderCalendar(currentDate);
});

// inicia o calendario
renderCalendar(currentDate);

//////////////CRONOMETRO////////////////

// atributos
const cronometro = document.getElementById('cronometro');
const inputHours = document.getElementById('input-hours');
const inputMinutes = document.getElementById('input-minutes');
const inputSeconds = document.getElementById('input-seconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const alarme = document.getElementById('alarme');

// variaveis
let totalSeconds = 0;
let interval = null;
let isPaused = false;

// funcoes
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
    if (interval) return;

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

                //tocar o som ao final
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

// event lsteners cronometro
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

//////////CURSOS////////////////

// atributos
const form = document.getElementById('curso-form');
const lista = document.getElementById('lista-cursos');

// variáveis
let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

// funções auxiliares
function salvarCursos() {
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function formatarDataParaInput(data) {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

function renderizarCursos() {
    lista.innerHTML = "";
    cursos.forEach((curso, index) => renderizarCurso(curso, index));
}

function renderizarCurso(curso, index) {
    const item = document.createElement('div');
    item.classList.add('curso-item');

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';

    const info = document.createElement('div');

    const titulo = document.createElement('strong');
    titulo.style.fontSize = '16px';
    titulo.textContent = curso.nome;

    const autor = document.createElement('span');
    autor.style.fontSize = '13px';
    autor.style.opacity = '0.8';
    autor.textContent = curso.autor;

    const status = document.createElement('span');
    status.style.fontSize = '12px';
    status.style.opacity = '0.9';
    status.style.fontStyle = 'italic';

    if (curso.dataInicio && curso.prazo) {
        const [ano, mes, dia] = curso.dataInicio.split('-').map(Number);
        const inicio = new Date(ano, mes - 1, dia);
        const prazoFinal = new Date(inicio);
        prazoFinal.setDate(inicio.getDate() + curso.prazo);

        const hoje = new Date();
        const estaNoPrazo = hoje <= prazoFinal;

        const dataFormatada = inicio.toLocaleDateString('pt-BR');
        status.textContent = (estaNoPrazo ? 'Dentro do prazo' : 'Fora do prazo') + ` | Início: ${dataFormatada}`;
    } else {
        status.textContent = 'Prazo indefinido';
    }

    info.appendChild(titulo);
    info.appendChild(document.createElement('br'));
    info.appendChild(autor);
    info.appendChild(document.createElement('br'));
    info.appendChild(status);

    const botoes = document.createElement('div');

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('editar-btn');
    btnEditar.dataset.index = index;
    btnEditar.style.marginRight = '5px';
    const iconEditar = document.createElement('i');
    iconEditar.className = 'fa-solid fa-pencil';
    btnEditar.appendChild(iconEditar);

    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('excluir-btn');
    btnExcluir.dataset.index = index;
    const iconExcluir = document.createElement('i');
    iconExcluir.className = 'fa-solid fa-eraser';
    btnExcluir.appendChild(iconExcluir);

    botoes.appendChild(btnEditar);
    botoes.appendChild(btnExcluir);

    header.appendChild(info);
    header.appendChild(botoes);

    const barraExterna = document.createElement('div');
    barraExterna.classList.add('barra-externa');
    barraExterna.style.marginTop = '8px';

    const barraInterna = document.createElement('div');
    barraInterna.classList.add('barra-interna');
    barraInterna.style.width = `${curso.percentual}%`;
    barraExterna.appendChild(barraInterna);

    const progresso = document.createElement('div');
    progresso.style.fontSize = '12px';
    progresso.style.marginTop = '4px';
    progresso.textContent = `${curso.percentual}% concluído`;

    item.appendChild(header);
    item.appendChild(barraExterna);
    item.appendChild(progresso);

    lista.appendChild(item);
}

// eventos
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const total = parseInt(document.getElementById('totalModulos').value);
        const atual = parseInt(document.getElementById('moduloAtual').value);
        const autor = document.getElementById('autor').value;
        const prazo = parseInt(document.getElementById('prazo').value);
        const dataInicio = document.getElementById('dataInicio').value; // formato yyyy-MM-dd
        const percentual = Math.min(100, ((atual / total) * 100).toFixed(0));

        const novoCurso = { nome, total, atual, autor, prazo, dataInicio, percentual };
        cursos.unshift(novoCurso);

        salvarCursos();
        renderizarCursos();
        form.reset();
    });

    lista.addEventListener('click', (event) => {
        if (event.target.closest('.excluir-btn')) {
            const index = parseInt(event.target.closest('.excluir-btn').dataset.index);
            cursos.splice(index, 1);
            salvarCursos();
            renderizarCursos();
        }

        if (event.target.closest('.editar-btn')) {
            const index = parseInt(event.target.closest('.editar-btn').dataset.index);
            const curso = cursos[index];

            document.getElementById('nome').value = curso.nome;
            document.getElementById('totalModulos').value = curso.total;
            document.getElementById('moduloAtual').value = curso.atual;
            document.getElementById('autor').value = curso.autor;
            document.getElementById('prazo').value = curso.prazo;
            document.getElementById('dataInicio').value = formatarDataParaInput(curso.dataInicio);

            cursos.splice(index, 1); 
            salvarCursos();
            renderizarCursos();
        }
    });

    renderizarCursos();
});

//////////TOOLTIP PERSONALIZADO////////////////
document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip-box';
  document.body.appendChild(tooltip);

  let currentElement = null;

  document.body.addEventListener('mouseover', (e) => {
    const el = e.target.closest('[title]');
    if (el && el.getAttribute('title')) {
      currentElement = el;
      const text = el.getAttribute('title');
      el.dataset.originalTitle = text; // salva original
      el.removeAttribute('title'); // evita tooltip nativo
      tooltip.textContent = text;
      tooltip.style.opacity = '1';
    }
  });

  document.body.addEventListener('mousemove', (e) => {
    if (currentElement) {
      tooltip.style.left = `${e.pageX + 12}px`;
      tooltip.style.top = `${e.pageY + 12}px`;
    }
  });

  document.body.addEventListener('mouseout', (e) => {
    const el = e.target.closest('[title], [data-original-title]');
    if (el && currentElement) {
      tooltip.style.opacity = '0';
      el.setAttribute('title', el.dataset.originalTitle); 
      delete el.dataset.originalTitle;
      currentElement = null;
    }
  });
});
