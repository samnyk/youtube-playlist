var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/proj_db', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('everything is ok')
    }
});

module.exports = mongoose;