'use strict';

tubeApp
    .controller("profilePrivacyController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', function($rootScope, $scope, $state, $stateParams, videoService) {

        $scope.init = function(){
            console.log("This is working....!!!!!!");
        };
        $scope.init();
    }]);