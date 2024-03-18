function loadWorkersMultiSelect() {
  var multiSelect = document.querySelector('#options');
  multiSelect.innerHTML = '';

  for (let i = 0; i < workers.length; i++) {
    var worker = workers[i];
    multiSelect.innerHTML += `
      <li class="option ${worker == "Elaine" ? "elaine" : ""}">
        <input 
          type="checkbox"
          name="worked"
          value="${worker}"
          data-label="${worker}"
          onclick="updateMultiSelectValue()"
          checked
        >
        ${worker == "Elaine" ? "<ion-icon name='heart-circle-outline'></ion-icon>" : "<ion-icon name='person-circle-outline'></ion-icon>"}
        <span class="label">${worker}</span>
        <ion-icon name="checkmark-outline"></ion-icon>
      </li>
    `;
  }

  updateMultiSelectValue();
}

function updateMultiSelectValue() {
  var multiSelectValue = document.querySelector('#selected-value');
  var inputOptionsChecked = document.querySelectorAll('.option input:checked');
  
  if (workers.length === 0) {
    multiSelectValue.textContent = 'Sem funcionário';
  } else if (inputOptionsChecked.length === workers.length) {
    multiSelectValue.textContent = 'Todos';
  } else if (inputOptionsChecked.length === 0) {
    multiSelectValue.textContent = 'Nenhum';
  } else {
    multiSelectValue.textContent = inputOptionsChecked.length + ' funcionário(s)';
  }
}
  