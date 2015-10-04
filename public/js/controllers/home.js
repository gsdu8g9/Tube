'use strict';

tubeApp
.controller("HomeController", ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.home = {};
    $scope.home.title = "HipKid";
}]);
