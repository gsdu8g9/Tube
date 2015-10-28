'use strict';

tubeApp
    .controller("WatchController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', function($rootScope, $scope, $state, $stateParams, videoService) {

        $scope.viewVideo = $stateParams.vid;
        $scope.activeVid = null;
        $scope.vidList = null;
        $scope.activeVidComments = null;

        $scope.togglelikeVideo = function() {

        };

        $scope.toggleDisLikeVideo = function() {

        };


        $scope.toggleSubscribe = function() {

        };

        $scope.togglelikeComment = function(){

        };

        $scope.toggleDislikeComment = function(){

        };

        $scope.getComments = function(){
            videoService.getComments($scope.viewVideo)
                .then(function(response){
                    $scope.activeVidComments = response;
                });
        };

        $scope.getSuggestedVideos = function(){
            videoService.getVideos()
                .then(function(response){
                    $scope.vidList = response;
                    $scope.vidList.forEach(function(item){
                        if(item.id === $scope.viewVideo){
                            $scope.activeVid = item;
                            return;
                        }
                    });
                });
        };

        $scope.init = function(){
            if($scope.viewVideo){
                $scope.getSuggestedVideos();
                $scope.getComments();
            }
            else{
                $state.go('home');
            }
        };
        $scope.init();
    }]);
