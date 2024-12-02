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
  
  logoutBtn.addEventListener('click', function() {
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
});
