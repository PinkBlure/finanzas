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

  const incomes = JSON.parse(localStorage.getItem("incomes") || "[]");
  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

  const reminderList = JSON.parse(localStorage.getItem('reminders') || '[]');
  const reminderForm = document.getElementById('reminderForm');
  const addReminderBtn = document.getElementById('addReminderBtn');
  const reminderListElement = document.getElementById('reminderList');

  function displayReminders() {
    reminderListElement.innerHTML = '';

    const currentTime = Date.now();

    const upcomingReminders = reminderList.filter(reminder => {
      return reminder.dateTimestamp <= currentTime && !reminder.seen;
    });

    upcomingReminders.forEach(reminder => {
      const reminderElement = document.createElement('div');
      reminderElement.classList.add('reminder');
      reminderElement.innerHTML = `
        <p>${reminder.message} - <strong>${reminder.date}</strong></p>
        <button class="reminderBtn" data-id="${reminder.id}">Vale</button>
      `;
      reminderListElement.appendChild(reminderElement);
      reminder.seen = true;
      localStorage.setItem('reminders', JSON.stringify(reminderList));
    });
  }

  addReminderBtn.addEventListener('click', function () {
    reminderForm.style.display = reminderForm.style.display === 'none' ? 'block' : 'none';
  });

  reminderForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const message = document.getElementById('reminderMessage').value;
    const date = document.getElementById('reminderDate').value;
    const dateTimestamp = new Date(date).getTime();

    const newReminder = {
      id: Date.now(),
      message: message,
      date: date,
      dateTimestamp: dateTimestamp,
      seen: false
    };
    reminderList.push(newReminder);
    localStorage.setItem('reminders', JSON.stringify(reminderList));

    reminderForm.reset();
    reminderForm.style.display = 'none';
    displayReminders();
  });

  reminderListElement.addEventListener('click', function (event) {
    if (event.target.classList.contains('reminderBtn')) {
      const reminderId = event.target.getAttribute('data-id');
      const reminderIndex = reminderList.findIndex(r => r.id == reminderId);

      if (reminderIndex !== -1) {
        reminderList.splice(reminderIndex, 1);
        localStorage.setItem('reminders', JSON.stringify(reminderList));
        displayReminders();
      }
    }
  });

  setInterval(displayReminders, 60000);

  displayReminders();

  function updateFinancialSummary() {
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const balance = totalIncome - totalExpenses;

    document.getElementById("totalIncome").textContent = `Total Ingresos: $${totalIncome.toFixed(2)}`;
    document.getElementById("totalExpenses").textContent = `Total Gastos: $${totalExpenses.toFixed(2)}`;
    document.getElementById("balance").textContent = `Balance: $${balance.toFixed(2)}`;
  }

  updateFinancialSummary();

  const consejos = [
    "Ahorrar un porcentaje de tus ingresos cada mes es una excelente manera de asegurar tu futuro.",
    "Haz un presupuesto mensual y ajústate a él para evitar gastos innecesarios.",
    "Evita las deudas de alto interés, ya que pueden acumularse rápidamente.",
    "Invierte en tu educación financiera para tomar mejores decisiones económicas.",
    "Haz una revisión mensual de tus finanzas para saber si estás cumpliendo tus objetivos.",
    "Recuerda que cada pequeño ahorro cuenta. No subestimes los detalles.",
    "Haz un fondo de emergencia para imprevistos, como reparaciones o situaciones inesperadas.",
    "Comparar precios antes de comprar puede ayudarte a ahorrar mucho dinero a largo plazo.",
    "Planifica tus gastos y ahorros a largo plazo para tener una vida financiera estable.",
    "La constancia y disciplina en tus finanzas personales te llevará al éxito."
  ];

  function mostrarConsejoAleatorio() {
    const consejoAleatorio = consejos[Math.floor(Math.random() * consejos.length)];
    const consejoElemento = document.getElementById("consejo");
    consejoElemento.innerHTML = `<h3 class="tableTitle">Consejos</h3><p>${consejoAleatorio}</p>`;
  }

  mostrarConsejoAleatorio();
});
