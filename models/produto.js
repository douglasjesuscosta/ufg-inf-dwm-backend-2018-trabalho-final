var mongoose = require('mongoose');

var Produto = mongoose.model('Produto', {
    nome: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    preco: {
        type: Number,
        required: true
    }
});

module.exports = { Produto }