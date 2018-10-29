const flow = require('../flow');
require ('../server');
require('../cors');


flow.on('inserirCompra', (compra) =>{
    console.log("inserir compra");
    return compra;
});

flow.on('listarCompras', () =>{
    console.log("listar compras");
})