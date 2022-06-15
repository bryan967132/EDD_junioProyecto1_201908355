//Nodos
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
class NodoAB {
    constructor(objeto,nivel,id) {
        this.objeto = objeto
        this.nivel = nivel
        this.id = id
        this.izquierda = null
        this.derecha = null
    }
}
//listas
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
        this.listaLibros = new ListaSimple()
    }
}
//árbol binario
class Arbol {
    constructor() {
        this.raiz = null
        this.dot = ''
        this.id = 0
    }
    insert(nuevo) {
        let nivel = 0
        if(!this.raiz) {
            this.raiz = new NodoAB(nuevo,nivel,this.id)
            this.dot += `nodo${this.id}${nivel} [label ="<C0>|${nuevo.nombre_autor}|<C1>"];`
            this.id ++
            return
        }
        let actual = this.raiz
        while(actual) {
            nivel ++
            if(nuevo.nombre_autor < actual.objeto.nombre_autor) {
                if(!actual.izquierda) {
                    actual.izquierda = new NodoAB(nuevo,nivel,this.id)
                    this.dot += `nodo${this.id}${nivel} [label ="<C0>|${nuevo.nombre_autor}|<C1>"];`
                    this.dot += `nodo${actual.id}${actual.nivel}:C0 -> nodo${this.id}${nivel};`
                    this.id ++
                    return
                }
                actual = actual.izquierda
            }else if(nuevo.nombre_autor > actual.objeto.nombre_autor) {
                if(!actual.derecha) {
                    actual.derecha = new NodoAB(nuevo,nivel,this.id)
                    this.dot += `nodo${this.id}${nivel} [label ="<C0>|${nuevo.nombre_autor}|<C1>"];`
                    this.dot += `nodo${actual.id}${actual.nivel}:C1 -> nodo${this.id}${nivel};`
                    this.id ++
                    return
                }
                actual = actual.derecha
            }else {
                console.log('no se permiten duplicados')
                return
            }
        }
        
    }
    getDot() {
        return `digraph G{rankdir=TB;node [shape = record];${this.dot}}`
    }
}
class NodoEncabezado {
    constructor(id) {
        this.id = id
        this.siguiente = null
        this.anterior = null
        this.acceso = null
    }
}
class NodoInterno {
    constructor(x,y,objeto) {
        this.objeto = objeto
        this.x = x
        this.y = y
        this.arriba = null
        this.abajo = null
        this.derecha = null
        this.izquierda = null
    }
}
class ListaEncabezado {
    constructor(tipo) {
        this.tipo = tipo
        this.primero = null
        this.ultimo = null
        this.size = 0
    }
    insertHeader(nuevo) {
        this.size ++
        if(!this.primero) {
            this.primero = nuevo
            this.ultimo = this.primero
            return
        }
        if(nuevo.id < this.primero.id) {
            nuevo.siguiente = this.primero
            this.primero.anterior = nuevo
            this.primero = this.primero.anterior
            return
        }
        if(nuevo.id > this.ultimo.id) {
            this.ultimo.siguiente = nuevo
            this.ultimo.siguiente.anterior = this.ultimo
            this.ultimo = this.ultimo.siguiente
            return
        }
        let actual = this.primero
        while(actual) {
            if(nuevo.id < actual.id) {
                nuevo.siguiente = actual
                nuevo.anterior = actual.anterior
                actual.anterior.siguiente = nuevo
                actual.anterior = actual.anterior.siguiente
                return
            }
            if(nuevo.id > actual.id) {
                actual = actual.siguiente
                continue
            }
            return
        }
    }
    lookHeader() {
        let actual = this.primero
        while(actual) {
            console.log(`Encabezado ${this.tipo} ${actual.id}`)
            actual = actual.siguiente
        }
    }
    getHeader(id) {
        let actual = this.primero
        while(actual) {
            if(id == actual.id) {
                return actual
            }
            actual = actual.siguiente
        }
        return null
    }
}
class MatrizDispersa {
    constructor() {
        this.filas = new ListaEncabezado('LISTAS')
        this.columnas = new ListaEncabezado('COLUMNAS')
    }
    insert(objeto) {
        let nodoInterno = new NodoInterno(objeto.fila,objeto.columna,objeto)
        let encabezadoX = this.filas.getHeader(nodoInterno.x)
        let encabezadoY = this.columnas.getHeader(nodoInterno.y)
        if(!encabezadoX) {
            encabezadoX = new NodoEncabezado(nodoInterno.x)
            this.filas.insertHeader(encabezadoX)
        }
        if(!encabezadoY) {
            encabezadoY = new NodoEncabezado(nodoInterno.y)
            this.columnas.insertHeader(encabezadoY)
        }
        if(!encabezadoX.acceso) {
            encabezadoX.acceso = nodoInterno
        }else {
            if(nodoInterno.y < encabezadoX.acceso.y) {
                nodoInterno.derecha = encabezadoX.acceso
                encabezadoX.acceso.izquierda = nodoInterno
                encabezadoX.acceso = encabezadoX.acceso.izquierda
            }else {
                let actual = encabezadoX.acceso
                while(actual) {
                    if(nodoInterno.y < actual.y) {
                        nodoInterno.derecha = actual
                        nodoInterno.izquierda = actual.izquierda
                        actual.izquierda.derecha = nodoInterno
                        actual.izquierda = actual.izquierda.derecha
                        break
                    }else {
                        if(!actual.derecha) {
                            actual.derecha = nodoInterno
                            actual.derecha.izquierda = actual
                            break
                        }else {
                            actual = actual.derecha
                        }
                    }
                }
            }
        }
        if(!encabezadoY.acceso) {
            encabezadoY.acceso = nodoInterno
        }else {
            if(nodoInterno.x < encabezadoY.acceso.x) {
                nodoInterno.abajo = encabezadoY.acceso
                encabezadoY.acceso.arriba = nodoInterno
                encabezadoY.acceso = encabezadoY.acceso.arriba
            }else {
                let actual2 = encabezadoY.acceso
                while(actual2) {
                    if(nodoInterno.x < actual2.x) {
                        nodoInterno.abajo = actual2
                        nodoInterno.arriba = actual2.arriba
                        actual2.arriba.abajo = nodoInterno
                        actual2.arriba = actual2.arriba.abajo
                        break
                    }else {
                        if(!actual2.abajo) {
                            actual2.abajo = nodoInterno
                            actual2.abajo.arriba = actual2
                            break
                        }else {
                            actual2 = actual2.abajo
                        }
                    }
                }
            }
        }
    }
    getDot() {
        let grafo = 'digraph T{\nnode[shape=box fontname="Arial" fillcolor="white" style=filled]'
        grafo += `\nroot[label = "Capa 0", group=1]\n`
        grafo += 'fontname="Arial Black" \nfontsize="15pt"\n'
        let x_fila = this.filas.primero
        while(x_fila) {
            grafo += `F${x_fila.id}[label="${x_fila.id}",fillcolor="plum",group=1];\n`
            x_fila = x_fila.siguiente
        }
        x_fila = this.filas.primero
        while(x_fila) {
            if(x_fila.siguiente) {
                grafo += `F${x_fila.id} -> F${x_fila.siguiente.id};\n`
                grafo += `F${x_fila.siguiente.id} -> F${x_fila.id};\n`
            }
            x_fila = x_fila.siguiente
        }
        let y_columna = this.columnas.primero
        while(y_columna) {
            grafo += `C${y_columna.id}[label="${y_columna.id}",fillcolor="powderblue",group=${y_columna.id + 1}];\n`
            y_columna = y_columna.siguiente
        }
        y_columna = this.columnas.primero
        while(y_columna) {
            if(y_columna.siguiente) {
                grafo += `C${y_columna.id} -> C${y_columna.siguiente.id};\n`
                grafo += `C${y_columna.siguiente.id} -> C${y_columna.id};\n`
            }
            y_columna = y_columna.siguiente
        }
        x_fila = this.filas.primero
        y_columna = this.columnas.primero
        grafo += `root -> F${x_fila.id};\nroot -> C${y_columna.id};\n`
        grafo += '{rank=same;root;'
        y_columna = this.columnas.primero
        while(y_columna) {
            grafo += `C${y_columna.id};`
            y_columna = y_columna.siguiente
        }
        grafo += '}\n'
        let actual = this.filas.primero
        let actual2 = actual.acceso
        while(actual) {
            while(actual2) {
                grafo += `N${actual2.x}_${actual2.y}[label="${actual2.objeto.nombre_libro}",group="${actual2.y + 1}"];\n`
                actual2 = actual2.derecha
            }
            actual = actual.siguiente
            if(actual) {
                actual2 = actual.acceso
            }
        }
        actual = this.filas.primero
        actual2 = actual.acceso
        while(actual) {
            let rank = `{rank=same;F${actual.id};`
            let cont = 0
            while(actual2) {
                if(cont == 0) {
                    grafo += `F${actual.id} -> N${actual2.x}_${actual2.y};\n`
                    grafo += `N${actual2.x}_${actual2.y} -> F${actual.id};\n`
                    cont ++
                }
                if(actual2.derecha) {
                    grafo += `N${actual2.x}_${actual2.y} -> N${actual2.derecha.x}_${actual2.derecha.y};\n`
                    grafo += `N${actual2.derecha.x}_${actual2.derecha.y} -> N${actual2.x}_${actual2.y};\n`
                }
                rank += `N${actual2.x}_${actual2.y};`
                actual2 = actual2.derecha
            }
            actual = actual.siguiente
            if(actual) {
                actual2 = actual.acceso
            }
            grafo += `${rank}}\n`
        }
        actual = this.columnas.primero
        actual2 = actual.acceso
        while(actual) {
            let cont = 0
            while(actual2) {
                if(cont == 0) {
                    grafo += `C${actual.id} -> N${actual2.x}_${actual2.y};\n`
                    grafo += `N${actual2.x}_${actual2.y} -> C${actual.id};\n`
                    cont ++
                }
                if(actual2.abajo) {
                    grafo += `N${actual2.x}_${actual2.y} -> N${actual2.abajo.x}_${actual2.abajo.y};\n`
                    grafo += `N${actual2.abajo.x}_${actual2.abajo.y} -> N${actual2.x}_${actual2.y};\n`
                }
                actual2 = actual2.abajo
            }
            actual = actual.siguiente
            if(actual) {
                actual2 = actual.acceso
            }
        }
        grafo += '}'
        return grafo
    }
}

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

//borrar registros
function reset() {
    if(prompt('¿Reiniciar sistema? (y/n)') == 'y') {
        localStorage.clear()
        window.location.href = 'Login.html'
    }
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

//obtener clientes
function getClients() {
    let clients = new ListaDobleCircular()
    try {
        let usersCharged = JSON.parse(localStorage.getItem('usersCharged'))
        for(let i = 0; i < usersCharged.length; i ++) {
            let user = usersCharged[i]
            if(user['rol'] == 'Usuario') {
                let newUser = new Usuario(
                    user['dpi'],
                    user['nombre_completo'],
                    user['nombre_usuario'],
                    user['correo'],
                    user['rol'],
                    user['contrasenia'],
                    user['telefono'],
                    user['compras']
                    )
                clients.add(newUser)
            }
        }
    } catch (error) {}
    return clients
}

function getBooksThriller() {
    let matrixDisperse = new MatrizDispersa()
    try{
        let booksCharged = JSON.parse(localStorage.getItem('booksCharged'))
        for(let i = 0; i < booksCharged.length; i ++) {
            let book = booksCharged[i]
            if(book['categoria'] == 'Thriller') {
                matrixDisperse.insert(
                    new Libro(
                        book['isbn'],
                        book['nombre_autor'],
                        book['nombre_libro'],
                        book['cantidad'],
                        book['fila'],
                        book['columna'],
                        book['paginas'],
                        book['categoria']
                    )
                )
            }
        }
    } catch (error) {}
    return matrixDisperse
}

//graficas
function listOfLists() {
    let clients = getClients()
    if(clients.getSize() > 0) {
        let nodos = ''
        let nodosC = 'nodo0'
        let subG = ''
        for(let i = 0; i < clients.getSize(); i ++) {
            nodos += `nodo${i}[label="${clients.get(i).nombre_completo}"];`
            subG += `subgraph subNodo${i} {`
            if(clients.get(i).listaLibros.getSize() > 0) {
            }else{
                subG += `null${i}[label="Sin Libros"];nodo${i} -> null${i};`
            }
            subG += `}`
            if(i > 0) {
                nodosC += ` -> nodo${i}`
            }
        }
        nodosC += ` -> nodo0;`
        let dot = `digraph G{node[shape="box"];${nodos}${subG}{rank=same;${nodosC}}}`
        d3.select('#listoflists').graphviz().width(1250).height(300).renderDot(dot)
        return
    }
    d3.select('#listoflists').graphviz().width(250).height(50).renderDot('digraph G{label="No hay clientes cargados"}')
}

function getAuthors() {
    let authors = new Arbol()
    try {
        let authorsCharged = JSON.parse(localStorage.getItem('authorsCharged'))
        for(let i = 0; i < authorsCharged.length; i ++) {
            let author = authorsCharged[i]
            authors.insert(
                new Autor(
                    author['dpi'],
                    author['nombre_autor'],
                    author['correo'],
                    author['telefono'],
                    author['direccion'],
                    author['biografia']
                )
            )
        }
    } catch (error) {}
    return authors
}

function binaryTree() {
    let authors = getAuthors()
    if(authors.raiz) {
        d3.select('#binarytree').graphviz().width(1250).height(600).renderDot(authors.getDot())
        return
    }
    d3.select('#binarytree').graphviz().width(250).height(50).renderDot('digraph G{label="No hay autores cargados"}')
}

function disperseMatrix() {
    let booksThriller = getBooksThriller()
    try {
        d3.select('#thriller').graphviz().width(800).height(800).renderDot(booksThriller.getDot())
        return
    } catch (error) {}
    d3.select('#thriller').graphviz().width(250).height(50).renderDot('digraph G{label="No hay libros de thriller"}')
}

function buyBook(isbn,cantidad) {
    alert(isbn + ' ' + cantidad)
}

function booksThriller() {
    code = ''
    try{
        let booksCharged = JSON.parse(localStorage.getItem('booksCharged'))
        for(let i = 0; i < booksCharged.length; i ++) {
            let book = booksCharged[i]
            if(book['categoria'] == 'Thriller') {
                code += `
            <div class="producto" id="p_${book['isbn']}" onclick="buyBook(${book['isbn']},${book['cantidad']})">
                
                <h4>${book['nombre_libro']}</h4>
                <p>Autor: ${book['nombre_autor']}</p>
                <h5><strong>Estantería</strong></h5>
                <p>Fila: ${book['fila']}</p>
                <p>Columna: ${book['columna']}</p>
            </div>`
            }
        }
    } catch (error) {}
    document.getElementById('thrillerbook').innerHTML = code
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
            listOfLists()
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
            binaryTree()
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