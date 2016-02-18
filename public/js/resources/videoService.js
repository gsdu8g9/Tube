'use strict';

tubeApp.service("videoService", ['$http',"$q", 'sessionService', function($http, $q, sessionService){

    var videoService = {};

    var transformData = function(obj){
        var str = [];

        for(var p in obj){
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };

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
            url: '/post/all/' + id
        }).then(function(response){
            return response.data;
        });
    };

    videoService.setNewComment = function(comment){
        var result = $q.defer();

        $http.post("/post/add", comment, {
            headers:{
                "Authorization": "Bearer " + sessionService.getToken(),
                "Content-Type": "application/json"
            }
        }).success(function(response){
            result.resolve(response);
        }).error(function(response){
            result.reject(response);
        });

        return result.promise;
    };

    return videoService;
}]);