'use strict';

tubeApp.service("videoService", ['$http', function($http){

    var videoService = {};

    /** get users Posted Videos*/
    videoService.getVideos = function(){
        return $http({
            method:'GET',
            url: '../stub/vidSample.json'
        }).then(function(response){
            return response.data;
        });
    };

    /** get comments of Posted Video*/
    videoService.getComments = function(id){
        console.log("passing id: " + id);
        return $http({
            method:'GET',
            url: '../stub/commentSample.json'
        }).then(function(response){
            var comments = response.data.filter(function(comment){
                return comment.vid_id === id;
            })
            return comments;
        });
    };

    return videoService;
}]);