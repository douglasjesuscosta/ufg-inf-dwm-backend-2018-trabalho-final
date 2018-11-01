const express = require('express');
const flow = require('./flow');
const router = express.Router();

router.route('/compras')

  .get(function(req, res){
    flow.emit("listarCompras", function(compras){
      console.log("passei");
      res.send(compras);
    })
  })

  .post(function(req, res){
    this.authenticate();
    flow.emit("inserirCompra", function(compra){
      console.log(compra);
      res.send(compra);
    })
  })

  function authenticate(){
    this.passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
  }

 
router.route('/produtos')
  /**
   * Create Produto
   */
  .post((req, res) => {
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
  })

/**
  * Get Produtos
*/
.get('/produtos', (req, res) => {
  Produto.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
})

/**
 * Get Produto
 */
.get('/produtos/:id', (req, res) => {
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
})

/**
 * Delete Produto
 */
.delete('/produtos/:id', (req, res) => {
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


module.exports = router;