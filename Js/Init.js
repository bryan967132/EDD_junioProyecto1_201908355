function init() {
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
        printList() {
            var actual = this.primero
            while(actual) {
                console.log(actual.objeto)
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
                return
            }
            this.ultimo.siguiente = new NodoD(this.indice,nuevo)
            this.ultimo.siguiente.anterior = this.ultimo
            this.ultimo = this.ultimo.siguiente
            this.ultimo.siguiente = this.primero
            this.primero.anterior = this.ultimo
        }
        getSize() {
            return this.indice
        }
    }
    usuariosTop = new ListaDoble()
    usuarios = new ListaDobleCircular()
    window.localStorage.setItem('usuariosTop',usuariosTop)
    window.localStorage.setItem('usuarios',usuarios)
    window.localStorage.setItem('inicializado',true)
}