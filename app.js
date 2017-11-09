/*
 * C2FLA - URL Shortener
 *
 * Author: Fabio Lenine Vilela da Silva
 * LICENSE: MIT
 *
 */

/*jshint esversion: 6 */

const express           = require('express');
const app               = express();
const http              = require('http');
const mongoose			    = require('mongoose');
const bodyParser        = require('body-parser');
const config            = require('./keys/configdb');


require('./modules/dbconnection')(mongoose, config);

const base58            = require('./modules/base58');
const parameters        = require('./modules/parameters');
const crud              = require('./modules/dbcrud')(mongoose);

http.createServer(app).listen(3000);

app.use(bodyParser.json());							          //for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));	// for parsing application/x-www-form-urlencoded

// Parametrization of static public paths and views
app.use(express.static('public/'));
app.set('view engine','ejs');
app.set('views','views');

// Routes
require('./routes/routec2fla.js')(app, crud, parameters, base58);

module.exports = app;
