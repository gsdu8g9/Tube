'use strict';

tubeApp
    .controller("profilePlaybackController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', function($rootScope, $scope, $state, $stateParams, videoService) {

        $scope.init = function(){
            console.log("This is working....!!!!!!");
        };
        $scope.init();
    }]);