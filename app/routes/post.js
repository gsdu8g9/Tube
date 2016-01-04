var express = require("express");
var router = express.Router();
var passport = require("passport");
var Post = require("../models/post");

// Delete post
// Like a post
// Dislike a post
// Get thread of posts



// POST Create
// Create a post
router.post("/add", passport.authenticate("bearer", { session: false }), function(req, res){
    var user = req.user;

    var post = new Post({
        username:user.username,
        parent_comment:req.body.parent_comment,
        vid_id:req.body.vid_id,
        avatar_url:req.body.avatar_url,
        profile_url:req.body.profile_url,
        likes:0,
        dislikes:0,
        comment: req.body.comment,
        created:{
            type: Date,
            default: Date.now
        },
        updated:{
            type: Date,
            default: Date.now
        }
    });

    post.save(function (err, post) {
        if (err) {
            res.statusCode = 400;
            res.json({ message: "Something went wrong." });
            return;
        }

        res.statusCode = 201;
        res.json(post);
    });
});

// GET Read
// Get a specific post
router.get("/:id", function(req, res, next){
    var obj = {
        id:req.params.id
    };
    console.log(obj);
    Post.findOne({"id": req.params.id }, function(err, post) {
        if(err){
            res.statusCode = 400;
            res.json({message: "Something went wrong."});
            return;
        }
        if(!post){
            res.statusCode = 404;
            return;
        }
        res.json(post);
    });
});

// GET Read
// Get all posts
router.get("/", function(req, res) {
    Post.find({}, function(err, posts){
        res.json(posts);
    });
});


// Update
// Make a change to meta data for a post
router.put("/edit", passport.authenticate("bearer", { session: false }), function(req, res){
    Post.findById(req.body.id, function(err, post){
        if(err || !post){
            res.statusCode = 400;
            res.json({message: "Something went wrong."});
        }

        if(post.username !== req.user.username){
            res.statusCode = 401;
            res.json({message: "Not going to happen..."});
            return;
        }

        post.name = req.body.name;
        post.description = req.body.name;

        post.save(function(err, post){
            if(err){
                res.statusCode = 400;
                res.json({message: "Something went wrong."});
                return;
            }
            res.statusCode = 201;
            res.json(post);
        });
    });
});

// Delete
// Remove a post from db
router.post("/delete", passport.authenticate("bearer", { session: false }), function(req, res){
    Post.findById(req.body.id, function(err, post){
        if(err || !post){
            res.statusCode = 400;
            res.json({message: "Something went wrong."});
        }

        if(post.username !== req.user.username){
            res.statusCode = 401;
            res.json({message: "Not going to happen..."});
            return;
        }

        Post.remove(post, function(err, removed){
            if(err){
                res.statusCode = 400;
                res.json({message: "Something went wrong."});
            }
            res.statusCode = 201;
            res.json(post);
        })
    });
});

module.exports = router;