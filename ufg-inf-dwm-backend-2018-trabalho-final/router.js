const express = require('express');
const flow = require('./flow');
const router = express.Router();
const passport = require('passport');

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


module.exports = router;