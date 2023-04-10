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

// Manipulação de evento para quando o botão Enter do teclado for pressionado
inputNewTask.addEventListener('keypress', (e) => {

    if(e.keyCode == 13) {
        let task = {
            name: inputNewTask.value,
            id: createId(),
        }
        addTask(task);
    }
});

// Manipulação de visualização de telas de edição ao clicar no botão de saída
editWindowBtnClose.addEventListener('click', (e) => {
    alternateEditWindow();
});

// Manipulação de evento para quando o botão de adicionar tarefa for clicado
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
        let li = createTagLi(task);
        taskList.appendChild(li);
        inputNewTask.value = '';
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