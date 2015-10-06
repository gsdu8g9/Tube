'use strict';

tubeApp
    .controller("MastheadController", ['$rootScope', '$scope', function($rootScope, $scope) {
        $scope.home = {};
        $scope.home.title = "HipKid";
        $scope.navTemplateUrl = '/views/masthead.html';
    }]);