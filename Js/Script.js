//objetos
class Libro {
    constructor(isbn,nombre_autor,nombre_libro,cantidad,fila,columna,paginas,categoria) {
        this.isbn = isbn
        this.nombre_autor = nombre_autor
        this.nombre_libro = nombre_libro
        this.cantidad = cantidad
        this.fila = fila
        this.columna = columna
        this.paginas = paginas
        this.categoria = categoria
    }
}
class Autor {
    constructor(dpi,nombre_autor,correo,telefono,direccion,biografia) {
        this.dpi = dpi
        this.nombre_autor = nombre_autor
        this.correo = correo
        this.telefono = telefono
        this.direccion = direccion
        this.biografia = biografia
    }
}
class Usuario {
    constructor(dpi,nombre_completo,nombre_usuario,correo,rol,contrasenia,telefono,compras) {
        this.dpi = dpi
        this.nombre_completo = nombre_completo
        this.nombre_usuario = nombre_usuario
        this.correo = correo
        this.rol = rol
        this.contrasenia = contrasenia
        this.telefono = telefono
        this.compras = compras
    }
}
class NodoS {
    constructor(indice,objeto) {
        this.indice = indice
        this.objeto = objeto
        this.siguiente = null
    }
}
class NodoD {
    constructor(indice,objeto) {
        this.indice = indice
        this.objeto = objeto
        this.siguiente = null
        this.anterior = null
    }
}
class ListaSimple {
    constructor() {
        this.indice = 0
        this.primero = null
    }
    add(nuevo) {
        if(!this.primero) {
            this.primero = new NodoS(this.indice,nuevo)
            this.indice ++
            return
        }
        var actual = this.primero
        while(actual.siguiente) {
            actual = actual.siguiente
        }
        actual.siguiente = new NodoS(this.indice,nuevo)
        this.indice ++
    }
    get(indice) {
        var actual = this.primero
        while(actual) {
            if(actual.indice == indice) {
                return actual.objeto
            }
            actual = actual.siguiente
        }
    }
    getSize() {
        return this.indice
    }
}
class ListaDoble {
    constructor() {
        this.indice = 0
        this.primero = null
        this.ultimo = null
    }
    add(nuevo) {
        if(!this.primero) {
            this.primero = new NodoD(this.indice,nuevo)
            this.ultimo = this.primero
            this.indice ++
            return
        }
        this.ultimo.siguiente = new NodoD(this.indice,nuevo)
        this.ultimo.siguiente.anterior = this.ultimo
        this.ultimo = this.ultimo.siguiente
        this.indice ++
    }
    get(indice) {
        var actual = this.primero
        while(actual) {
            if(actual.indice == indice) {
                return actual.objeto
            }
            actual = actual.siguiente
        }
    }
    getSize() {
        return this.indice
    }
}
class ListaDobleCircular {
    constructor() {
        this.indice = 0
        this.primero = null
        this.ultimo = null
    }
    add(nuevo) {
        if(!this.primero) {
            this.primero = new NodoD(this.indice,nuevo)
            this.primero.siguiente = this.primero
            this.primero.anterior = this.primero
            this.ultimo = this.primero
            this.indice ++
            return
        }
        this.ultimo.siguiente = new NodoD(this.indice,nuevo)
        this.ultimo.siguiente.anterior = this.ultimo
        this.ultimo = this.ultimo.siguiente
        this.ultimo.siguiente = this.primero
        this.primero.anterior = this.ultimo
        this.indice ++
    }
    get(indice) {
        var actual = this.primero
        while(actual) {
            if(actual.indice == indice) {
                return actual.objeto
            }
            actual = actual.siguiente
        }
    }
    getSize() {
        return this.indice
    }
}

//borrar registros
//localStorage.clear()

//inicialización
if(localStorage.getItem('userMaster') == null) {
    localStorage.setItem('userMaster',JSON.stringify(new Usuario(2354168452525,'Wilfred Perez','Wilfred','wilfred@bitrex.com','Administrador','123','+502 (123) 123-4567',0)))
}
if(localStorage.getItem('usersCharged') == null) {
    localStorage.setItem('usersCharged','')
}
if(localStorage.getItem('authorsCharged') == null) {
    localStorage.setItem('authorsCharged','')
}

//obtener lista de usuarios
function getUsers() {
    var master = JSON.parse(localStorage.getItem('userMaster'))
    var users = new ListaDobleCircular()
    users.add(
        new Usuario(
            master['dpi'],
            master['nombre_completo'],
            master['nombre_usuario'],
            master['correo'],
            master['rol'],
            master['contrasenia'],
            master['telefono'],
            master['compras']
        )
    )
    try {
        var usersCharged = JSON.parse(localStorage.getItem('usersCharged'))
        for(var i = 0; i < usersCharged.length; i ++) {
            var user = usersCharged[i]
            users.add(
                new Usuario(
                    user['dpi'],
                    user['nombre_completo'],
                    user['nombre_usuario'],
                    user['correo'],
                    user['rol'],
                    user['contrasenia'],
                    user['telefono'],
                    user['compras']
                )
            )
        }
    } catch (error) {}
    return users
}

//búsquedas
function searchByUsername(user) {
    var users = getUsers()
    for(var i = 0; i < users.getSize(); i ++) {
        if(user == users.get(i).nombre_usuario) {
            return true
        }
    }
    return false
}

function searchByDpi(dpi) {
    var users = getUsers()
    for(var i = 0; i < users.getSize(); i ++) {
        if(dpi == users.get(i).dpi) {
            return true
        }
    }
    return false
}

//crear usuarios en storage
function createUser(dpi,name,username,email,rol,password,phone) {
    var usersCharged = localStorage.getItem('usersCharged')
    usersCharged = usersCharged.replace('[','').replace(']','')
    if(usersCharged == '') {
        usersCharged += `[${JSON.stringify(new Usuario(dpi,name,username,email,rol,password,phone,0))}]`
        localStorage.setItem('usersCharged',usersCharged)
        return
    }
    usersCharged += `,${JSON.stringify(new Usuario(dpi,name,username,email,rol,password,phone,0))}`
    usersCharged = `[${usersCharged}]`
    localStorage.setItem('usersCharged',usersCharged)
}

//crear autores en storage
function createAuthor(dpi,name,email,phone,adress,biographic) {
    var authorsCharged = localStorage.getItem('authorsCharged')
    authorsCharged = authorsCharged.replace('[','').replace(']','')
    if(authorsCharged == '') {
        authorsCharged += `[${JSON.stringify(new Autor(dpi,name,email,phone,adress,biographic))}]`
        localStorage.setItem('authorsCharged',authorsCharged)
        return
    }
    authorsCharged += `,${JSON.stringify(new Autor(dpi,name,email,phone,adress,biographic))}`
    authorsCharged = `[${authorsCharged}]`
    localStorage.setItem('authorsCharged',authorsCharged)
}

//autenticación
function login() {
    var username = document.getElementById('user').value
    var password = document.getElementById('pass').value
    if(username.replace(' ','') == '' || password.replace(' ','') == '') {
        alert('Todos los campos son obligatorios')
    }else{
        var users = getUsers()
        for(var i = 0; i < users.getSize(); i ++) {
            if(username == users.get(i).nombre_usuario && password == users.get(i).contrasenia) {
                alert('Bienvenido ' + users.get(i).nombre_completo)
                if(users.get(i).rol == 'Administrador') {
                    window.location.href = 'AdminProfile.html'
                }else if(users.get(i).rol == 'Usuario') {
                    window.location.href = 'UserProfile.html'
                }
            }
        }
    }
}

function signin() {
    var dpi = document.getElementById('dpi').value
    var name = document.getElementById('name').value
    var username = document.getElementById('user').value
    var email = document.getElementById('email').value
    var password = document.getElementById('pass').value
    var phone = document.getElementById('phone').value
    var msg = ''
    if(
        dpi.replace(' ','') == '' || name.replace(' ','') == '' ||
        username.replace(' ','') == '' || email.replace(' ','') == '' ||
        password.replace(' ','') == '' || phone.replace(' ','') == ''
    ) {
        alert('Todos los campos son obligatorios')
        return
    }
    if(searchByUsername(username)) {
        msg += 'El nombre de usuario ya existe, intente con otro'
        document.getElementById('user').value = ''
    }
    if(searchByDpi(dpi)) {
        if(msg != '') msg += '\n'
        msg += 'El dpi ya existe, intente con otro'
        document.getElementById('dpi').value = ''
    }
    if(msg != '') {
        alert(msg)
        return
    }
    createUser(parseInt(dpi),name,username,email,'Usuario',password,phone)
    alert('Usuario creado exitosamente')
    window.location.href = 'Login.html'
}

//cargas masivas
//---usuarios
function chargeUsers() {
    let file = document.getElementById('fileusers').files[0]
    if(file) {
        let reader = new FileReader()
        reader.readAsText(file,'UTF-8')
        reader.onload = function(evt) {
            let users = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result}))['data'])
            for(var i = 0; i < users.length; i ++) {
                let user = users[i]
                createUser(
                    user['dpi'],
                    user['nombre_completo'],
                    user['nombre_usuario'],
                    user['correo'],
                    user['rol'],
                    user['contrasenia'],
                    user['telefono']
                )
            }
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
        document.getElementById('fileusers').value = ''
    }
}