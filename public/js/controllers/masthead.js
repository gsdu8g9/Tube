'use strict';

tubeApp
    .controller("MastheadController", ['$rootScope', '$scope', 'authService', 'sessionService', function($rootScope, $scope, authService) {
        $scope.home = {};
        $scope.home.title = "HipKid";
        $scope.showSideMenu = false;

        $scope.isLoggedIn= function(){
            console.log("This is a Hit...");
            return authService.isAuthenticated();
        };

        $scope.toggleSideMenu = function(){
            $scope.showSideMenu = !$scope.showSideMenu;
        };

        $scope.showUserOptions = function(){

        };

//        $scope.init = function(){
//
//        };
//        $scope.init();
    }]);