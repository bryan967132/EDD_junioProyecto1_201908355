function init() {
    class Nodo {
        constructor(indice,objeto) {
            this.indice = indice
            this.objeto = objeto
            this.siguiente = null
        }
    }
    class ListaSimple {
        constructor() {
            this.indice = 0
            this.primero = null
        }
        add(nuevo) {
            if(!this.primero) {
                this.primero = new Nodo(this.indice,nuevo)
                this.indice ++
                return
            }
            var actual = this.primero
            while(actual.siguiente) {
                actual = actual.siguiente
            }
            actual.siguiente = new Nodo(this.indice,nuevo)
            this.indice ++
        }
        printList() {
            var actual = this.primero
            while(actual) {
                console.log(actual.objeto)
                actual = actual.siguiente
            }
        }
    }
    class ListaDoble {
        constructor() {
            
        }
    }
    class ListaDobleCircular {
        constructor() {

        }
    }
    //window.localStorage.removeItem('inicializado')
}