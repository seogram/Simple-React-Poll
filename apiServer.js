const axios = require('axios');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
const anonymous = require('passport-anonymous').Strategy;
const validator = require('validator');
var isUrl = require('is-url-superb');

var app = express();
app.use(bodyParser.json({type:'*/*'}));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());




// APIs
mongoose.connect('mongodb://localhost:27017/seogram');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'#Monodd-Connection error'));

var User = require('./models/user.js');


// app.get('/testUrl/',requireAuth,function(req,res){
//   let userId = '';
//   if(req.user) {
//   userId = req.user._id;
//   }
//   let targeturl = req.query.url;
//
//   if (isUrl(targeturl)){
//     gtmetrix.testUrl(targeturl,userId,req,res);
//   }else {
//   console.log(err);
//   }
// });


app.listen(3001, function(err){
 if(err){
 return console.log(err);
 }
 console.log('API Sever is listening on http://localhost:3001');
});
