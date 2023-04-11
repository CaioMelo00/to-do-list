// Referências Iniciais
const inputNewTask = document.querySelector("#inputNewTask");
const btnAddTask = document.querySelector("#btnAddTask");
const taskList = document.querySelector("#taskList");
const editWindow = document.querySelector("#editWindow");
const backgroundEditWindow = document.querySelector("#backgroundEditWindow");
const editWindowBtnClose = document.querySelector("#editWindowBtnClose");
const btnUpdateTask = document.querySelector("#btnUpdateTask");
const editTaskId = document.querySelector("#editTaskId");
const inputTaskEditName = document.querySelector("#inputTaskEditName");
const KEY_CODE_ENTER = 13;
const KEY_LOCAL_STORAGE = 'tasksList';
let dbTasks = [];

// Chamada de funções 
obtainTasksLocalStorage();
renderTaskListHtml();


/* Manipulação de evento para quando o botão Enter do teclado for pressionado
chamar KEY_CODE_ENTER*/
inputNewTask.addEventListener('keypress', (e) => {

    if(e.keyCode == KEY_CODE_ENTER) {
        let task = {
            name: inputNewTask.value,
            id: createId(),
        }
        addTask(task);
    }
});

/* Manipulação de visualização de telas de edição ao clicar
no botão editWindowBtnClose*/
editWindowBtnClose.addEventListener('click', (e) => {
    alternateEditWindow();
});

/* Manipulação de evento para quando o botão btnAddTask for clicado,
criar um novo task e adicionar um item à lista*/
btnAddTask.addEventListener('click', (e) => {
 
    let task = {
        name: inputNewTask.value,
        id: createId(),
    }
    addTask(task);
});


// Manipulação de evento para quando o botão de atualizar tarefa for clicado
btnUpdateTask.addEventListener('click', (e) => {
    e.preventDefault();

    let taskId = editTaskId.innerHTML.replace("#", '');

    let task = {
        name: inputTaskEditName.value,
        id: taskId
    }

    let currentTask = document.getElementById(''+taskId+'');

    if(currentTask) {

        const taskIndex = obtainTaskIndexById(taskId);
        dbTasks[taskIndex] = task;
        saveTasksLocalStorage();

        let li = createTagLi(task);
        taskList.replaceChild(li, currentTask);
        alternateEditWindow();
    } else {
        alert("Elemento HTML não encontrado!");
    }
});

// Função para gerar ID com valor aleatório arredondado de no max 3000
function createId() {
    return Math.floor(Math.random() * 3000);
}

// Função para adicionar uma nova tarefa na TODO List
function addTask(task) {
    if (inputNewTask.value == '') {
        alert('Adicione uma tarefa');
    } else {
        dbTasks.push(task);
        saveTasksLocalStorage(dbTasks);
        renderTaskListHtml();
    }
}

// Função que cria elementos HTML e retorna um item
function createTagLi(task) {

    let li = document.createElement('li');
    li.id = task.id;

    let span = document.createElement('span');
    span.classList.add('taskText');
    span.innerHTML = task.name;

    let div = document.createElement('div');

    let btnEdit = document.createElement('button');
    btnEdit.classList.add('btnAction');
    btnEdit.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEdit.setAttribute('onclick', 'editing('+task.id+')');

    let btnDelete = document.createElement('button');
    btnDelete.classList.add('btnAction');
    btnDelete.innerHTML = '<i class="fa fa-trash"></i>';
    btnDelete.setAttribute('onclick', 'deleting('+task.id+')');

    div.appendChild(btnEdit);
    div.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

// Função para editar conteúdo alterando o valor
function editing(taskId) {
    let li = document.getElementById('' + taskId + '');
    if(li) {
        editTaskId.innerHTML = '#' + taskId;
        inputTaskEditName.value = li.innerText;
        alternateEditWindow();
    } else {
        alert("Elemento HTML não encontrado");
    }
}

// Função para deletar item da TODO List
function deleting(taskId) {
    let confirmation = window.confirm('Tem certeza que deseja excluir? ');
    if (confirmation) {

        const taskIndex = obtainTaskIndexById(taskId);
        dbTasks.splice(taskIndex, 1);
        saveTasksLocalStorage();

        let li = document.getElementById('' + taskId + '');
        if(li) {
            taskList.removeChild(li);
        } else {
            alert("Elemento HTML não encontrado");
        }
    }
}

// Função que manipula a visualização das telas de editar
function alternateEditWindow() {
    editWindow.classList.toggle('open');
    backgroundEditWindow.classList.toggle('open');
}

/* Função que recolhe a posição da taskId no índice e 
retorna a informação */
function obtainTaskIndexById(taskId) {
    const taskIndex = dbTasks.findIndex(t => t.id == taskId);
    if(taskIndex < 0) {
        throw new Error('Id da tarefa não encontrado: ', taskId);
    }
    return taskIndex;
}

// Função que 
function renderTaskListHtml() {
    taskList.innerHTML = '';
    for(let i=0; i < dbTasks.length; i++) {
        let li = createTagLi(dbTasks[i]);
        taskList.appendChild(li); 
    } 
    inputNewTask.value = '';  
}

// Função que salva as tarefas atuais no localStorage
function saveTasksLocalStorage() {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(dbTasks));
}

// Função que recebe as tarefas que constam salvas no localStorage
function obtainTasksLocalStorage() {
    if(localStorage.getItem(KEY_LOCAL_STORAGE)) {
        dbTasks = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
    }  
}