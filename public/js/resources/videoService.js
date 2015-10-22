'use strict';

tubeApp.service("videoService", ['$http', function($http){

    var videoService = {};

    /**get users Posted Videos*/
    videoService.getVideos = function(){
        return $http({
            method:'GET',
            url: '../stub/vidSample.json'
        }).then(function(response){
            return response.data;
        });
    };

    return videoService;
}]);