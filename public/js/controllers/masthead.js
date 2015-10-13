'use strict';

tubeApp
    .controller("MastheadController", ['$rootScope', '$scope', 'authService', 'sessionService', function($rootScope, $scope, authService, sessionService) {
        $scope.home = {};
        $scope.home.title = "HipKid";
        $scope.navTemplateUrl = '/views/masthead.html';


        $scope.isLoggedIn= function(){
            return sessionService.getEmail() !== undefined;
        };

        $scope.logOut = function(){
            authService.logOut();
        };
    }]);