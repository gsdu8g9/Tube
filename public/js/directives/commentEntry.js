'use strict';

tubeApp
    .directive("commentEntry", ['$rootScope', 'videoService', 'sessionService', function($rootScope, videoService, sessionService) {
        return{
            restrict:'A',
//            transclude: true,
            scope: {
                comment:'=comment'
            },
            templateUrl:'/views/templates/commentEntry.html',
            link:function (scope, element, attrs){

                scope.showReply = false;
                scope.userAvatar = sessionService.get('avatar') || "/img/Avatar_Blank.jpg";

                scope.togglelikeComment = function($event){
                    $event.preventDefault();
                    var el = $event.target;
                    (el.classList.contains('selected'))?
                        scope._unsetLikeComment(el):
                        scope._setLikeComment(el);
                };

                scope._unsetLikeComment = function(el){
                    el.classList.remove('selected');
                    var data = {
                        user: sessionService.get('username'),
                        comment: el.dataset.cid,
                        value: false
                    };
                    console.log("deselect", data);
//                    videoService.likeComment(data)
//                        .then(function(response){
//
//                        });
                };

                scope._setLikeComment = function(el){
                    el.classList.add('selected');
                    var data = {
                        user: sessionService.get('username'),
                        comment: el.dataset.cid,
                        value: true
                    };
                    console.log("select", data);
//                    videoService.likeComment(data)
//                        .then(function(response){
//
//                        });
                };

                scope.toggleDislikeComment = function($event){
                    $event.preventDefault();
                    var el = $event.target;
                    (el.classList.contains('selected'))?
                        scope._unsetDislikeComment(el):
                        scope._setDislikeComment(el);
                };

                scope._unsetDislikeComment = function(el){
                    el.classList.remove('selected');
                    var data = {
                        user: sessionService.get('username'),
                        comment: el.dataset.cid,
                        value: false
                    };
                    console.log("deselect", data);
//                    videoService.disLikeComment(data)
//                        .then(function(response){
//
//                        });
                };

                scope._setDislikeComment = function(el){
                    el.classList.add('selected');
                    var data = {
                        user: sessionService.get('username'),
                        comment: el.dataset.cid,
                        value: true
                    };
                    console.log("select", data);
//                    videoService.disLikeComment(data)
//                        .then(function(response){
//
//                        });
                };

                scope.displayReply = function(event){
                    event.preventDefault();
                    console.log("Clicked...");
                    scope.showReply = true;
                };

                scope.cancelReply = function(){
                    scope.showReply = false;
                };

                scope.getSubComments = function(){
                    videoService.getComments($scope.viewVideo)
                        .then(function(response){
                            $scope.activeVidComments = response;
                        });
                };
            }
        };
    }]);
