const bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    password :{type : String , required : true},
    firstName : String,
    lastName : String,
    email : {type: String , required : true , unique : true , lowercase : true},
    emailToken :String ,
    emailTokenExpire : Date,
    forgetPassToken : String,
    forgetPassTokenExpire : Date,
    active : Boolean,
    admin : Boolean
});

userSchema.pre('save', function(next) {
    var user = this;

  //  if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt,null, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};




var User = mongoose.model('User',userSchema);
module.exports = User;
