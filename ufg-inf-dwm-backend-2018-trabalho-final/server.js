const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const allowCors = require('./cors');
const queryParser = require('express-query-int');
const router = require('./router');
require('./compras/comprasController');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

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

server.listen(3000, function() {
  console.log(`MyAPI is running on port 3000.`)
})
