var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Video = new Schema({
    id:String,
    name:String,
    publish_date:{
        type: Date,
        default: Date.now
    },
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