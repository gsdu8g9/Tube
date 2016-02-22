'use strict';

tubeApp
    .directive("commentEntry", ['$rootScope', '$state','videoService', 'sessionService', function($rootScope, $state, videoService, sessionService) {
        return{
            restrict:'A',
//            transclude: true,
//            require: ['^^WatchController'],
            scope: {
                comment:'=comment'
            },
            templateUrl:'/views/templates/commentEntry.html',
            link:function (scope, element, attrs){

                scope.showReply = false;
                scope.userAvatar = sessionService.get('avatar') || "/img/Avatar_Blank.jpg";
                scope.user = sessionService.get('username');

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
                        user: scope.user,
                        cid: el.dataset.cid,
                        value: false
                    };
                    if(scope.user){
                        videoService.likeComment(data)
                        .then(function(response){
                            console.log("deselect", response);
                            scope.comment.likes = response.likes;
                        });
                    }
                    else {
                        $state.go('login');
                    }
                };

                scope._setLikeComment = function(el){
                    el.classList.add('selected');
                    var data = {
                        user: scope.user,
                        cid: el.dataset.cid,
                        value: true
                    };
                    if(scope.user){
                        videoService.likeComment(data)
                            .then(function(response){
                                console.log("deselect", response);
                                scope.comment.likes = response.likes;
                            });
                    }
                    else {
                        $state.go('login');
                    }
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
                        user: scope.user,
                        cid: el.dataset.cid,
                        value: false
                    };
                    if(scope.user){
                        videoService.disLikeComment(data)
                        .then(function(response){
                                console.log("deselect", response);
                                scope.comment.dislikes = response.dislikes;
                        });
                    }
                    else {
                        $state.go('login');
                    }
                };

                scope._setDislikeComment = function(el){
                    el.classList.add('selected');
                    var data = {
                        user: scope.user,
                        cid: el.dataset.cid,
                        value: true
                    };
                    if(scope.user){
                        videoService.disLikeComment(data)
                        .then(function(response){
                            console.log("deselect", response);
                            scope.comment.dislikes = response.dislikes;
                        });
                    }
                    else {
                        $state.go('login');
                    }
                };

                scope.displayReply = function(event){
                    event.preventDefault();
                    console.log("Clicked...");
                    scope.showReply = true;
                };

                scope.cancelReply = function(event){
                    scope.showReply = false;
                };

                scope.replyPost = function(event){
                    event.preventDefault();
                    var cid = event.target.dataset.cid;
                    var text = $(".reply-text[data-cid='" + cid + "']").val();
                    var data = {
                        user: sessionService.get('username'),
                        parent_comment: cid,
                        comment: text
                    };

                    console.log("This is the stuff: ", data);
//                    scope.showReply = false;
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
