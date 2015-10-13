var express = require("express");
var path = require("path");

var router = express.Router();

router.get('/',function(req, res){
    res.sendFile(getIndexPath());
});

router.get("/login", function(req, res){
   var file = getIndexPath();
   res.sendFile(file);
});

router.get("/register", function(req, res){
    console.log(util.inspect(req.body));
    res.sendFile(getIndexPath());
});

router.get("/favicon.ico", function(req, res){
   res.statusCode = 404;
});

function getIndexPath(){
    return path.resolve("public/index.html");
}

module.exports = router;