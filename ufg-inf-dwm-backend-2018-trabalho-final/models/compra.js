const restful = require('node-restful')
const mongoose = restful.mongoose

const compra = new mongoose.Model('compra', {

  idCliente: { type: Number, required: true },
  valorCompra: {type: Double, require: true},
  date: { type: Date, default: Date.now },
  
  products: [{ 
    name: String,
    value: Number, 
    quantity: Number
  }],
})

module.exports = restful.model('Compra', compraSchema)