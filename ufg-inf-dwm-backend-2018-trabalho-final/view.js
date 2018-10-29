const flow = require('./flow');
import Compra from './compras/Compra';

function autentify(){
    
}

function onListCompras(){
    flow.emit("listCompras", function(compras){

    })
}

function onInsert(compra){
    flow.emit("insertCompra", function(compra){

    })
}