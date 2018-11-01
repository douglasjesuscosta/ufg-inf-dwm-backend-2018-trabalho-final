const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const queryParser = require('express-query-int');
const request = require('request');

const {mongoose} = require('./db/mongoose');
const {Produto} = require('./models/produto');
const {Compra} = require('./models/compra');
const {ObjectID} = require('mongodb');

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(queryParser())


/**
 * Create Produto
 */
server.post('/produtos', (req, res) => {
  var produto = new Produto({
    nome: req.body.nome,
    preco: req.body.preco
  });

  console.log(produto);
  produto.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

/**
 * Get Produtos
 */
server.get('/produtos', (req, res) => {
  Produto.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

/**
 * Get Produto
 */
server.get('/produtos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Produto.findById(id).then((doc) => {
    if(!doc) {
      res.status(404).send('Produto não encontrado');
    } else {
      res.send({doc});
    }
  }).catch((e) => res.status(400).send('Problemas para recuperar produto.'));
});

/**
 * Delete Produto
 */
server.delete('/produtos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Produto.findByIdAndRemove(id).then((doc) => {
    if(!doc) {
      res.status(404).send();
    } else {
      res.send({doc});
    }
  }).catch((e) => res.status(404).send('Problema para deletar produto.'))
})

/**
 * COMPRAS
 */

 /**
  * Get all compras
  */
server.get('/compras', (req, res) => {
    console.log("Listar");
});

/**
 * Create compra
 */
server.post('/compras', (req, res) => {
  var user = {
    id: null,
    email: req.body.email,
    senha: req.body.senha
  }
  console.log(user);
  user = authenticate(user, (userRetorned) =>{
    saveCompra(req, res, userRetorned)
  });
})

/**
 * Autentification with another server
 */

function authenticate(user, callBack){
  request({
    url: "http://localhost:8080/user",
    method: "POST",
    json: true,   // <--Very important!!!
    body: user
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var userRetorned = {
        id: response.body.id,
        email: response.body.email,
        senha: response.body.senha
      }
      callBack(userRetorned);
    }else{
      callBack(null);
    }
  });
  
}

function saveCompra(req, res, user){

  if(user !== null){
    var compra = new Compra({
      idCliente: user.id,
      valor: req.body.valor,
      date: Date.now(),
      products: req.body.products
    });

    console.log(compra);

    compra.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  }else{
      res.status(400).send("Algo deu errado. Tente novamente!");
  }
}

server.listen(3000, function() {
  console.log(`MyAPI is running on port 3000.`)
})
