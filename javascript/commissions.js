var commissions = [];
var workersCommissions = [];

function loadCommissionsOnScreen() {
  var commissionsList = document.querySelector('.commissions-list');
  commissionsList.innerHTML = '';

  if (commissions.length !== 0) {
    for (var i = 0; i < commissions.length; i++) {
      var commission = commissions[i];
      var workedLi = '';

      for (var j = 0; j < commission.worked.length; j++) {
        workedLi += `<li class="worked-item">${commission.worked[j]}</li>`
      }

      commissionsList.innerHTML += `
        <li class="commission-item">
          <div class="commission-infos">
            <h3>${commission.dayOfWeek}</h3>
            <span><span>R$</span>${commission.money}</span>
          </div>
          <ul class="worked-list">
            ${workedLi}
          </ul>
          <button onclick="deleteCommission(${i})">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </li>
      `;
    }
  }
}

function resetCommissions() {
  commissions = [];
  loadCommissionsOnScreen();
  calculateResult();
}

function deleteCommission(index) {
  var commission = commissions[index];
  if (confirm(`Deseja realmente excluir '${commission.dayOfWeek}'?`)) {
    commissions.splice(index, 1);
    loadCommissionsOnScreen();
    calculateResult();
  }
}

function sendCommissionForm() {
  var inputDayOfWeek = document.querySelector('#day-of-week');
  var inputMoney = document.querySelector('#money');
  var inputWorked = document.querySelectorAll('.option input:checked');

  if (inputWorked.length === 0) {
    alert('Por favor, selecione pelo menos um(a) funcionário(a).');
    return;
  }

  commissions.push({
    dayOfWeek: inputDayOfWeek.value,
    money: String(Number(inputMoney.value).toFixed(2)).replace('.', ','),
    worked: Array.from(inputWorked).map(input => input.value)
  });

  inputDayOfWeek.value = '';
  inputMoney.value = '';
  loadWorkersMultiSelect();

  loadCommissionsOnScreen();
  calculateResult();
}

function calculateResult() {
  var commissionsResult = document.querySelector('.commissions-result');
  commissionsResult.innerHTML = '';

  if (commissions.length === 0) {
    return;
  }

  var total = 0;
  
  workersCommissions = workers.map(worker => {
    return {
      name: worker,
      commissionPerWeekday: [],
      commission: 0
    }
  });

  commissions.forEach(commission => {
    var money = Number(commission.money.replace(',', '.'))
    total += money;
    var commissionPerWorker = money / commission.worked.length;
    workersCommissions.forEach(workerCommission => {
      if (commission.worked.includes(workerCommission.name)) {
        workerCommission.commissionPerWeekday.push({
          name: commission.dayOfWeek,
          commission: commissionPerWorker
        })
        workerCommission.commission += commissionPerWorker;
      }
    })
  });

  var commissionsLi = '';
  for (var i = 0; i < workersCommissions.length; i++) {
    if (workersCommissions[i].commission > 0) {
      commissionsLi += `
        <li class="commissions-item">
          <span>${workersCommissions[i].name}</span>
          <button onclick="openReportModal(${i})">
            <span><span>R$</span>${String(parseFloat(parseInt(workersCommissions[i].commission * 100) / 100).toFixed(2)).replace('.', ',')}</span>
            <ion-icon name="information-circle-outline"></ion-icon>
          </button>
        </li>
      `;
    }
  }

  commissionsResult.innerHTML = `
    <h3>Resultado</h3>
    <ul class="commissions-values">
      ${commissionsLi}
      <li class="commissions-item">
        <span>Total</span>
        <span><span>R$</span>${String(total.toFixed(2)).replace('.', ',')}</span>
      </li>
    </ul>
  `;
}