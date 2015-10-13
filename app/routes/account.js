var express = require("express");
var passport = require("passport");
var crypto = require("crypto");
var User = require("../models/user");
var util = require("util");
var AccessToken = require("../models/accessToken");

var router = express.Router();

/* POST /login */
router.post("/login", function(req, res){
    passport.authenticate("local", { session: false }, function(err, user, info){
        if(user) {
            AccessToken.findOne({userId: user.id}, function(err, token){
                if(err){return done(err);}

                if(token){
                    AccessToken.remove({token: token.token}, function(err){
                       if(err) return done(err);
                    });
                }

                var tokenValue = crypto.randomBytes(32).toString('base64');

                token = new AccessToken({
                    token: tokenValue,
                    userId: user.id
                });

                token.save(function(err, token){
                    if(err){return done(err);}
                    tempUser = {
                        displayName: user.displayName,
                        username: user.username,
                        token:tokenValue
                    };

                    res.json(tempUser);
                });
            });
       }
       else {
           res.statusCode = 400;

           if(info.message){
               res.json(info);
           }
       }
    })(req, res);
});

//logout
router.post("/logout", function(req, res, next){
    req.logout();
    next();
}, function(req, res){
    res.statusCode = 200;
    res.end();
});

//register
router.post("/register", function(req, res){

    var user = new User({
        username: req.body.username,
        displayName: req.body.name,
        age:req.body.age,
        email:req.body.email
//        password:req.body.password,
//        confirmPassword:req.body.confirmPassword
    });
    console.log(util.inspect(req.body));

    User.register(user, req.body.password, function(err, account){
       if(err){
           res.statusCode = 400;
           res.json({message: err.message });
           res.end();
           return;
       }

        req.login(account, {session: false}, function(err){
            if(err){return next(err);}

            AccessToken.findOne({ userId: user.id }, function(err, token){
                if(err){return done(err);}

                if(token){
                    AccessToken.remove({ token: token.token }, function(err){
                       if(err) return done(err);
                    });
                }

                var tokenValue = crypto.randomBytes(32).toString('base64');

                token = new AccessToken({
                    token: tokenValue,
                    userId: user.id
                });

                token.save(function(err, token){
                    if(err){return done(err);}
                    account.token = tokenValue;
                    res.json(account);
                })
            });
        });
    });

});

module.exports = router;