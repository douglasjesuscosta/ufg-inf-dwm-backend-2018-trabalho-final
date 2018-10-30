const request = require('request');
const flow = require('../flow');
require ('../server');
require('../cors');


flow.on('inserirCompra', (compra) =>{

    console.log("inserir compra");
    compraModel = require('./Compra');

    return compra;
});

flow.on('listarCompras', () =>{
    console.log("listar compras");
})

function requestUser(){
    request('localhost:8080/user', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) 
        }
    })
}