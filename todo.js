
const Form = document.querySelector(".js-Tasks__form"),
  Input = Form.querySelector(".js-Tasks__input"),
  PendingUl = document.querySelector(".pending-ul"),
  FinishedUl = document.querySelector(".finished-ul");

const PENDING = "pending";
const FINISHED = "finished";
let PendingList = [];
let FinishedList = [];

function paintPendingList(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = PendingList.length + 1;
  delBtn.innerText = "❌";
  checkBtn.innerText = "✔️";
  delBtn.addEventListener("click", deletePending);
  checkBtn.addEventListener("click", moveFinished);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.appendChild(span);
  li.id = newId;
  PendingUl.appendChild(li);
  const pendingObj = {
    text: text,
    id: newId
  };
  PendingList.push(pendingObj);
  saveToDos();
}
function paintFinishedList(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const uncheckBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = FinishedList.length + 1;
  delBtn.innerText = "❌";
  uncheckBtn.innerText = "☑️";
  delBtn.addEventListener("click", deleteFinished);
  uncheckBtn.addEventListener("click", movePending);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(uncheckBtn);
  li.appendChild(span);
  li.id = newId;
  FinishedUl.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId
  };
  FinishedList.push(finishedObj);
  saveToDos();
}
function saveToDos() {
  localStorage.setItem(PENDING, JSON.stringify(PendingList));
  localStorage.setItem(FINISHED, JSON.stringify(FinishedList));
}
function deletePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  PendingUl.removeChild(li);
  const cleanToDos = PendingList.filter(function (pending) {
    return pending.id !== parseInt(li.id);
  });
  PendingList = cleanToDos;
  saveToDos();
}
function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  FinishedUl.removeChild(li);
  const cleanToDos = FinishedList.filter(function (finished) {
    return finished.id !== parseInt(li.id);
  });
  FinishedList = cleanToDos;
  saveToDos();
}
function moveFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.querySelector("span").innerText;
  deletePending(event);
  const cleanToDos = PendingList.filter(function (toDo) {
    return PendingList.id !== parseInt(li.id);
  });
  PendingList = cleanToDos;
  saveToDos();
  paintFinishedList(text);
}
function movePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.querySelector("span").innerText;
  deleteFinished(event);
  const cleanToDos = FinishedList.filter(function (toDo) {
    return FinishedList.id !== parseInt(li.id);
  });
  FinishedList = cleanToDos;
  paintPendingList(text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = Input.value;
  paintPendingList(currentValue);
  Input.value = "";
}

function loadToDos() {
  const loadedPending = localStorage.getItem(PENDING);
  const loadedFinished = localStorage.getItem(FINISHED);
  if (loadedPending !== null || loadedFinished !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (pending) {
      paintPendingList(pending.text);
    });

    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (finished) {
      paintFinishedList(finished.text);
    });
  }
}

function init() {
  loadToDos();
  Form.addEventListener("submit", handleSubmit);
}

init();
