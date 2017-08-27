
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
//const passmarked = require('passmarked');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passmarked = require('./services/passmarked');
const passport = require('passport');
const anonymous = require('passport-anonymous').Strategy;
const requireAuth = passport.authenticate(['jwt', 'anonymous'],{session : false});
//const requireAuth = passport.authenticate('jwt',{session : false});

const requireSignin = passport.authenticate('local',{session : false});

var app = express();
app.use(bodyParser.json({type:'*/*'}));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());




// APIs
//mongoose.connect('mongodb://localhost:27017/seogram');

mongoose.connect('mongodb://test:Hamed1357@ds013290.mlab.com:13290/seogram');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'#Monodd-Connection error'));

// url test api

var Report = require('./models/report.js');
var User = require('./models/user.js');


//Passmarked method

app.get('/testUrl/',requireAuth,function(req,res){

  let userId = '';
  if(req.user) {
  userId = req.user._id;
  }
  var targeturl = req.query.url;
  passmarked.testUrl(targeturl,userId,req,res);
});

// Requesting All tests
app.get('/allTest/:skip',requireAuth,function(req,res){
  userId = req.user._id;
  var skips = Number(req.params.skip);
  if(req.user.admin ===true){
    Report.find().skip(skips).limit(20).exec(function (err, tests) {
        if(err){
          res.json(err);
        }
        res.json(tests)
      });
  }
  else {
    Report.find({'user_id' : userId}).skip(skips).limit(4).exec(function (err, tests) {
        if(err){
          res.json(err);
        }
        res.json(tests)
      });
  }

});

// Get Old Report
app.get('/getOldReport/:id',requireAuth, function(req,res){
  var id = req.params.id;
  Report.findOne({ 'report_id': id },function(err, oldTest){
  if(err){
  res.json(err);
  }
  res.json(oldTest);
});

});

//Get User Profile
app.get('/getProfile',requireAuth,function(req,res){
  let id = req.user._id;
  User.findOne({'_id' : id},{password : 0},function(err,profile){

    if(err){
    res.json(err);
    }
    res.json(profile);
  });
});

//Update Profile
app.put('/updateProfile',requireAuth, function(req, res){

    let id = req.user._id;
    let profile = req.body;

    var update = {'$set':{
      firstName : profile.firstName,
      lastName : profile.lastName,
      //email : profile.email
     }
     };
     // When true returns the updated document
     var options = {new: true};
     User.findOneAndUpdate({_id:id},update,
    options, function(err, profile){
     if(err){
       res.json(err);
     }
     let data = profile;
     data.password=null;
     res.json(data);
     })
})

//update password
app.put('/updatePassword',requireAuth,function(req,res){
  let id = req.user._id;
  let newPassword = req.body.password;
  User.findOne({'_id' : id},function(err,profile){
    if(err){
      res.json(err);
    }
    profile.password = newPassword;
    profile.save(function(err,newProfile){
      if(err){res.json(err);}
      let data = newProfile;
      data.password=null;
      res.json(data);
    });
  })
});


app.post('/signup', Authentication.signup);

//app.post('/signin',requireSignin,Authentication.signin);

// app.post('signin',function(req,res,next){
//   passport.authenticate('local',{session : false},function(err,user,info){
//     if(err){return next(err);}
//
//   });
// });


app.post('/signin', function(req, res, next) {
  passport.authenticate('local',{session : false}, function(err, user, info) {
  if(err){return next(err);}
  if (!user) {
    res.send({info: info});
   }else {
     Authentication.signin(req,res,user);
   }

})
  (req, res, next);

});




app.get('/verifyUser/:token',function(req,res){
  const {token}= req.params;

  let  update = {'$set':{
    emailToken : '',
    active : true
   }
   };

   let options = {new: true};

  User.findOneAndUpdate({'emailToken' : token, emailTokenExpire: { $gt: Date.now() }},update,options,function(err,user){
    if(err){
      res.json(err)
    }
    if(!user){
      res.json('No user Found');
    }else {

      res.json('Your account is now activated . Please Sign in.');
    }

  });
});


//forgot password
app.post('/forgot', Authentication.forgot);


app.post('/resetPassword',function(req,res){
  let token= req.body.token;
  let newPassword = req.body.newPassword;

  User.findOne({'forgetPassToken' : token,forgetPassTokenExpire: { $gt: Date.now() }},function(err,user){
    if(err){res.json(err)}
    if(!user){res.json('No user Found');
    }
    else {
      user.password = newPassword;
      user.forgetPassToken = '';
       user.save(function(err,newProfile){
         if(err){res.json(err);}
         res.json('Your password is changed . Please Sign in with your new password.');
       });
    }
  });
});

app.listen(3001, function(err){
 if(err){
 return console.log(err);
 }
 console.log('API Sever is listening on http://localhost:3001');
});
