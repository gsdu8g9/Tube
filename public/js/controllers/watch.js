'use strict';

tubeApp
    .controller("WatchController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', 'sessionService', function($rootScope, $scope, $state, $stateParams, videoService, sessionService) {

        $scope.viewVideo = $stateParams.vid;
        $scope.activeVid = null;
        $scope.vidList = null;
        $scope.activeVidComments = null;
        $scope.userAvatar = sessionService.get('avatar') || "/img/Avatar_Blank.jpg";

//        $scope.subcomment = {
//            "username":"JaneDoe",
//            "avatar_url":"/img/test_Bert.jpg",
//            "profile_url":"/JohnDoe",
//            "likes":"104",
//            "dislikes":"57",
//            "comment":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//            "created":"Mon Oct 26 2015 16:20:37 GMT-0700 (PDT)",
//            "updated":"Mon Oct 26 2015 16:20:37 GMT-0700 (PDT)"
//        };

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
