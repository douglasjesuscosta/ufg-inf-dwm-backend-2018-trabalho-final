var mongoose = require('mongoose');

var Compra = mongoose.model('Compra', {
    idCliente: { 
      type: Number, 
      required: true 
    },
    valorCompra: {
      type: Number, 
      require: true
    },
    date: { 
      type: Date,
      default: Date.now
    },
    products: [{ 
      name: {
        type: String
      },
      value:{ 
        type: Number
      }, 
      quantity:{
        type: Number
      } 
    }]
});

module.exports = { Compra };