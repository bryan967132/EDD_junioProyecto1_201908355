function login() {
    usuarios = window.localStorage.getItem('usuarios')
    usuario = document.getElementById('user').value
    contrasenia = document.getElementById('pass').value
    console.log(usuarios)
}
function signin() {
    dpi = document.getElementById('dpi').value
    nombre = document.getElementById('name').value
    usuario = document.getElementById('user').value
    correo = document.getElementById('email').value
    contrasenia = document.getElementById('pass').value
    telefono = document.getElementById('phone').value
}