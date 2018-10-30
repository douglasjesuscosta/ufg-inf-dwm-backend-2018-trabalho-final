const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const allowCors = require('./cors');
const queryParser = require('express-query-int');
const router = require('./router');
require('./compras/comprasController');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const {mongoose} = require('./db/mongoose');
const {Produto} = require('./models/produto');
const {ObjectID} = require('mongodb');

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())
server.use(passport.initialize());
server.use(passport.session());
server.use(router);

server.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


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

server.listen(3000, function() {
  console.log(`MyAPI is running on port 3000.`)
})
