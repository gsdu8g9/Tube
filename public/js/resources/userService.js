'use strict';

tubeApp.service("userService", function($http, sessionService){

    var userService = {};

    /** add Play list **/
    userService.addPlaylist = function(listId, vidId){
        sessionService.set(listId, {});
    };

    /** remove Play list **/
    userService.removePlaylist = function(listId){
        sessionService.remove(listId, {});
    };

    /** add video to playlist **/
    userService.addToPlaylist = function(vidId){

    };

    /** remove video from playlist **/
    userService.removeFromPlaylist = function(vidId){

    };

    /** user posts video to public **/
    userService.addVideo = function(vidId){

    };

    /** user removes video from public view **/
    userService.removeVideo = function(vidId){

    };

    /** subscribe to user **/
    userService.subscribeTo = function(userId){

    };

    /** unsubscribe to user **/
    userService.unSubscribeTo = function(userId){

    };

    /*get Users Playlist*/
    userService.getAllPlaylists = function(){
        var playlists;
        $http(function(){

        });
        return playlists
    };
    /**get users Posted Videos*/
    userService.getAllUserVideos = function(){
        var videos;
        $http(function(){

        });
        return videos;
    };

    /** get channels that user is subscribed to */
    userService.getAllSubscriptions = function(){
        var subscriptions;
        $http(function(){

        });
        return subscriptions;
    };

    return userService;
});