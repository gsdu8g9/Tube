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
        child_comments:[],
        vid_id:req.body.vid_id,
        avatar_url:user.avatar_url || "/img/Avatar_Blank.jpg",
        profile_url:user.profile_url || "",
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

router.post("/reply", passport.authenticate("bearer", { session: false }), function(req, res){
    // find parent comment
    Post.findOne({"_id": req.body.parent_comment }, function(err, post) {
        console.log("This is it: ", post);
        if(err){
            res.statusCode = 400;
            res.json({message: "Something went wrong."});
            return;
        }
        if(!post){
            res.statusCode = 404;
            return;
        }
        // If we found the parent
        if(post){
            var user = req.user;
            var child_post = new Post({
                username:user.username,
                parent_comment:req.body.parent_comment,
                child_comments:[],
                vid_id:req.body.vid_id,
                avatar_url:user.avatar_url || "/img/Avatar_Blank.jpg",
                profile_url:user.profile_url || "",
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
            // Add post to table
            child_post.save(function (err, ch_post) {
                if (err) {
                    res.statusCode = 400;
                    res.json({ message: "Something went wrong." });
                    return;
                }
                if(ch_post){
                    // Add to post to parent post child list
                    post.child_comments.push(ch_post._id);
                    post.save(function(err, prt_post){
                        if(err) {
                            res.statusCode = 400;
                            res.json({message: "Something went wrong."});
                            return;
                        }
                        else {
                            res.statusCode = 201;
                            res.json(ch_post);
                        }
                    })
                }
            });
        }
    });
});


// GET Read
// Get a specific post
router.get("/:id", function(req, res, next){
    var obj = {
        id:req.params.id
    };
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
// Get a specific post
router.get("/all/:id", function(req, res, next){

    Post.find({"vid_id": req.params.id }, function(err, post) {
        if(err){
            res.statusCode = 400;
            return;
        }
        if(!post){
            res.statusCode = 404;
            return;
        }
        res.json(post);
    });
});

router.post("/all/sub", passport.authenticate("bearer", { session: false }), function(req, res){
    Post.find({"parent_comment": req.body.cid }, function(err, post) {
        if(err){
            res.statusCode = 400;
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


// Update
// Make a change to meta data for a post
router.put("/like", passport.authenticate("bearer", { session: false }), function(req, res){
    Post.findById(req.body.cid, function(err, post){
        if(err || !post){
            res.statusCode = 400;
            res.json({message: "Something went wrong."});
        }

        if(req.body.value === true){
            console.log("HIT! adding one");
            post.likes += 1;
        }
        else {
            console.log("HIT! subtracting one");
            post.likes -= 1;
        }

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
// Update
// Make a change to meta data for a post
router.put("/dislike", passport.authenticate("bearer", { session: false }), function(req, res){
    Post.findById(req.body.cid, function(err, post){
        if(err || !post){
            res.statusCode = 400;
            res.json({message: "Something went wrong."});
        }

        if(req.body.value === true){
            console.log("HIT! adding one");
            post.dislikes += 1;
        }
        else {
            console.log("HIT! subtracting one");
            post.likes -= 1;
        }

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