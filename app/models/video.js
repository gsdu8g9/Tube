var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Video = new Schema({
    id:String,
    name:String,
    thumbnail_url:String,
    vid_url:String,
    publish_date:{
        type: Date,
        default: Date.now
    },
    vid_time:String,
    description:String,
    ownerid:String,
    owner:String,
    profile_url:String,
    views:Number,
    likes:Number,
    dislikes:Number,
    commentCount:Number,
    userPic:String,
    comments:Boolean
});

module.exports = mongoose.model("Video", Video);