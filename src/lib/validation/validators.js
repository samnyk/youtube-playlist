var validate = require('mongoose-validator');


function validateEmail(val) {
    var EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

    return EMAIL_PATTERN.test(val);
}

var emailValidator = [
    { validator: validateEmail, msg: 'Illegal email format' }
];

var passwordValidator = [
    validate({
        validator: 'isLength',
        arguments: [4, 10],
        message: 'Name should be between 4 and 10 characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only'
    })
];

function validateYoutube(url) {
    var YOUTUBE_PATTERN = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    return YOUTUBE_PATTERN.test(url)
}


var youtubeValidator = [
    { validator: validateYoutube, msg: 'Illegal youtube url' }
];

module.exports = {
    validateYoutube: validateYoutube,
    youtubeValidator: youtubeValidator,
    validateEmail: validateEmail,
    emailValidator: emailValidator,
    passwordValidator:passwordValidator
};



