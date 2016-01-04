
// modules =================================================
var express = require('express');
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var passport = require("passport");
var http = require('http');
var port = 8080;
var app = express();
var server = app.listen(port);
var io = require('socket.io').listen(server);
var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');
var Files = {};

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());

var LocalStrategy = require("passport-local").Strategy;
var BearerStrategy = require("passport-http-bearer");

var User = require("./app/models/user");
var AccessToken = require("./app/models/accessToken");

var accessTokenStrategy = new BearerStrategy(
    function(accessToken, done){
        AccessToken.findOne({token: accessToken}, function(err, token){
            if(err){return done(err); }
            if(!token) {return done(null, false); }

            if(Math.round((token.expires - token.created) / 1000) > 7200){
                AccessToken.remove({token: accessToken}, function(err){
                   if(err) return done(err);
                });
                return done(null, false, {message: 'Token expired!'});
            }

            User.findById(token.userId, function(err, user){
                if(err) {return done(err); }
                if(!user) {return done(null, false, {message: 'Unknown user!'}); }

                var info = {scope: '*'}
                done(null, user, info);
            });
        })
    });

passport.use(new LocalStrategy(User.authenticate()));
passport.use(accessTokenStrategy);

io.sockets.on('connection', function (socket) {

    socket.on('Start', function (data) { //data contains the variables that we passed through in the html file
        console.log("!!!!!!!!!!! WORKING>>> !!!!!!!!!!", data);
        var Name = data['Name'];
        Files[Name] = {  //Create a new Entry in The Files Variable
            FileSize : data['Size'],
            Data     : "",
            Downloaded : 0
        }
        var Place = 0;
        try{
            var Stat = fs.statSync('Temp/' +  Name);
            if(Stat.isFile())
            {
                Files[Name]['Downloaded'] = Stat.size;
                Place = Stat.size / 524288;
            }
        }
        catch(er){} //It's a New File
        fs.open("Temp/" + Name, "a", 0755, function(err, fd){
            if(err)
            {
                console.log("-----------", err);
            }
            else
            {
                Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
                socket.emit('MoreData', { 'Place' : Place, Percent : 0 });
            }
        });
    });

    socket.on('Upload', function (data){
        var Name = data['Name'];
        Files[Name]['Downloaded'] += data['Data'].length;
        Files[Name]['Data'] += data['Data'];

        //If File is Fully Uploaded
        if(Files[Name]['Downloaded'] == Files[Name]['FileSize']){
            fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
                //Get Thumbnail
                var input = fs.createReadStream("Temp/" + Name);
                var output = fs.createWriteStream("public/vid/" + Name);

                input.pipe(output);
                input.on("end", function(){
                    console.log("end");
                    fs.unlink("Temp/" + Name, function () {
                        console.log("unlink this file:", Name );
//                        exec("ffmpeg -i Video/" + Name  + " -ss 01:30 -r 1 -an -vframes 1 -f mjpeg Video/" + Name  + ".jpg", function(err){
//                            socket.emit('Done', {'Image' : 'public/vid/' + Name + '.jpg'});
//                        });
//                        socket.emit('Done', {'Image' : 'public/vid/' + Name + '.jpg'});
                        socket.emit('Done', {'Image' : 'public/vid/' + Name});
                    });
                });
            });
        }
        else if(Files[Name]['Data'].length > 10485760){ //If the Data Buffer reaches 10MB
            fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
                Files[Name]['Data'] = ""; //Reset The Buffer
                var Place = Files[Name]['Downloaded'] / 524288;
                var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
                socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
            });
        }
        else {
            var Place = Files[Name]['Downloaded'] / 524288;
            var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
            socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
        }
    });
});


mongoose.connect("mongodb://localhost/tube", function(err){
    if(err) {
        console.log("Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!");
    }
})

// configure routes
var staticRoutes = require("./app/routes/index");
var account = require("./app/routes/account");
var video = require("./app/routes/video");
var post = require("./app/routes/post");

app.use("*", function(req, res, next){
    res.header("Cache-Control","private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
})

app.use("/account", account);
app.use("/video", video);
app.use("/post", post);
app.use("/", staticRoutes);

console.log('Magic happens on port ' + port);