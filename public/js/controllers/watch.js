'use strict';

tubeApp
    .controller("WatchController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', 'sessionService', function($rootScope, $scope, $state, $stateParams, videoService, sessionService) {

        $scope.viewVideo = $stateParams.vid;
        $scope.activeVid = null;
        $scope.vidList = null;
        $scope.activeVidComments = null;
        $scope.userAvatar = sessionService.get('avatar') || "/img/Avatar_Blank.jpg";

        $scope.togglelikeVideo = function() {

        };

        $scope.toggleDisLikeVideo = function() {

        };

        $scope.toggleSubscribe = function() {
            // toggle Video owners subscriptions
            // toggle Users subscriptions
        };

        $scope.togglelikeComment = function(){

        };

        $scope.toggleDislikeComment = function(){

        };

        $scope.updateComment = function(res){
//            $scope.activeVidComments.
        };

        $scope.getComments = function(){
            videoService.getComments($scope.viewVideo)
                .then(function(response){
                    $scope.activeVidComments = response;
                });
        };

        $scope.setNewComment = function(comment){

            var newComment = {
                parent_comment: null,
                vid_id: $scope.viewVideo,
                comment: comment
            };

            videoService.setNewComment(newComment)
                .then(function(response){
                    if(response && response._id){
                        $scope.activeVidComments.unshift(response);
                    }
                });
        }

        $scope.getSuggestedVideos = function(){
            videoService.getVideos()
                .then(function(response){
                    $scope.vidList = response;
                });
        };

        $scope.getVideo = function(){
            videoService.getVideo($scope.viewVideo)
                .then(function(response){
                    $scope.activeVid = response;
                    $("video:nth-child(1)").attr("src",$scope.activeVid.vid_url);
                });
        };

        $scope.init = function(){

            document.querySelector('.strt-new-comment').addEventListener('keypress',function(event){
                if((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)){
                    $scope.setNewComment(event.target.value);
                }
                else {
                    return
                }
            });

            if($scope.viewVideo){
                $scope.getVideo();
                $scope.getSuggestedVideos();
                $scope.getComments();
            }
            else{
                $state.go('home');
            }
        };
        $scope.init();
    }]);
