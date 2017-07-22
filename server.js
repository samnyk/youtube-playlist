var express = require('express');
var bodyParser = require('body-parser');
var User = require('./src/models/user');
var path = require('path');
var app = express();
var session = require('express-session')
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(session({secret: '763230876324', resave: false, saveUninitialized: true}))
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/register', function (req, res) {

    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save(user, function (err) {
        if (err) {
            res.send(err);
            res.end();
        } else {
            req.session.user = user;
            res.send({"logged": true});
        }
    });

});

app.get('/isLogedIn', function (req, res) {
    req.session.user ? res.send({"logged": true}) : res.send({"logged": false})
})

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username, password: password}, function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            req.session.user = result;
            res.send(result)
            res.end();
        } else {
            res.send(result);
            res.end();
        }
    })
});


app.get('/myvideos', function (req, res) {
    var obj = req.session.user;
    if (obj) {
        User.findById(obj._id, function (err, result) {
            res.send(result)
        })

    } else {
        res.status(401).send(err)
    }
})

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send({"logged": false});
})

app.post('/removeVideo', function (req, res) {
    var obj = req.session.user;
    var details = req.body;
    User.update({_id:obj._id},{ $pull: { "videos" : { _id: details.id} } },function(err,result){
            if(err){
                res.send(err)
            }else{
                res.send(result)
            }
        }
    );

})

app.post('/editVideo', function (req, res) {
    var obj = req.session.user;
    var details = req.body;

    User.findById(obj._id,
        function(err,ans){
            if(err){
                res.send(err)
            }else{

                for(var i=0 ; ans.videos.length > i ; i++){
                    if(ans.videos[i]._id == details.id){
                        ans.videos[i].videolink = details.link;
                        ans.videos[i].videoname = details.name;
                        ans.videos[i].videothumb = details.thumb;
                        break;
                    }
                }
                ans.save();
            }
            res.send(ans)
        })
})


app.post('/addvideo', function (req, res) {
    var user = req.session.user;
    var details = req.body;


    User.findByIdAndUpdate(user._id,
        {
            $push: {
                videos: {
                    videoname: details.name,
                    videolink: details.link,
                    videothumb: details.img
                }

            }
        }, {new: true}, function (err, doc) {

            if (err) {
                res.send(err)
            }
            res.send(doc)
        })


})

app.listen(27017, function () {
    console.log('Example app listening on port 27017!')
})