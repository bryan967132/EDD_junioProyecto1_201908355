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

if(localStorage.getItem('userMaster') == null) {
    localStorage.setItem('userMaster',JSON.stringify(new Usuario(2354168452525,'Wilfred Perez','Wilfred','wilfred@bitrex.com','Administrador',123,'+502 (123) 123-4567',0)))
}
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

function login() {
    var users = getUsers()
    
}