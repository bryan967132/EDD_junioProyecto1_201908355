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
    constructor(dpi,nombre_completo,nombre_usuario,correo,rol,contrasenia,telefono,compras,ncompras) {
        this.dpi = dpi
        this.nombre_completo = nombre_completo
        this.nombre_usuario = nombre_usuario
        this.correo = correo
        this.rol = rol
        this.contrasenia = contrasenia
        this.telefono = telefono
        this.compras = compras
        this.ncompras = ncompras
    }
}

class Compra {
    constructor(isbn,nombre_autor,nombre_libro,cantidad,paginas,categoria) {
        this.isbn = isbn
        this.nombre_autor = nombre_autor
        this.nombre_libro = nombre_libro
        this.cantidad = cantidad
        this.paginas = paginas
        this.categoria = categoria
    }
}

class Espera {
    constructor(nombre_completo,nombre_libro,cantidad) {
        this.nombre_completo = nombre_completo
        this.nombre_libro = nombre_libro
        this.cantidad = cantidad
    }
}

//listas
class ListaSimple {
    constructor() {
        this.indice = 0
        this.primero = null
    }
    add(nuevo) {
        if(this.primero) {
            let actual = this.primero
            while(actual.siguiente) {
                actual = actual.siguiente
            }
            actual.siguiente = new NodoS(this.indice,nuevo)
            this.indice ++
            return
        }
        this.primero = new NodoS(this.indice,nuevo)
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
    tour() {
        let actual = this.primero
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
        if(this.primero) {
            this.ultimo.siguiente = new NodoD(this.indice,nuevo)
            this.ultimo.siguiente.anterior = this.ultimo
            this.ultimo = this.ultimo.siguiente
            this.indice ++
            return
        }
        this.primero = new NodoD(this.indice,nuevo)
        this.ultimo = this.primero
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
    bubbleSortByName() {
        this.bubbleSortR1(this.primero)
    }
    bubbleSortR1(nodoI) {
        if(nodoI.indice < this.ultimo.indice) {
            this.bubbleSortR2(nodoI,this.primero)
            this.bubbleSortR1(nodoI.siguiente)
        }
    }
    bubbleSortR2(nodoI,nodoX) {
        if(nodoX.indice < this.ultimo.indice - nodoI.indice) {
            if(nodoX.objeto.nombre_libro > nodoX.siguiente.objeto.nombre_libro) {
                let temporal = nodoX.objeto
                nodoX.objeto = nodoX.siguiente.objeto
                nodoX.siguiente.objeto = temporal
            }
            this.bubbleSortR2(nodoI,nodoX.siguiente)
        }
    }
    quickSortByName() {
        this.quickSortR1(this.primero,this.ultimo)
    }
    quickSortR1(izquierda,derecha) {
        if(izquierda.indice < derecha.indice) {
            let nodoParticion = this.partition(izquierda.objeto.nombre_libro,izquierda,derecha)
            this.quickSortR1(izquierda,nodoParticion)
            this.quickSortR1(nodoParticion.siguiente,derecha)
        }
    }
    partition(pivote,izquierda,derecha) {
        while(izquierda.objeto.nombre_libro > pivote) {
            izquierda = izquierda.siguiente
        }
        while(derecha.objeto.nombre_libro < pivote) {
            derecha = derecha.anterior
        }
        if(izquierda.indice >= derecha.indice) {
            return derecha
        }
        let temporal = izquierda.objeto
        izquierda.objeto = derecha.objeto
        derecha.objeto = temporal
        return this.partition(pivote,izquierda.siguiente,derecha.anterior)
    }
    tour() {
        let actual = this.primero
        let cont = 0
        while(cont < this.indice) {
            console.log(actual.objeto)
            actual = actual.siguiente
            cont ++
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
        if(this.primero) {
            this.ultimo.siguiente = new NodoD(this.indice,nuevo)
            this.ultimo.siguiente.anterior = this.ultimo
            this.ultimo = this.ultimo.siguiente
            this.ultimo.siguiente = this.primero
            this.primero.anterior = this.ultimo
            this.indice ++
            return
        }
        this.primero = new NodoD(this.indice,nuevo)
        this.primero.siguiente = this.primero
        this.primero.anterior = this.primero
        this.ultimo = this.primero
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
    quickSortCompras() {
        this.quickSortR1(this.primero,this.ultimo)
    }
    quickSortR1(izquierda,derecha) {
        if(izquierda.indice < derecha.indice) {
            let nodoParticion = this.particion(izquierda.objeto.ncompras,izquierda,derecha)
            this.quickSortR1(izquierda,nodoParticion)
            this.quickSortR1(nodoParticion.siguiente,derecha)
        }
    }
    particion(pivote,izquierda,derecha) {
        while(izquierda.objeto.ncompras > pivote) {
            izquierda = izquierda.siguiente
        }
        while(derecha.objeto.ncompras < pivote) {
            derecha = derecha.anterior
        }
        if(izquierda.indice >= derecha.indice) {
            return derecha
        }
        let temporal = izquierda.objeto
        izquierda.objeto = derecha.objeto
        derecha.objeto = temporal
        return this.particion(pivote,izquierda.siguiente,derecha.anterior)
    }
    swap(indice1,indice2) {
        let actual1 = this.primero
        while(actual1) {
            if(actual1.siguiente && actual1.siguiente.indice == indice1) {
                break
            }
            actual1 = actual1.siguiente
        }
        let actual2 = this.primero
        while(actual2) {
            if(actual2.siguiente && actual2.siguiente.indice == indice2) {
                break
            }
            actual2 = actual2.siguiente
        }
        let temporal = actual1.siguiente.objeto
        actual1.siguiente.objeto = actual2.siguiente.objeto
        actual2.siguiente.objeto = temporal
    }
    tour() {
        let actual = this.primero
        let cont = 0
        while(cont < this.indice) {
            console.log(actual.objeto)
            actual = actual.siguiente
            cont ++
        }
    }
    getSize() {
        return this.indice
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

//árbol binario
class Arbol {
    constructor() {
        this.raiz = null
        this.dot = ''
        this.id = 0
    }
    insert(nuevo) {
        this.raiz = this.add(this.raiz,nuevo,0)
        this.id ++
    }
    add(actual,nuevo,nivel) {
        if(!actual) {
            return new NodoAB(nuevo,nivel,this.id)
        }
        if(nuevo.nombre_autor > actual.objeto.nombre_autor) {
            actual.derecha = this.add(actual.derecha,nuevo,nivel + 1)
        }else {
            actual.izquierda = this.add(actual.izquierda,nuevo,nivel + 1)
        }
        return actual
    }
    getBranchesDot(actual) {
        let etiqueta = ''
        if(!actual.izquierda && !actual.derecha) {
            etiqueta = `nodo${actual.id} [label="${actual.objeto.nombre_autor}"];`
        }else {
            etiqueta = `nodo${actual.id} [label="<C0> | ${actual.objeto.nombre_autor} | <C1>"];`
        }
        if(actual.izquierda) {
            etiqueta += `${this.getBranchesDot(actual.izquierda)}nodo${actual.id}:C0 -> nodo${actual.izquierda.id};`
        }
        if(actual.derecha) {
            etiqueta += `${this.getBranchesDot(actual.derecha)}nodo${actual.id}:C1 -> nodo${actual.derecha.id};`
        }
        return etiqueta
    }
    getDot() {
        return `digraph G{rankdir=TB;node [shape = record];${this.getBranchesDot(this.raiz)}}`
    }
}

//pila y cola
class Pila {
    constructor(n) {
        this.n = n
        this.indice = 0
        this.primero = null
        this.ultimo = null
        for(let i = 1; i <= n; i ++) {
            this.push(i)
        }
    }
    push(nuevo) {
        if(this.primero) {
            this.primero = new NodoS(this.indice,nuevo)
            this.primero.siguiente = this.ultimo
            this.ultimo = this.primero
            this.indice ++
            return
        }
        this.primero = new NodoS(this.indice,nuevo)
        this.ultimo = this.primero
        this.indice ++
    }
    pop() {
        if(this.primero) {
            let primero = this.primero
            this.primero = this.primero.siguiente
            this.indice --
            return primero
        }
        return null
    }
    getDot() {
        let dot = `digraph pila{node[shape=plaintext];label="Cantidad = ${this.n}";`
        if(this.n > 0) {
            dot += 'struct[label=<<table border="0" cellborder="1" cellspacing="0">'
            let actual = this.primero
            while(actual) {
                dot += `<tr><td width="200" bgcolor="springgreen2" color="springgreen3"><font color="white">${actual.objeto}</font></td></tr>`
                actual = actual.siguiente
            }
            dot += '</table>>];'
        }
        dot += '}'
        return dot
    }
}

class Cola {
    constructor() {
        this.indice = 0
        this.primero = null
        this.ultimo = null
    }
    add(nuevo) {
        if(this.primero) {
            this.ultimo.siguiente = new NodoD(this.indice,nuevo)
            this.ultimo.siguiente.anterior = this.ultimo
            this.ultimo = this.ultimo.siguiente
            this.indice ++
            return
        }
        this.primero = new NodoD(this.indice,nuevo)
        this.ultimo = this.primero
        this.indice ++
    }
    remove() {
        if(this.primero) {
            let primero = this.primero
            this.primero = this.primero.siguiente
            this.indice --
            return primero
        }
        return null
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
    getDot() {
        let dot = `digraph pila{node[shape=box width="2" height="1"];rankdir=RL;`
        let actual = this.primero
        while(actual) {
            dot += `nodo${actual.indice}[label="Cliente = ${actual.objeto.nombre_completo}\nLibro = ${actual.objeto.nombre_libro}\nCantidad = ${actual.objeto.cantidad}"];`
            if(actual.anterior) {
                dot += `nodo${actual.indice} -> nodo${actual.anterior.indice};`
            }
            actual = actual.siguiente
        }
        dot += '}'
        return dot
    }
    getSize() {
        return this.indice
    }
}

//matrices
class MatrizOrtogonal {
    constructor(filas,columnas) {
        this.filas = new ListaEncabezado('LISTAS')
        this.columnas = new ListaEncabezado('COLUMNAS')
        for(let i = 1; i <= filas; i ++) {
            for(let j = 1; j <= columnas; j ++) {
                this.createNode(i,j,null)
            }
        }
    }
    createNode(x,y,objeto) {
        let nodoInterno = new NodoInterno(x,y,objeto)
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
    insert(objeto) {
        let actual = this.filas.primero
        let actual2 = actual.acceso
        while(actual) {
            if(objeto.fila == actual.id) {
                while(actual2) {
                    if(objeto.columna == actual2.y) {
                        actual2.objeto = objeto
                    }
                    actual2 = actual2.derecha
                }
            }
            actual = actual.siguiente
            if(actual) {
                actual2 = actual.acceso
            }
        }
    }
    getDot() {
        let grafo = 'digraph T{\n\tnode[shape=box fontname="Arial" fillcolor="white" style=filled];'
        grafo += '\n\tRoot[label = "Capa 0", group="0"];'
        let currentR = this.filas.primero
        while(currentR) {
            grafo += `\n\tF${currentR.id}[group="0" fillcolor="plum"];`
            currentR = currentR.siguiente
        }
        let currentC = this.columnas.primero
        while(currentC) {
            grafo += `\n\tC${currentC.id}[group="${currentC.id}" fillcolor="powderblue"];`
            currentC = currentC.siguiente
        }
        currentC = this.columnas.primero
        let label = ''
        while(currentC) {
            currentR = currentC.acceso
            while(currentR) {
                label = ''
                if(currentR.objeto) label = currentR.objeto.nombre_libro
                grafo += `\n\tN${currentR.x}_${currentR.y}[group="${currentR.y}" label="${label}"];`
                currentR = currentR.abajo
            }
            currentC = currentC.siguiente
        }
        grafo += `\n\tsubgraph columnHeader {\n\t\trank = same;`
        let enlace = '\n\t\tRoot -> '
        currentC = this.columnas.primero
        while(currentC) {
            enlace += `C${currentC.id}`
            currentC = currentC.siguiente
            if(currentC) enlace += ' -> '
        }
        grafo += enlace + ';' + enlace + '[dir=back];\n\t}'
        currentR = this.filas.primero
        while(currentR) {
            grafo += `\n\tsubgraph row${currentR.id} {\n\t\trank = same;`
            enlace = `\n\t\tF${currentR.id} -> `
            currentC = currentR.acceso
            while(currentC) {
                enlace += `N${currentC.x}_${currentC.y}`
                if(currentC.derecha) currentC = currentC.derecha
                else break
                if(currentC) enlace += ' -> '
            }
            grafo += enlace + ';' + enlace +'[dir=back];\n\t}'
            currentR = currentR.siguiente
        }
        grafo += `\n\tsubgraph rowHeader {`
        enlace = '\n\t\tRoot -> '
        currentR = this.filas.primero
        while(currentR) {
            enlace += `F${currentR.id}`
            currentR = currentR.siguiente
            if(currentR) enlace += ' -> '
        }
        grafo += enlace + ';' + enlace + '[dir=back];\n\t}'
        currentC = this.columnas.primero
        while(currentC) {
            grafo += `\n\tsubgraph column${currentC.id} {`
            enlace = `\n\t\tC${currentC.id} -> `
            currentR = currentC.acceso
            while(currentR) {
                enlace += `N${currentR.x}_${currentR.y}`
                if(currentR.abajo) currentR = currentR.abajo
                else break
                if(currentR) enlace += ' -> '
            }
            grafo += enlace + ';' + enlace + '[dir=back];\n\t}'
            currentC = currentC.siguiente
        }
        grafo += '\n}'
        return grafo
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
        let grafo = 'digraph T{\n\tnode[shape=box fontname="Arial" fillcolor="white" style=filled];'
        grafo += '\n\tRoot[label = "Capa 0", group="0"];'
        let currentR = this.filas.primero
        while(currentR) {
            grafo += `\n\tF${currentR.id}[group="0" fillcolor="plum"];`
            currentR = currentR.siguiente
        }
        let currentC = this.columnas.primero
        while(currentC) {
            grafo += `\n\tC${currentC.id}[group="${currentC.id}" fillcolor="powderblue"];`
            currentC = currentC.siguiente
        }
        currentC = this.columnas.primero
        while(currentC) {
            currentR = currentC.acceso
            while(currentR) {
                grafo += `\n\tN${currentR.x}_${currentR.y}[group="${currentR.y}" label="${currentR.objeto.nombre_libro}"];`
                currentR = currentR.abajo
            }
            currentC = currentC.siguiente
        }
        grafo += `\n\tsubgraph columnHeader {\n\t\trank = same;`
        let enlace = '\n\t\tRoot -> '
        currentC = this.columnas.primero
        while(currentC) {
            enlace += `C${currentC.id}`
            currentC = currentC.siguiente
            if(currentC) enlace += ' -> '
        }
        grafo += enlace + ';' + enlace + '[dir=back];\n\t}'
        currentR = this.filas.primero
        while(currentR) {
            grafo += `\n\tsubgraph row${currentR.id} {\n\t\trank = same;`
            enlace = `\n\t\tF${currentR.id} -> `
            currentC = currentR.acceso
            while(currentC) {
                enlace += `N${currentC.x}_${currentC.y}`
                if(currentC.derecha) currentC = currentC.derecha
                else break
                if(currentC) enlace += ' -> '
            }
            grafo += enlace + ';' + enlace +'[dir=back];\n\t}'
            currentR = currentR.siguiente
        }
        grafo += `\n\tsubgraph rowHeader {`
        enlace = '\n\t\tRoot -> '
        currentR = this.filas.primero
        while(currentR) {
            enlace += `F${currentR.id}`
            currentR = currentR.siguiente
            if(currentR) enlace += ' -> '
        }
        grafo += enlace + ';' + enlace + '[dir=back];\n\t}'
        currentC = this.columnas.primero
        while(currentC) {
            grafo += `\n\tsubgraph column${currentC.id} {`
            enlace = `\n\t\tC${currentC.id} -> `
            currentR = currentC.acceso
            while(currentR) {
                enlace += `N${currentR.x}_${currentR.y}`
                if(currentR.abajo) currentR = currentR.abajo
                else break
                if(currentR) enlace += ' -> '
            }
            grafo += enlace + ';' + enlace + '[dir=back];\n\t}'
            currentC = currentC.siguiente
        }
        grafo += '\n}'
        return grafo
    }
}

//inicialización
if(localStorage.getItem('usersCharged') == null) {
    localStorage.setItem('usersCharged',JSON.stringify([JSON.parse(JSON.stringify(new Usuario(2354168452525,'Wilfred Perez','Wilfred','wilfred@bitrex.com','Administrador','123','+502 (123) 123-4567',0)))]))
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
    let users = new ListaDobleCircular()
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
                    user['compras'],
                    user['ncompras']
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
    let usersCharged = JSON.parse(localStorage.getItem('usersCharged'))
    usersCharged.push(JSON.parse(JSON.stringify(new Usuario(dpi,name,username,email,rol,password,phone,null,0))))
    localStorage.setItem('usersCharged',JSON.stringify(usersCharged))
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
                    window.location.href = `AdminProfile.html?dpi=${users.get(i).dpi}`
                    return
                }else if(users.get(i).rol == 'Usuario') {
                    window.location.href = `UserProfile.html?dpi=${users.get(i).dpi}`
                    return
                }
            }
        }
        alert('Verifique sus credenciales')
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

//obtener
function booksHome() {
    let books = getAllBooks()
    if(books.getSize() > 0) {
        books.bubbleSortByName()
        let code = ''
        for(let i = 0; i < books.getSize(); i ++) {
            let book = books.get(i)
            if(book['cantidad'] > 0) {
                disponible = book['cantidad']
            }
            code += `
        <div class="mi-libro"">
            <h4>${book['nombre_libro']}</h4>
            <p>Autor: ${book['nombre_autor']}</p>
            <p>Categoría: ${book['categoria']}</p>
            <p>Páginas: ${book['paginas']}</p>
        </div>`
        }
        document.getElementById('lookbooks').innerHTML = code
        return
    }
    document.getElementById('lookbooks').innerHTML = '<h4 class="msg">¡No hay libros en venta!</h4>'
}

function getBuys(compras) {
    if(compras != null) {
        let buys = new ListaSimple()
        for(let i = 0; i < compras.length; i ++) {
            let buy = compras[i]
            buys.add(new Compra(buy['isbn'],buy['nombre_autor'],buy['nombre_libro'],buy['cantidad'],buy['paginas'],buy['categoria']))
        }
        return buys
    }
    return null
}

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
                    getBuys(user['compras']),
                    user['ncompras']
                )
                clients.add(newUser)
            }
        }
    } catch (error) {}
    return clients
}

function getTop() {
    let clients = getClients()
    if(clients.getSize() > 0) {
        clients.quickSortCompras()
        if(clients.get(0).ncompras > 0) {
            let top = 5
            if(clients.getSize() < 5) top = clients.getSize()
            let code = ''
            for(let i = 0; i < top; i ++) {
                if(clients.get(i).ncompras > 0) {
                    code += `
                    <div class="autorH">
                        <h4>No. ${i + 1}</h4>
                        <img src="./Images/author.png" width="30" height="30"/>
                        <h5>${clients.get(i).nombre_completo}</h4>
                        <p>Cantidad: ${clients.get(i).ncompras}</p>
                    </div>`
                }
            }
            document.getElementById('topcom').innerHTML = code
            return
        }
    }
    document.getElementById('topcom').innerHTML = '<h4 class="msg">¡No se han hecho compras !</h4>'
}

function getBooksFantasia() {
    let matrixOrtogonal = new MatrizOrtogonal(25,25)
    try{
        let booksCharged = JSON.parse(localStorage.getItem('booksCharged'))
        for(let i = 0; i < booksCharged.length; i ++) {
            let book = booksCharged[i]
            if(book['categoria'] == 'Fantasia') {
                matrixOrtogonal.insert(
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
    return matrixOrtogonal
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

//graficas de estructuras
function doubleList() {
    let clients = getClients()
    if(clients.getSize() > 0) {
        clients.quickSortCompras()
        if(clients.get(0).ncompras > 0) {
            let top = 5
            if(clients.getSize() < 5) top = clients.getSize()
            let dot = 'digraph g{node[shape=box width="2.14" height="1"];rankdir=LR;'
            for(let i = 0; i < top; i ++) {
                if(clients.get(i).ncompras > 0) {
                    dot += `nodo${i}[label="${clients.get(i).nombre_completo}\nCantidad = ${clients.get(i).ncompras}"];`
                    if(i > 0) {
                        dot += `nodo${i - 1} -> nodo${i};nodo${i} -> nodo${i - 1};`
                    }
                }
            }
            dot += '}'
            try {
                d3.select('#doubleList').graphviz().width(document.getElementById('doubleList').clientWidth).renderDot(dot)
            } catch(error) {}
            return
        }
    }
}

function listOfLists() {
    let clients = getClients()
    if(clients.getSize() > 0) {
        let nodos = ''
        let nodosC = `
        nodo0`
        let subG = ''
        for(let i = 0; i < clients.getSize(); i ++) {
            nodos += `
    nodo${i}[label="${clients.get(i).nombre_completo}"];`
            subG += `
    subgraph subNodo${i} {`
            let client = clients.get(i)
            if(client.compras && client.compras.getSize() > 0) {
                for(let x = 0; x < client.compras.getSize(); x ++) {
                    subG += `
        lib${i}${x}[label="${client.compras.get(x).nombre_libro}\nCantidad = ${client.compras.get(x).cantidad}"];`
                    if(x == 0) {
                        subG += `
        nodo${i} -> lib${i}${x};`
                    }else if(x > 0) {
                        subG += `
        lib${i}${x - 1} -> lib${i}${x};`
                    }
                }
            }
            subG += `
    }`
            if(i > 0) {
                nodosC += ` -> nodo${i}`
            }
        }
        nodosC += ` -> nodo0;`
        let dot = `
digraph G {
    node[shape="box"];${nodos}${subG}
    {
        rank=same;${nodosC}
    }
}`
        document.getElementById('listoflists').innerHTML = ''
        d3.select('#listoflists').graphviz().scale(0.5).width(document.getElementById('listoflists').clientWidth).height(800*0.7).renderDot(dot)
        return
    }
    document.getElementById('listoflists').innerHTML = '<h4 class="msg">¡No hay usuarios cargados!</h4>'
}

function binaryTree(height) {
    let authors = getAuthors()
    try {
        if(height == null) {
            height = document.getElementById('binarytree').clientHeight
        }
        if(authors.raiz) {
            document.getElementById('binarytree').innerHTML = ''
            d3.select('#binarytree').graphviz().width(document.getElementById('binarytree').clientWidth).height(height).scale(0.5).renderDot(authors.getDot())
            return
        }
        document.getElementById('binarytree').innerHTML = '<h4 class="msg">¡No hay autores cargados!</h4>'
    } catch (error) {
    }
}

function getQueue() {
    let queueW = JSON.parse(localStorage.getItem('waitQueue'))
    let waitQueue = new Cola()
    for(let i = 0; i < queueW.length; i ++) {
        waitQueue.add(queueW[i])
    }
    return waitQueue
}

function lookQueueAdmin() {
    let queue = getQueue()
    if(queue.getSize() > 0) {
        let code = ''
        for(let i = 0; i < queue.getSize(); i ++) {
            let book = queue.get(i)
            code += `
        <div class="mi-libro"">
            <h4>${book['nombre_completo']}</h4>
            <p>Libro: ${book['nombre_libro']}</p>
            <p>Cantidad: ${book['cantidad']}</p>
        </div>`
        }
        document.getElementById('waitQueueBuyH').innerHTML = code
        return
    }
    document.getElementById('waitQueueBuyH').innerHTML = '<h4 class="msg">¡No hay clientes en cola!</h4>'
}

function queueBuys() {
    let waitQueue = getQueue()
    if(waitQueue.getSize()) {
        d3.select('#waitQueueBuyG').graphviz().width(document.getElementById('waitQueueBuyG').clientWidth).renderDot(waitQueue.getDot())
    }
    document.getElementById('waitQueueBuyG').innerHTML = ''
}

function booksChargeConfirm() {
    if(JSON.parse(JSON.stringify(localStorage.getItem('booksCharged')))) {
        document.getElementById('booksCharge').innerHTML = '<h4 class="msg">¡Libros cargados!</h4>'
        return
    }
    document.getElementById('booksCharge').innerHTML = '<h4 class="msg">¡No hay libros cargados!</h4>'
}

function ortogonalMatrix() {
    let booksFantasia = getBooksFantasia()
    try {
        d3.select('#fantasia').graphviz().width(document.getElementById('fantasia').clientWidth).height(document.getElementById('fantasia').clientHeight).scale(0.45).renderDot(booksFantasia.getDot())
        return
    } catch (error) {}
}

function disperseMatrix() {
    let booksThriller = getBooksThriller()
    try {
        d3.select('#thriller').graphviz().width(document.getElementById('thriller').clientWidth).height(document.getElementById('thriller').clientHeight).scale(0.55).renderDot(booksThriller.getDot())
        return
    } catch (error) {}
}

//funciones vista usuarios
function lookBook(titulo,cantidad) {
    document.getElementsByClassName('fondo_transparente')[0].style.display = 'block'
    document.getElementById('titulomodal').innerHTML = `Ejemplares: ${titulo}`
    let pila = new Pila(cantidad)
    d3.select('#contenidomodal').graphviz().renderDot(pila.getDot())
}

function booksFantasia() {
    code = ''
    try{
        let booksCharged = JSON.parse(localStorage.getItem('booksCharged'))
        for(let i = 0; i < booksCharged.length; i ++) {
            let book = booksCharged[i]
            if(book['categoria'] == 'Fantasia') {
                code += `
            <div class="libro" id="p_${book['isbn']}" onclick="lookBook('${book['nombre_libro']}',${book['cantidad']})">
                <h4>${book['nombre_libro']}</h4>
                <p>Autor: ${book['nombre_autor']}</p>
                <h5><strong>Estantería</strong></h5>
                <p>Fila: ${book['fila']}</p>
                <p>Columna: ${book['columna']}</p>
            </div>`
            }
        }
        document.getElementById('fantasiabook').innerHTML = code + '<div class="grafo grafo--matriz" id="fantasia"></div>'
    } catch (error) {
        document.getElementById('fantasiabook').innerHTML = '<h4 class="msg">¡La librera está vacía!</h4>'
    }
}

function booksThriller() {
    code = ''
    try{
        let booksCharged = JSON.parse(localStorage.getItem('booksCharged'))
        for(let i = 0; i < booksCharged.length; i ++) {
            let book = booksCharged[i]
            if(book['categoria'] == 'Thriller') {
                code += `
            <div class="libro" onclick="lookBook('${book['nombre_libro']}',${book['cantidad']})">
                <h4>${book['nombre_libro']}</h4>
                <p>Autor: ${book['nombre_autor']}</p>
                <h5><strong>Estantería</strong></h5>
                <p>Fila: ${book['fila']}</p>
                <p>Columna: ${book['columna']}</p>
            </div>`
            }
        }
        document.getElementById('thrillerbook').innerHTML = code + '<div class="grafo grafo--matriz" id="thriller"></div>'
    } catch (error) {
        document.getElementById('thrillerbook').innerHTML = '<h4 class="msg">¡La librera está vacía!</h4>'
    }
}

function getAuthorsList() {
    let authors = new ListaSimple()
    try {
        let authorsCharged = JSON.parse(localStorage.getItem('authorsCharged'))
        for(let i = 0; i < authorsCharged.length; i ++) {
            let author = authorsCharged[i]
            authors.add(
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

function lookAuthor(dpi) {
    let authors = getAuthorsList()
    for(let i = 0; i < authors.getSize(); i ++) {
        let author = authors.get(i)
        if(dpi == author.dpi) {
            document.getElementsByClassName('fondo_transparente')[0].style.display = 'block'
            document.getElementById('titulomodal').innerHTML = `${author.nombre_autor}`
            document.getElementById('contenidomodal').innerHTML = `
            <div class="modal_autor_bio">
                <p style="margin: auto"><strong>DPI:</strong> ${author.dpi}</p>
                <p style="margin: auto"><strong>Correo:</strong> ${author.correo}</p>
                <p style="margin: auto"><strong>Telefono:</strong> ${author.telefono}</p>
                <p style="margin: auto"><strong>Dirección:</strong> ${author.direccion}</p>
                <p style="margin: auto"><strong>Biografía:</strong> ${author.biografia}</p>
            </div>`
            return
        }
    }
}

function authors() {
    let authors = getAuthorsList()
    if(authors.getSize() > 0){
        code = ''
        for(let i = 0; i < authors.getSize(); i ++) {
            let author = authors.get(i)
            code += `
            <div class="autor" onclick="lookAuthor(${author.dpi})">
                <img src="./Images/author.png" width="30" height="30"/>
                <h4>${author.nombre_autor}</h4>
            </div>`
        }
        document.getElementById('authorsR').innerHTML = code + '<div class="grafo grafo--arbol-binario" id="binarytree"></div>'
        return
    }
    document.getElementById('authorsR').innerHTML = '<h4 class="msg">¡No hay autores!</h4>'
}

function getAllBooks() {
    let books = new ListaDoble()
    try {
        let booksCharged = JSON.parse(localStorage.getItem('booksCharged'))
        for(let i = 0; i < booksCharged.length; i ++) {
            let author = booksCharged[i]
            books.add(
                new Libro(
                    author['isbn'],
                    author['nombre_autor'],
                    author['nombre_libro'],
                    author['cantidad'],
                    author['fila'],
                    author['columna'],
                    author['paginas'],
                    author['categoria']
                )
            )
        }
    } catch (error) {}
    return books
}

function myBuyedBooks(listaLibros) {
    if(listaLibros != null) {
        let code = ''
        for(let i = 0; i < listaLibros.getSize(); i ++) {
            let book = listaLibros.get(i)
            code += `
            <div class="mi-libro">
                <h4>${book['nombre_libro']}</h4>
                <p>Autor: ${book['nombre_autor']}</p>
                <p>Categoría: ${book['categoria']}</p>
                <p>ISBN: ${book['isbn']}</p>
                <p>Ejemplares Comprados: ${book['cantidad']}</p>
            </div>`
        }
        document.getElementById('myBuyedBooks').innerHTML = code
        return
    }
    document.getElementById('myBuyedBooks').innerHTML = '<h4 class="msg">¡La librera está vacía!</h4>'
}

function myBooks() {
    let clients = getClients()
    for(let i = 0; i < clients.getSize(); i ++) {
        if(parseInt(dpi) == clients.get(i).dpi) {
            myBuyedBooks(clients.get(i).compras)
            return
        }
    }
}

function saleBooks() {
    let books = getAllBooks()
    if(books.getSize() > 0) {
        let algoritmo
        let fontsize
        if(orden) {
            orden = false
            fontsize = 'font-size: 65%;'
            algoritmo = `bubbleSortByName() {
    this.bubbleSortR1(this.primero)
}
bubbleSortR1(nodoI) {
    if(nodoI.indice < this.ultimo.indice) {
        this.bubbleSortR2(nodoI,this.primero)
        this.bubbleSortR1(nodoI.siguiente)
    }
}
bubbleSortR2(nodoI,nodoX) {
    if(nodoX.indice < this.ultimo.indice - nodoI.indice) {
        if(nodoX.objeto.nombre_libro > nodoX.siguiente.objeto.nombre_libro) {
            let temporal = nodoX.objeto
            nodoX.objeto = nodoX.siguiente.objeto
            nodoX.siguiente.objeto = temporal
        }
        this.bubbleSortR2(nodoI,nodoX.siguiente)
    }
}`
            books.bubbleSortByName()
            document.getElementById('ascdesc').innerHTML = '<button class="button1" onclick="saleBooks()">Descendente</button>'
        }else {
            orden = true
            fontsize = 'font-size: 49.5%;'
            algoritmo = `quickSortByName() {
    this.quickSortR1(this.primero,this.ultimo)
}
quickSortR1(izquierda,derecha) {
    if(izquierda.indice < derecha.indice) {
        let nodoParticion = this.partition(izquierda.objeto.nombre_libro,izquierda,derecha)
        this.quickSortR1(izquierda,nodoParticion)
        this.quickSortR1(nodoParticion.siguiente,derecha)
    }
}
partition(pivote,izquierda,derecha) {
    while(izquierda.objeto.nombre_libro > pivote) {
        izquierda = izquierda.siguiente
    }
    while(derecha.objeto.nombre_libro < pivote) {
        derecha = derecha.anterior
    }
    if(izquierda.indice >= derecha.indice) {
        return derecha
    }
    let temporal = izquierda.objeto
    izquierda.objeto = derecha.objeto
    derecha.objeto = temporal
    return this.partition(pivote,izquierda.siguiente,derecha.anterior)
}`
            books.quickSortByName()
            document.getElementById('ascdesc').innerHTML = '<button class="button1" onclick="saleBooks()">Ascendente</button>'
        }
        let code = ''
        for(let i = 0; i < books.getSize(); i ++) {
            let book = books.get(i)
            let disponible = '<strong>AGOTADO</strong>'
            style = 'style="font-size: 1.2rem;color: cyan;"'
            if(book['cantidad'] > 0) {
                disponible = `Cantidad Disponible: ${book['cantidad']}`
                style = ''
            }
            code += `
        <div class="vende-libro" onclick="buyBook(${book['isbn']},'${book['nombre_libro']}','${book['nombre_autor']}',${book['paginas']},${book['cantidad']})">
            <h4>${book['nombre_libro']}</h4>
            <p>Autor: ${book['nombre_autor']}</p>
            <p>Categoría: ${book['categoria']}</p>
            <p>ISBN: ${book['isbn']}</p>
            <p ${style}>${disponible}</p>
        </div>`
        }
        document.getElementById('saleBooks').innerHTML = `${code}<textarea class="areatexto" wrap="off" style="${fontsize}" disabled="true">${algoritmo}</textarea>`
        return
    }
    document.getElementById('saleBooks').innerHTML = '<h4 class="msg">¡No hay libros en venta!</h4>'
}

function searchByISBN(buyedBooks,isbn) {
    for(let i = 0; i < buyedBooks.length; i ++) {
        if(isbn == buyedBooks[i]['isbn']) {
            return i
        }
    }
    return null
}

function createBuyBook(buyedBooks,isbn,author,title,cuantity,pages,category) {
    let indice = searchByISBN(buyedBooks,isbn)
    if(indice != null) {
        buyedBooks[indice]['cantidad'] += cuantity
        return buyedBooks
    }
    buyedBooks.push(JSON.parse(JSON.stringify(new Compra(isbn,author,title,cuantity,pages,category))))
    return buyedBooks
}

function addToLibrary(isbn,author,title,cuantity,pages,category) {
    let usersCharged = JSON.parse(localStorage.getItem('usersCharged'))
    for(let x = 0; x < usersCharged.length; x ++) {
        if(dpi == usersCharged[x]['dpi']) {
            if(usersCharged[x]['compras'] == null) {
                usersCharged[x]['compras'] = []
            }
            usersCharged[x]['ncompras'] += cuantity
            usersCharged[x]['compras'] = createBuyBook(usersCharged[x]['compras'],isbn,author,title,cuantity,pages,category)
            localStorage.setItem('usersCharged',JSON.stringify(usersCharged))
            return
        }
    }
}

function addToQueue(nombre_completo,cantidad,book) {
    if(book['cantidad'] > 0) {
        addToLibrary(book['isbn'],book['nombre_autor'],book['nombre_libro'],book['cantidad'],book['paginas'],book['categoria'])
    }
    if(localStorage.getItem('waitQueue') == null) {
        localStorage.setItem('waitQueue',JSON.stringify([JSON.parse(JSON.stringify(new Espera(nombre_completo,book['nombre_libro'],cantidad - book['cantidad'])))]))
        console.log(JSON.parse(localStorage.getItem('waitQueue')))
        console.log('primero: se agregó a la cola')
        return
    }
    let queueWait = JSON.parse(localStorage.getItem('waitQueue'))
    queueWait.push(JSON.parse(JSON.stringify(new Espera(nombre_completo,book['nombre_libro'],cantidad - book['cantidad']))))
    localStorage.setItem('waitQueue',JSON.stringify(queueWait))
    console.log(JSON.parse(localStorage.getItem('waitQueue')))
}

function confirmBuyBook(isbn,cantidad) {
    let booksCharged = JSON.parse(localStorage.getItem('booksCharged'))
    for(let i = 0; i < booksCharged.length; i ++) {
        let book = booksCharged[i]
        if(isbn == book['isbn']) {
            if(book['cantidad'] >= cantidad) {
                booksCharged[i]['cantidad'] -= cantidad
                addToLibrary(book['isbn'],book['nombre_autor'],book['nombre_libro'],cantidad,book['paginas'],book['categoria'])
                myBooks()
            }else {
                addToQueue(getNameClient(dpi),cantidad,book)
                booksCharged[i]['cantidad'] = 0
                alert('Se agregó a la cola de espera')
                myBooks()
            }
            break
        }
    }
    localStorage.setItem('booksCharged',JSON.stringify(booksCharged))
    document.getElementsByClassName('fondo_transparente')[0].style.display = 'none'
    document.getElementById('contenidomodal').innerHTML = ''
    document.getElementById('botones').innerHTML = ''
    if(orden) {
        orden = false
    }else {
        orden = true
    }
    saleBooks()
}

function buyBook(isbn,titulo,autor,paginas,disponibles) {
    document.getElementsByClassName('fondo_transparente')[0].style.display = 'block'
    document.getElementById('titulomodal').innerHTML = 'Confirmación de Compra'
    document.getElementById('contenidomodal').innerHTML = `
    <div class="modal_autor_bio">
        <p style="margin: auto;font-size: 3rem"><strong>ISBN:</strong> ${isbn}</p>
        <p style="margin: auto;font-size: 3rem"><strong>Libro:</strong> ${titulo}</p>
        <p style="margin: auto;font-size: 3rem"><strong>Autor:</strong> ${autor}</p>
        <p style="margin: auto;font-size: 3rem"><strong>Páginas:</strong> ${paginas}</p>
        <p style="margin: auto;font-size: 3rem"><strong>Cantidad Disponible:</strong> ${disponibles}</p>
        <label for="cant" style="margin: auto;font-size: 3rem;color: black;"><strong>Cantidad:</strong></label>
        <input id="cant" type="number" min="1" style="text-align: center;width: 25%;font-size: 3rem;border: 0rem solid;outline: none;" value="1"/>
    </div>`
    let button = `<button type="buton" class="boton" onclick="confirmBuyBook(${isbn},parseInt(document.getElementById('cant').value))">Comprar</button>`
    if(disponibles == 0) {
        button = `<button type="buton" class="boton" onclick="confirmBuyBook(${isbn},parseInt(document.getElementById('cant').value))">Reservar</button>`
    }
    document.getElementById('botones').innerHTML = button
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
            listOfLists(1150)
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
            binaryTree(1150)
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
            booksChargeConfirm()
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
        document.getElementById('filebooks').value = ''
    }
}

//obtener datos en usuarios
function getNameClient() {
    let users = getUsers()
    for(let i = 0; i < users.getSize(); i ++) {
        if(parseInt(dpi) == users.get(i).dpi) {
            document.getElementById('usernameClient').innerHTML = users.get(i).nombre_completo
            return users.get(i).nombre_completo
        }
    }
}

function getNameAdmin() {
    let users = getUsers()
    for(let i = 0; i < users.getSize(); i ++) {
        if(parseInt(dpiAdmin) == users.get(i).dpi) {
            document.getElementById('usernameAdmin').innerHTML = users.get(i).nombre_completo
            return
        }
    }
}

//obtener la posición de un elemento html mediante su id
function getOffset(id) {
    let elemento = document.getElementById(id)
    let _x = 0
    let _y = 0
    while(elemento && !isNaN(elemento.offsetLeft) && !isNaN(elemento.offsetTop)) {
        _x += elemento.offsetLeft - elemento.scrollLeft
        _y += elemento.offsetTop - elemento.scrollTop
        elemento = elemento.offsetParent
    }
    return {top: _y,left: _x}
}

//funciones scroll
function header() {scroll(0,0)}

function topBuys() {scroll(0,getOffset('users').top)}

function libraries() {scroll(0,getOffset('books').top)}

function salesBooks() {scroll(0,getOffset('buybooks').top)}

function allAuthors() {scroll(0,getOffset('authors').top)}

function chargeOfAuthors() {scroll(0,getOffset('authors').top)}

function chargeOfBooks() {scroll(0,getOffset('books').top)}

function lookQueueWait() {scroll(0,getOffset('queue').top)}