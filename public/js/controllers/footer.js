'use strict';

tubeApp
    .controller("FooterController", ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
        $scope.home = {};
        $scope.home.title = "HipKid";

        $scope.goToHistory = function(){
            $state.go('history');
        };
    }]);