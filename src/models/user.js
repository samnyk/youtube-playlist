var mongoose = require('../lib/db');
var emailValidator = require('../lib/validation/validators').emailValidator;
var youtubeValidator = require('../lib/validation/validators').youtubeValidator;
var passwordValidator = require('../lib/validation/validators').passwordValidator;

var userSchema = new mongoose.Schema(
    {
    username: { type: String, required: true, unique: true},
    email: { type: String, unique: true, validate: emailValidator, required: true },
    password: { type: String,unique: false,validate: passwordValidator, required: true},
    videos:[
        {
            videoname: {type: String, required: true,unique: false},
            videolink: {type: String, validate:youtubeValidator,required: true,unique: false},
            videothumb:{type:String}
        }
    ]
});

var User = mongoose.model('User', userSchema);

module.exports = User;