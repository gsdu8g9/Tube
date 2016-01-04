'use strict';

tubeApp.service("videoService", ['$http', 'sessionService', function($http, sessionService){

    var videoService = {};

    /** Get users Posted Videos **/
    videoService.getVideos = function(){
        return $http({
            method:'GET',
            url: '/video'
        }).then(function(response){
            return response.data;
        });
    };

    /** Get users video viewing history **/
    videoService.history = function(){
        // Get user_id
        // Make call
        $http(function(){

        });
    };

    /** Get videos to recommend to user **/
    videoService.recommended = function(){
        // Get user_id
        // Make call
        $http(function(){

        });
    };

    // Get trending videos
    videoService.trending = function(){
        // Make call
        $http(function(){

        });
    };

    /** Get video to view **/
    videoService.getVideo = function(id){
        return $http({
            method:'GET',
            url: '/video/' + id
        }).then(function(response){
                return response.data;
            });
    };

    /** get comments of Posted Video*/
    videoService.getComments = function(id){
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