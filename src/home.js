document.addEventListener('DOMContentLoaded', function () {
  const currentUser = localStorage.getItem('currentUser');
  const isFirstVisit = localStorage.getItem('isFirstVisit');

  if (currentUser) {
    if (!isFirstVisit) {
      document.getElementById('welcome').textContent = `Bienvenido, ${currentUser}`;
      localStorage.setItem('isFirstVisit', 'true');
    } else {
      const saludo = obtenerSaludo();
      document.getElementById('welcome').textContent = `${saludo}, ${currentUser}`;
    }
  } else {
    document.getElementById('welcome').textContent = `Bienvenido, Usuario`;
    window.location.href = '/index.html';
  }

  function obtenerSaludo() {
    const hora = new Date().getHours();

    if (hora >= 6 && hora < 12) {
      return "Buenos días";
    } else if (hora >= 12 && hora < 20) {
      return "Buenas tardes";
    } else {
      return "Buenas noches";
    }
  }

  function mostrarHoraLocal() {
    const fecha = new Date();

    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    const horaFormateada = `${diaSemana}, ${dia} de ${mes} de ${año}, ${horas}:${minutos}`;

    document.getElementById('hora').textContent = horaFormateada;
  }

  mostrarHoraLocal();
  setInterval(mostrarHoraLocal, 60000);

  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isFirstVisit');
    window.location.href = '/index.html';
  });

  const incomes = JSON.parse(getCookie("incomes") || "[]");
  const expenses = JSON.parse(getCookie("expenses") || "[]");

  updateFinancialSummary();

  function updateFinancialSummary() {
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const balance = totalIncome - totalExpenses;

    document.getElementById("totalIncome").textContent = `Total Ingresos: $${totalIncome.toFixed(2)}`;
    document.getElementById("totalExpenses").textContent = `Total Gastos: $${totalExpenses.toFixed(2)}`;
    document.getElementById("balance").textContent = `Balance: $${balance.toFixed(2)}`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const found = cookies.find((row) => row.startsWith(name + "="));
    return found ? found.split("=")[1] : null;
  }

  const consejos = [
    "Ahorra al menos el 10% de tus ingresos cada mes.",
    "Haz un presupuesto mensual y síguelo.",
    "Evita las compras impulsivas.",
    "Invierte en tu educación financiera.",
    "Reduce tus gastos en cosas innecesarias.",
    "Ten un fondo de emergencia para cubrir al menos 3 meses de gastos.",
    "Revisa tus suscripciones y cancela las que no uses.",
    "Compara precios antes de realizar compras grandes.",
    "Paga tus deudas lo antes posible para evitar intereses.",
    "Planifica tus metas financieras a corto y largo plazo."
  ];

  function mostrarConsejoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * consejos.length);
    const consejo = consejos[indiceAleatorio];
    document.querySelector('#summary + section').innerHTML += `<p>${consejo}</p>`;
  }

  mostrarConsejoAleatorio();

  const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
  const reminderButton = document.getElementById('reminderButton');
  const reminderForm = document.getElementById('reminderForm');
  const reminderMessage = document.getElementById('reminderMessage');
  const reminderDate = document.getElementById('reminderDate');
  const reminderTime = document.getElementById('reminderTime');
  const submitReminder = document.getElementById('submitReminder');
  const reminderList = document.getElementById('reminderList');
  const remindersContainer = document.getElementById('reminder');

  reminderButton.addEventListener('click', function () {
    if (reminderForm.style.display === 'flex') {
      reminderForm.style.display = 'none';
    } else {
      reminderForm.style.display = 'flex';
    }
  });

  submitReminder.addEventListener('click', () => {
    const mensaje = reminderMessage.value;
    const fecha = reminderDate.value;
    const hora = reminderTime.value;

    if (mensaje && fecha && hora) {
      const dateTime = new Date(`${fecha}T${hora}`);
      reminders.push({ mensaje, dateTime: dateTime.toISOString() });
      localStorage.setItem('reminders', JSON.stringify(reminders));

      alert('Recordatorio añadido con éxito.');
      reminderMessage.value = '';
      reminderDate.value = '';
      reminderTime.value = '';
      reminderForm.style.display = 'none';
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  });

  function renderLog() {
    reminderList.innerHTML = '';
    reminders.forEach((recordatorio, index) => {
      const li = document.createElement('li');
      const reminderTime = new Date(recordatorio.dateTime).toLocaleString();
      li.textContent = `${recordatorio.mensaje} - ${reminderTime}`;
      reminderList.appendChild(li);
    });
  }

  function verificarRecordatorios() {
    const now = new Date();

    reminders.forEach((recordatorio, index) => {
      const reminderTime = new Date(recordatorio.dateTime);

      if (reminderTime <= now) {
        const reminderElement = document.createElement('p');
        reminderElement.innerHTML = `
          ${recordatorio.mensaje}
          <button class="vale-btn">Vale</button>
        `;
        remindersContainer.appendChild(reminderElement);

        const valeButton = reminderElement.querySelector('.vale-btn');
        valeButton.addEventListener('click', () => {
          reminders.splice(index, 1);
          localStorage.setItem('reminders', JSON.stringify(reminders));
          reminderElement.remove();
        });
      }
    });
  }

  setInterval(verificarRecordatorios, 60000);
});
