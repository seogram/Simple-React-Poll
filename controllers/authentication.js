const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config/authentication');
const randomString = require('randomstring');
const mailer = require('../services/mailer');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

// exports.signin = function(req, res, next) {
//
//
//   res.send({ token: tokenForUser(req.user) });
// }

exports.signin = function(req,res,user) {

  // User has already had their email and password auth'd
  // We just need to give them a token
//  console.log('user from authentication',user._id);
  res.send({ token: tokenForUser(user) });
}



exports.forgot = function(req,res,next){
  const UserEmail = req.body.email;
  if(!UserEmail){
    return res.status(422).send({error: 'You must provie email'});
  }
  const secretToken = randomString.generate();
  let update = {'$set':{
    forgetPassToken : secretToken,
    forgetPassTokenExpire : Date.now()+86400000
  }}
  let options = {new: true};
  User.findOneAndUpdate({email:UserEmail},update,options, function(err, user){
  if(err){return next(err);}
  if(!user){
    return res.status(422).send({error: 'We can not find your email in our database '});
  }
  if(user){
    // Compose email
    const html = `Hello,
      <br/>
      <br/>
      Someone requested a password reset for your account, please <a  href="http://localhost:3000/passwordReset/${secretToken}"> Click Here</a> to reset your password.
      <br/>
      If this was not you, ignore this email
      <br/>
      Have a awesome day, the SEOGRAM team`
     mailer.sendEmail('info@seogram.de', UserEmail, 'Reset Password!', html);
     res.json({message : 'Password reset email was sent'});
  }

});


}



exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }
  const secretToken = randomString.generate();


  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    //Create token to be used in registration email
    const secretToken = randomString.generate();

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
      emailToken : secretToken,
      emailTokenExpire : Date.now()+86400000,
      forgetPassToken : '',
      active :false,
      admin : false
    });

     user.save(function(err) {
    if (err) { return next(err); }


    // Compose email
         const html = `Hello,
         <br/>
         Thank you for registration!
         <br/>
         Please verify your email by click on the following link:
         <br/>
         <a href="http://localhost:3000/verifyUser/${secretToken}">Click Here..</a>
         <br/><br/>
         Thanks from Your SEOGRAM team !`
          mailer.sendEmail('info@seogram.de', email, 'Please verify your email!', html);
      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}
