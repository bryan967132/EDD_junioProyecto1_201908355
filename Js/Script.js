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
        let actual = this.primero
        while(actual.siguiente) {
            actual = actual.siguiente
        }
        actual.siguiente = new NodoS(this.indice,nuevo)
        this.indice ++
    }
    get(indice) {
        let actual = this.primero
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
        let actual = this.primero
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
        let actual = this.primero
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
if(localStorage.getItem('booksCharged') == null) {
    localStorage.setItem('booksCharged','')
}

//obtener lista de usuarios
function getUsers() {
    let master = JSON.parse(localStorage.getItem('userMaster'))
    let users = new ListaDobleCircular()
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
        let usersCharged = JSON.parse(localStorage.getItem('usersCharged'))
        for(let i = 0; i < usersCharged.length; i ++) {
            let user = usersCharged[i]
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
    let users = getUsers()
    for(let i = 0; i < users.getSize(); i ++) {
        if(user == users.get(i).nombre_usuario) {
            return true
        }
    }
    return false
}

function searchByDpi(dpi) {
    let users = getUsers()
    for(let i = 0; i < users.getSize(); i ++) {
        if(dpi == users.get(i).dpi) {
            return true
        }
    }
    return false
}

//crear
function createUser(dpi,name,username,email,rol,password,phone) {
    let usersCharged = localStorage.getItem('usersCharged')
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

function createAuthor(dpi,name,email,phone,adress,biographic) {
    let authorsCharged = localStorage.getItem('authorsCharged')
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

function createBook(isbn,author,title,cuantity,row,column,pages,category) {
    let booksCharged = localStorage.getItem('booksCharged')
    booksCharged = booksCharged.replace('[','').replace(']','')
    if(booksCharged == '') {
        booksCharged += `[${JSON.stringify(new Libro(isbn,author,title,cuantity,row,column,pages,category))}]`
        localStorage.setItem('booksCharged',booksCharged)
        return
    }
    booksCharged += `,${JSON.stringify(new Libro(isbn,author,title,cuantity,row,column,pages,category))}`
    booksCharged = `[${booksCharged}]`
    localStorage.setItem('booksCharged',booksCharged)
}

//autenticación
function login() {
    let username = document.getElementById('user').value
    let password = document.getElementById('pass').value
    if(username.replace(' ','') == '' || password.replace(' ','') == '') {
        alert('Todos los campos son obligatorios')
    }else{
        let users = getUsers()
        for(let i = 0; i < users.getSize(); i ++) {
            if(username == users.get(i).nombre_usuario && password == users.get(i).contrasenia) {
                alert('Bienvenido ' + users.get(i).nombre_completo)
                if(users.get(i).rol == 'Administrador') {
                    window.location.href = 'AdminProfile.html'
                    return
                }else if(users.get(i).rol == 'Usuario') {
                    window.location.href = 'UserProfile.html'
                    return
                }
            }
        }
        alert('Usuario no registrado')
        document.getElementById('user').value = ''
        document.getElementById('pass').value = ''
    }
}

function signin() {
    let dpi = document.getElementById('dpi').value
    let name = document.getElementById('name').value
    let username = document.getElementById('user').value
    let email = document.getElementById('email').value
    let password = document.getElementById('pass').value
    let phone = document.getElementById('phone').value
    let msg = ''
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
            for(let i = 0; i < users.length; i ++) {
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
            alert('Usuarios cargados')
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
        document.getElementById('fileusers').value = ''
    }
}

//---autores
function chargeAuthors() {
    let file = document.getElementById('fileauthors').files[0]
    if(file) {
        let reader = new FileReader()
        reader.readAsText(file,'UTF-8')
        reader.onload = function(evt) {
            let authors = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result}))['data'])
            for(let i = 0; i < authors.length; i ++) {
                let author = authors[i]
                createAuthor(
                    author['dpi'],
                    author['nombre_autor'],
                    author['correo'],
                    author['telefono'],
                    author['direccion'],
                    author['biografia']
                )
            }
            alert('Autores cargados')
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
        document.getElementById('fileauthors').value = ''
    }
}

//---libros
function chargeBooks() {
    let file = document.getElementById('filebooks').files[0]
    if(file) {
        let reader = new FileReader()
        reader.readAsText(file,'UTF-8')
        reader.onload = function(evt) {
            let books = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result}))['data'])
            console.log(books)
            for(let i = 0; i < books.length; i ++) {
                let book = books[i]
                createBook(
                    book['isbn'],
                    book['nombre_autor'],
                    book['nombre_libro'],
                    book['cantidad'],
                    book['fila'],
                    book['columna'],
                    book['paginas'],
                    book['categoria']
                )
            }
            alert('Libros cargados')
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
        document.getElementById('filebooks').value = ''
    }
}