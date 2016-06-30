'use strict';

tubeApp
    .controller("UserAboutController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', function($rootScope, $scope, $state, $stateParams, videoService) {

        $scope.user = $stateParams.username;

        $scope.init = function(){
            if($scope.user){
            }
            else{
                $state.go('home');
            }
        };
        $scope.init();
    }]);