'use strict';

tubeApp
    .directive("commentEntry", ['$rootScope', '$state','videoService', 'sessionService','$compile', function($rootScope, $state, videoService, sessionService, $compile) {
        return{
            restrict:'A',
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

                scope._setTime = function(time){
                    return moment(time, "YYYYMMDD").fromNow();
                }

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
                        parent_comment: cid,
                        comment: text
                    };
                    videoService.replyToComment(data)
                        .then(function(response){
                            scope.subComments = response;
                            scope.showReply = false;
                        });
                };

                scope.getSubComments = function(event){
                    event.preventDefault();
                    if(scope.subComments === undefined || scope.subComments.length === 0){
                        var data = {
                            cid: event.target.dataset.cid
                        };
                        var el = $(".sub-comment-list[data-cid='" + event.target.dataset.cid + "']");
                        videoService.getSubComments(data)
                            .then(function(response){
                                scope.subComments = response;
                                for(var i = 0; i < scope.subComments.length; i++){
                                    el.append("<li class='sub-vid-comment'>" +
                                                "<div comment-entry comment='" + JSON.stringify(scope.subComments[i]) + "'></div>" +
                                              "</li>");
                                }
                                $compile(el.contents())(scope);
                            });
                    }
                };
            }
        };
    }]);
