const currentUser = localStorage.getItem('currentUser');

if (currentUser) {
  document.getElementById('welcome').textContent = `Bienvenido, ${currentUser}`;
} else {
  window.location.href = '../../index.html';
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

