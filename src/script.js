function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('currentUser', username);
    window.location.href = './src/pages/home.html';
  } else {
    alert('Usuario o contraseña incorrectos.');
  }
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    loginUser(username, password);
  } else {
    alert('Por favor ingresa tu nombre de usuario y contraseña.');
  }
});
