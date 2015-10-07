'use strict';

tubeApp
    .controller("LoginController", ['$rootScope', '$scope', function($rootScope, $scope) {
        $scope.home = {};
        $scope.home.title = "HipKid";
    }]);