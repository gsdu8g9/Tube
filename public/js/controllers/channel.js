'use strict';

tubeApp
    .controller("ChannelController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', function($rootScope, $scope, $state, $stateParams, videoService) {

        $scope.init = function(){
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
        $scope.init();
    }]);