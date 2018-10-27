const restful = require('node-restful')
const mongoose = restful.mongoose

const compraSchema = new mongoose.Schema({
  idCliente: { type: Number, required: true },
  valorCompra: {type: Double, require: true},
  date: { type: Date, default: Date.now },
  products: [
      { name: String,
        value: Double }
  ],
})

module.exports = restful.model('Aluno', alunoSchema)