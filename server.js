
// modules =================================================
var express = require('express');
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var passport = require("passport");

var app = express();


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

mongoose.connect("mongodb://localhost/tube", function(err){
    if(err) {
        console.log("Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!");
    }
})

// configure routes
var staticRoutes = require("./app/routes/index");
var account = require("./app/routes/account");

app.use("*", function(req, res, next){
    res.header("Cache-Control","private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
})

app.use("/account",account);
app.use("/", staticRoutes);

var port = 8080;
app.listen(port);
console.log('Magic happens on port ' + port);