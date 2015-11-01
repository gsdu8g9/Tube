var express = require("express");
var router = express.Router();
var passport = require("passport");
var Video = require("../models/video");


// POST Create
// Create a movie
router.post("", passport.authenticate("bearer", { session: false }), function(){
    var user = req.user;
    var video = new Video({
        id:"anGrQ",
        name:req.body.name,
        publish_date: Date.now(),
        description:req.body.description,
        ownerid:req.body.ownerid,
        owner:req.body.owner,
        profile_url:user.profile_url,
        views:0,
        likes:0,
        dislikes:0,
        commentCount:0,
        userPic:user.userPic,
        comments:true
    });

    video.save(function (err, video) {
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
// Get a specific video
router.get("/:id", function(req, res, next){
    var obj = {
        id:req.params.id
    };

    Video.findById(req.params.id, function(err, video) {
       if(err){
           res.statusCode = 400;
           res.json({message: "Something went wrong."});
           return;
       }
       if(!video){
           res.statusCode = 404;
           return;
       }
        res.json(video);
    });
});

router.get("/", function(req, res) {
    Video.find({}, function(err, videos){
        res.json(videos);
    });
});


// Update
// Make a change to meta data for a video
router.put("/", passport.authenticate("bearer", { session: false }), function(req, res){
    Video.findById(req.body.id, function(err, video){
        if(err || !video){
            res.statusCode = 400;
            res.json({message: "Something went wrong."});
        }

        if(video.username !== req.user.username){
            res.statusCode = 401;
            res.json({message: "Not going to happen..."});
            return;
        }

        video.name = req.body.name;
        video.description = req.body.name;

        video.save(function(err, video){
           if(err){
               res.statusCode = 400;
               res.json({message: "Something went wrong."});
               return;
           }
           res.statusCode = 201;
           res.json(video);
        });
    });
});

// Delete
// Remove a movie from db
router.post("", function(){

});

module.exports = router;