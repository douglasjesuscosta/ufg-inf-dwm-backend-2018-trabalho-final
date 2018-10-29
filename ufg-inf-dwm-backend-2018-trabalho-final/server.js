const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const flow = require('./flow');
const allowCors = require('./cors');
const queryParser = require('express-query-int');
require('./compras/comprasController');

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.route('/compras')
  .get(function(req, res){
    flow.emit("listarCompras", function(compras){
      console.log("passei");
      res.send(compras);
    })
  })

  .post(function(req, res){
    flow.emit("inserirCompra", function(compra){
      console.log(compra);
      res.send(compra);
    })
  })

  .put(function(req, res) {
    res.send('Update the book');
  })

server.listen(3000, function() {
  console.log(`MyAPI is running on port 3000.`)
})