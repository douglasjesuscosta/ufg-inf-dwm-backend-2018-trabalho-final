const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const queryParser = require('express-query-int');
const request = require('request');


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
    email: req.body.email,
    senha: req.body.senha
  }

  if(this.authenticate(user)){
    var compra = new Compra({
      idCliente: user.email,
      valor: req.body.valor,
      date: Date.now,
      products: req.body.products
    });
  
    console.log(compra);

    compra.save().then((doc) => {
      res.send(compra);
    }, (e) => {
      res.status(400).send(e);
    });

  }else{
    res.status(404).send("Falha na autentificação");
  }
})

function authenticate(user){
  request('localhost:8080/user', { json: true }, (err, res, user) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
  });
}

/**
 * Update Produto
 */
/* server.patch('/produtos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['nome', 'preco']);

  if(!ObjectID.isValid(id)) {
    res.status(404).send('Id inválido.')
  }

  Todo.findByIdAndRemove(id, {$set: body}, {new: true}).then((doc) => {
    if(!doc) {
      return res.status(400).send('Produto não encontrado');
    }

    res.send({doc});
  }).catch((e) => res.status(400).send('Problema para atualizar produto.'));
}); */


server.listen(3000, function() {
  console.log(`MyAPI is running on port 3000.`)
})
