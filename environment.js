
const express = require('express');
const app = express();
const session = require('express-session');
const jwt = require('./model/jwt');
require('./controller/formInject');
require('dotenv').config();
var cookieParser = require('cookie-parser');
const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`;
var environment =
[app.set('view engine','ejs'),
app.use(express.urlencoded({extended: false})),
app.use(express.json()),
app.use( express.static( "public" ) ),
app.use(cookieParser()),
app.use(session({
    secret: jwt(),
    saveUninitialized: false,
    resave: false,
    maxAge: 3600000,
  }))]

  module.exports = environment,url;

