var express = require("express");
var passport = require("passport");
var crypto = require("crypto");
var User = require("../models/user");
var util = require("util");
var AccessToken = require("../models/accessToken");
var validator = require("../models/validator");

var router = express.Router();

/* POST /login */
router.post("/login", function(req, res) {
	passport.authenticate("local", {
		session : false
	}, function(err, user, info) {
		if (user) {
			AccessToken.findOne({
				userId : user.id
			}, function(err, token) {
				if (err) {
					return done(err);
				}

				if (token) {
					AccessToken.remove({
						token : token.token
					}, function(err) {
						if (err)
							return done(err);
					});
				}

				var tokenValue = crypto.randomBytes(32).toString('base64');

				token = new AccessToken({
					token : tokenValue,
					userId : user.id
				});

				token.save(function(err, token) {
					if (err) {
						return done(err);
					}
					tempUser = {
						displayName : user.displayName,
						username : user.username,
						token : tokenValue
					};

					res.json(tempUser);
				});
			});
		} else {
			res.statusCode = 400;

			if (info.message) {
				res.json(info);
			}
		}
	})(req, res);
});

// logout
router.post("/logout", function(req, res, next) {
	console.log("This is working...");
	req.logout();
	next();
}, function(req, res) {
	res.statusCode = 200;
	res.end();
});

router.post("/update", passport.authenticate("bearer", {
	session : false
}), function(req, res) {

	// Check if logged in and session is valid
	if (req.user) {
		// check if user exists
		// if updating password do something special
		// may need last updated date for user
		console.log(req.body.username + ' 1!!');
		console.log(req.body.name + ' 2!!');

		var user = req.user;
		var isValid = true;
		var errMsg = '';
		console.log(validator.isValidUserName(req.body.username) + ' testing validator')
		console.log("ytytyt: ", user._id);

		User.findById(user._id, function(err, dbUser) {

			// console.log("dbUser: ", dbUser);
			if (!dbUser)
				return next(new Error('Could not load Document'));
			else {
				// do your updates here
				if (!validator.isValidUserName(req.body.username)){
					isValid = false;
					errMsg = "Error: Invalid UserName.\n";
				}
				if(!validator.isValidEmail(req.body.email)){
					isValid = false;
					errMsg = errMsg + "Error: Invalid Email Address.\n";
				}
			
				if(!validator.isValidPhoneNumber(req.body.phone)){
					isValid = false;
					errMsg = errMsg + "Error: Invalid Phone Number.\n";
				}
				if(isValid){
					dbUser.username = req.body.username;
					dbUser.email = req.body.email;
					dbUser.location = req.body.location;
					dbUser.phone = req.body.phone;
					
					dbUser.save(function(err) {
						if (err)
							console.log('error 111 : ' + err);
						else
							console.log('success 222');
					});
					res.statusCode = 200;
					res.json(dbUser);
					//res.end();
				}else{
					console.log('isValid = ' + isValid);
					res.send(500,{error : errMsg});
					return;
				}
			}
		});
	} else {
		res.send(500, {
			error : "You are not logged in!!!"
		});
		return;
	}
	// console.log(res.end());
});

// register
router.post("/register", function(req, res) {
	console.log(util.inspect(req.body));
	var user = new User({
		username : req.body.username,
		displayName : req.body.firstname + " " + req.body.lastname,
		gender : req.body.gender,
		birthday : req.body.birthday || new Date(),
		email : req.body.email,
		location : req.body.location || "",
		phone : req.body.phone,
		terms : req.body.terms
	});

	// work out this
	console.log(validator.isValidUserName(req.username))

	User.register(user, req.body.password, function(err, account) {
		if (err) {
			res.statusCode = 400;
			res.json({
				message : err.message
			});
			res.end();
			return;
		}

		req.login(account, {
			session : false
		}, function(err) {
			if (err) {
				return next(err);
			}

			AccessToken.findOne({
				userId : user.id
			}, function(err, token) {
				if (err) {
					return done(err);
				}

				if (token) {
					AccessToken.remove({
						token : token.token
					}, function(err) {
						if (err)
							return done(err);
					});
				}

				var tokenValue = crypto.randomBytes(32).toString('base64');

				token = new AccessToken({
					token : tokenValue,
					userId : user.id
				});

				token.save(function(err, token) {
					if (err) {
						return done(err);
					}
					account.token = tokenValue;
					res.json(account);
				})
			});
		});
	});

});

module.exports = router;