'use strict';

tubeApp
.controller("HomeController", ['$rootScope', '$scope', 'videoService', function($rootScope, $scope, videoService) {
    $scope.vidList = null;

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
