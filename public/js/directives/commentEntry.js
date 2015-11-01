'use strict';

tubeApp
    .directive("commentEntry", ['$rootScope', 'videoService', function($rootScope, videoService) {
        return{
            restrict:'A',
            transclude: true,
            scope: {
                comment:'=comment'
            },
            templateUrl:'/views/templates/commentEntry.html',
            compile:function (scope, element, attrs){


            },
            link:function (scope, element, attrs){

                scope.showReply = false;

                scope.togglelikeComment = function(){

                };

                scope.displayReply = function(){
                    console.log("Clicked...");
                    scope.showReply = true;
                };

                scope.cancelReply = function(){
                    scope.showReply = false;
                };

                scope.toggleDislikeComment = function(){

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
