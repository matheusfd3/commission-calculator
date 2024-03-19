function closeReportModal() {
  document.getElementById('report-modal-container').style.display = 'none';
}

function openReportModal(workerCommissionIndex) {
  var reportModalTitle = document.getElementById('report-modal-title');
  var reportModalWhatsAppLink = document.getElementById('report-modal-share-on-whatsapp');
  var reportModalContent = document.getElementById('report-list');

  var workerCommission = workersCommissions[workerCommissionIndex];

  reportModalTitle.textContent = `Relatório de ${workerCommission.name}${workerCommission.name == "Elaine" ? " ❤️" : ""}`;

  var linkWhatsApp = `whatsapp://send?text=*Comissão%20de%20${workerCommission.name}*%0A`;
  var commissionPerWeekDayLi = '';
  workerCommission.commissionPerWeekday.forEach(weekday => {
    linkWhatsApp += `${weekday.name}%20você%20ganhou%20R$%20${String(parseFloat(parseInt(weekday.commission * 100) / 100).toFixed(2)).replace('.', ',')}%0A`
    commissionPerWeekDayLi += `
      <li class="report-item">
        <span>${weekday.name}</span>
        <span>R$ ${String(parseFloat(parseInt(weekday.commission * 100) / 100).toFixed(2)).replace('.', ',')}</span>
      </li>
    `;
  });

  linkWhatsApp += `Total%20R$%20${String(parseFloat(parseInt(workerCommission.commission * 100) / 100).toFixed(2)).replace('.', ',')}`;
  reportModalWhatsAppLink.href = linkWhatsApp;

  reportModalContent.innerHTML = `
    ${commissionPerWeekDayLi}
    <li class="report-item">
      <span>Total</span>
      <span>R$ ${String(parseFloat(parseInt(workerCommission.commission * 100) / 100).toFixed(2)).replace('.', ',')}</span>
    </li>
  `;

  document.getElementById('report-modal-container').style.display = 'flex';
  console.log(workerCommission);
}