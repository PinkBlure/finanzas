document.addEventListener('DOMContentLoaded', function () {
  const currentUser = localStorage.getItem('currentUser');
  
  if (currentUser) {
    document.getElementById('welcome').textContent = `Bienvenido, ${currentUser}`;
  } else {
    window.location.href = '/index.html';
  }

  function mostrarHoraLocal() {
    const fecha = new Date();

    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dia = diasSemana[fecha.getDay()];

    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    const horaFormateada = `${dia}, ${horas}:${minutos}`;

    document.getElementById('hora').textContent = horaFormateada;
  }

  mostrarHoraLocal();
  setInterval(mostrarHoraLocal, 60000);

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
