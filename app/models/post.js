var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Post = new Schema({
    username:String,
    parent_comment:String,
    vid_id:String,
    avatar_url:String,
    profile_url:String,
    likes:Number,
    dislikes:Number,
    comment: String,
    created:{
        type: Date,
        default: Date.now
    },
    updated:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", Post);