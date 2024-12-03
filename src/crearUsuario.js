function crearUsuario(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    alert('Este nombre de usuario ya está registrado.');
    return;
  }

  const user = {
    username: username,
    password: password
  };

  users.push(user);

  localStorage.setItem('users', JSON.stringify(users));

  alert('Usuario creado exitosamente. Ahora puedes iniciar sesión.');
  window.location.href = '../../index.html';
}

document.getElementById('createUserForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;

  if (username && password) {
    crearUsuario(username, password);
  } else {
    alert('Por favor ingresa un nombre de usuario y una contraseña.');
  }
});
