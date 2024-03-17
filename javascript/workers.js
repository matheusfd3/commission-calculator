var workers = [];

function loadWorkersFromLocalStorage() {
  workers = JSON.parse(localStorage.getItem('workers'));
  if (workers === null) {
    workers = [];
  }
  loadWorkersOnScreen();
}

function saveWorkerToLocalStorage() {
  localStorage.setItem('workers', JSON.stringify(workers));
}

function loadWorkersOnScreen() {
  var workersList = document.querySelector('.workers-list');
  workersList.innerHTML = '';

  if (workers.length === 0) {
    workersList.innerHTML = `
      <li class="without-workers">
        <p>Sem funcionários cadastrados</p>
      </li>
    `;
  } else {
    for (var i = 0; i < workers.length; i++) {
      var worker = workers[i];
      workersList.innerHTML += `
        <li class="worker">
          <div class="worker-infos">
            <span class="worker-pic">
              <ion-icon name="person-outline"></ion-icon>
            </span>
            <span class="worker-name">${worker}</span>
          </div>
          <ul class="worker-actions">
            <li class="worker-action">
              <button onclick="updateWorker(${i})">
                <ion-icon name="create-outline"></ion-icon>
              </button>
            </li>
            <li class="worker-action">
              <button onclick="deleteWorker(${i})">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </li>
          </ul>
        </li>
      `;
    }
  }
}

function createWorker(worker) {
  workers.push(worker);
  workers.sort(function(a, b) {
    let lowerA = a.toLowerCase();
    let lowerB = b.toLowerCase();
    if (lowerA < lowerB) return -1;
    if (lowerA > lowerB) return 1;
    return 0;
  });
  saveWorkerToLocalStorage();
  loadWorkersOnScreen();
  loadWorkersMultiSelect();
}

function updateWorker(index) {
  var worker = workers[index];
  var newWorkerName = prompt('Digite o novo nome do(a) funcionário(a)', worker).trim();

  if (newWorkerName == worker || newWorkerName === null) {
    return;
  } else if (newWorkerName === '') {
    alert('Por favor, insira um nome válido.');
    return;
  } else if (workers.includes(newWorkerName)) {
    alert('Já existe um funcionário(a) cadastrado com este nome!');
    return;
  }

  workers[index] = newWorkerName;
  workers.sort(function(a, b) {
    let lowerA = a.toLowerCase();
    let lowerB = b.toLowerCase();
    if (lowerA < lowerB) return -1;
    if (lowerA > lowerB) return 1;
    return 0;
  });
  saveWorkerToLocalStorage();
  loadWorkersOnScreen();
  loadWorkersMultiSelect();
  resetCommissions();
}
function deleteWorker(index) {
  var worker = workers[index];
  if (confirm(`Deseja realmente excluir o(a) funcionário(a) '${worker}'?`)) {
    workers.splice(index, 1);
    saveWorkerToLocalStorage();
    loadWorkersOnScreen();
    loadWorkersMultiSelect();
    resetCommissions();
  }
}

function sendWorkerForm() {
  var inputWorker = document.querySelector('input#worker-name')
  var workerName = inputWorker.value.trim();
  inputWorker.value = '';
  if (workerName === '') {
    alert('Por favor, insira um nome válido.');
    return;
  } else if (workers.includes(workerName)) {
    alert('Já existe um funcionário(a) cadastrado com este nome!');
    return;
  }
  createWorker(workerName);
}