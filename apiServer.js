"use strict"
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/bookshop');
mongoose.connect('mongodb://testUser:12345@ds151452.mlab.com:51452/bookshop');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'#Monodd-Connection error'));
// ----> Setup session ---- //
app.use(session({
    secret: 'mySecrett',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    cookie : {maxAge : 1000*60*60*24*2},
    store: new mongoStore({
        mongooseConnection : db,
        ttl: 24 * 3600 // time period in seconds
    })
}));
// SAVE SESSION CART API
app.post('/cart', function(req, res){
var cart = req.body;
req.session.cart = cart;
req.session.save(function(err){
if(err){
throw err;
}
res.json(req.session.cart);
})
});
// GET SESSION CART API
app.get('/cart', function(req, res){
if(typeof req.session.cart !=='undefined'){
res.json(req.session.cart);
}
});
//---- End session -------- //
var Books = require('./models/books.js');
//---->>> POST BOOKS <<<-----
app.post('/books', function(req, res){
 var book = req.body;
 Books.create(book, function(err, books){
 if(err){
 throw err;
 }
 res.json(books);
 })
});
//----->>>> GET BOOKS <<<---------
app.get('/books', function(req, res){
Books.find(function(err, books){
if(err){
throw err;
}
res.json(books)
})
});
//---->>> DELETE BOOKS <<<------
app.delete('/books/:_id', function(req, res){
var query = {_id: req.params._id};
Books.remove(query, function(err, books){
if(err){
throw err;
}
res.json(books);
})
});
//---->>> UPDATE BOOKS <<<------
app.put('/books/:_id', function(req, res){
var book = req.body;
var query = req.params._id;

var update = {'$set':{
 title:book.title,
 description:book.description,
 image:book.image,
 price:book.price
 }
 };
 // When true returns the updated document
 var options = {new: true};
 Books.findOneAndUpdate(query, update,
options, function(err, books){
 if(err){
 throw err;
 }
 res.json(books);
 })
})
// END APIs

//Get books images API
app.get('/images',function(req,res){
  const imgFolder = __dirname + '/public/images';
  //require file system
  const fs = require('fs');
  //read all files in the directory
  fs.readdir(imgFolder,function(err,files){
    if(err){
    return  console.error(err);
    }
    //return an empty array
    const fileArr = [];
    files.forEach(function(file){
      fileArr.push({name : file})
    })
    res.json(fileArr);
  });
});

// url test api
var Tests = require('./models/tests.js');
app.get('/testUrl/:url', function(req, res){
  var targeturl = req.params.url;
  var gtmetrix = require ('gtmetrix') ({
    email: 'pamo@wmail.club',
    apikey: '052e3a2e9e948d997e774bd8b34849d3'
  });
  var test = {
    url: targeturl,
    location: 3,
    browser: 3
  };

  gtmetrix.test.create (test, function(err,testResult){
    if(err){
    throw err;
    }
    var id = testResult.test_id;
    var fs = require('fs');
    const imgPath = __dirname + '/public/images/'+'screenshot'+id+'.jpg';

    gtmetrix.test.get (id,'screenshot',6000, function(err,data){
      if(err){
      return console.log (err);
    }
    fs.writeFile (imgPath, data, console.log);
  });
    gtmetrix.test.get (id,6000, function(err,response){
      if(err){
      return console.log (err);
    }//save to database
    response.imgPath = 'screenshot'+id+'.jpg' ;
    response.targeturl = targeturl;
    console.log(response);
    Tests.create(response, function(err){
    if(err){
    throw err;
    }
    });

res.json(response);

});
});

//Get Previous test results when the main test page is loaded
});

app.get('/test',function(req,res){
  Tests.find(function(err, tests){
  if(err){
  throw err;
  }
  res.json(tests)
});
});

app.listen(3001, function(err){
 if(err){
 return console.log(err);
 }
 console.log('API Sever is listening on http://localhost:3001');
});
