const inputTarefa = document.querySelector(".input-nova-tarefa");
const addTarefa = document.querySelector(".btn-add-tarefa");
const Tarefas = document.querySelector(".tarefas");

function criaLi() {
  const li = document.createElement("li");
  return li;
}

inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

function criaBotaoApagar(li) {
  li.innerText += " ";
  const botaoApagar = document.createElement("button");
  botaoApagar.innerText = "Apagar";
  botaoApagar.setAttribute("class", "apagar");
  botaoApagar.setAttribute("title", "apagar esta tarefa");
  li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  Tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

addTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = Tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.firstChild.textContent.trim();
    tarefaTexto = tarefaTexto.replace("apagar", " ").trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

function readSavedTasks() {
  const tarefas = localStorage.getItem("tarefas");

  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

readSavedTasks();
