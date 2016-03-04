'use strict';

tubeApp
    .controller("UserHomeController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', function($rootScope, $scope, $state, $stateParams, videoService) {

        $scope.user = $stateParams.username;

        $scope.init = function(){
            console.log("going in" + $scope.user);
            if($scope.user){
                console.log("This is the user: " + $scope.user);
            }
            else{
                $state.go('home');
            }
        };
        $scope.init();
    }]);