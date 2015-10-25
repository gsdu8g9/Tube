'use strict';

tubeApp
    .controller("MastheadController", ['$rootScope', '$scope', 'authService', 'sessionService', function($rootScope, $scope, authService) {
        $scope.home = {};
        $scope.home.title = "HipKid";
//        $scope.navTemplateUrl = '/views/masthead.html';

        $scope.isLoggedIn= function(){
            console.log("This is a Hit...");
            return authService.isAuthenticated();
        };

//        $scope.logOut = function(){
//            authService.logOut();
//        };

        $scope.showUserOptions = function(){

        };

//        $scope.init = function(){
//
//        };
//        $scope.init();
    }]);