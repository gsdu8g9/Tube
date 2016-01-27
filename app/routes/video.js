var express = require("express");
var router = express.Router();
var passport = require("passport");
var Video = require("../models/video");


// POST Create
// Create a movie
router.post("/add", passport.authenticate("bearer", { session: false }), function(req, res){
    var user = req.user;
    var video = new Video({
        id:req.body.id,
        name:req.body.name,
        thumbnail_url:req.body.thumbnail_url,
        vid_url:req.body.vid_url,
        publish_date: Date.now(),
        vid_time:req.body.vid_time,
        description:req.body.description,
        ownerid:req.body.ownerid,
        owner:req.body.owner,
        profile_url:user.profile_url || req.body.profile_url,
        views:0,
        likes:0,
        dislikes:0,
        commentCount:0,
        userPic:user.userPic || req.body.userPic,
        comments:true
    });

    video.save(function (err, video) {
        if (err) {
            res.statusCode = 400;
            res.json({ message: "Something went wrong." });
            return;
        }

        res.statusCode = 201;
        res.json(video);
    });
});

// GET Read
// Get a specific video
router.get("/:id", function(req, res, next){
    var obj = {
        id:req.params.id
    };
    console.log(obj);
    Video.findOne({"id": req.params.id }, function(err, video) {
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

// GET Read
// Get all videos
router.get("/", function(req, res) {
    Video.find({}, function(err, videos){
        res.json(videos);
    });
});


// Update
// Make a change to meta data for a video
router.post("/edit", passport.authenticate("bearer", { session: false }), function(req, res){
    //Video.findById(req.body._id, function(err, video){
    Video.findOne({ 'id': req.body.id }, function(err, video){	
    	console.log("testing video edit!!!!");
        if(err || !video){
            res.statusCode = 400;
            res.json({message: "Something went wrong."});
        }

        /*if(video.username !== req.user.username){
            res.statusCode = 401;
            res.json({message: "Not going to happen..."});
            return;
        }*/

        //video.name = req.body.name;
        //video.description = req.body.name;
        console.log("video object: " + video);
        console.log("video name: " + video.name);
        console.log("video description: " + video.description);
        
        console.log("req.body.id: " + req.body.id);
        console.log("req.body.name: " + req.body.name);
        console.log("req.body.description: " + req.body.description);
        
        video.name = req.body.name;
        video.description = req.body.description;
        
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
router.post("/delete", function(){

});

module.exports = router;