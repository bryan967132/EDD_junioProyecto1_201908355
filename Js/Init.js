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