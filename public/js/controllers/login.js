'use strict';

tubeApp
    .controller("LoginController", ['$rootScope', '$scope', '$state', 'authService', 'sessionService', 'validatorService', function($rootScope, $scope, $state, authService, sessionService, validatorService) {

        $scope.user = {
            username:undefined,
            password:undefined,
            errorMessage:"Login attempt failed, please try again."
        };
        $scope.isError = false;

        $scope.validateCredentials = function(){
            if($scope.user.username && $scope.user.password) {
                if(validatorService.isAlphaNumeric($scope.user.username) && validatorService.isAlphaNumeric($scope.user.password)){
                    console.log("Its good!!!");
                    return true;
                }
                else {
                    console.log("Its all Bad!!!");
                    return false;
                }
            }
            else {
                console.log("Its all Bad!!!");
                return false;
            }
        };

        $scope.login = function(){
            if($scope.validateCredentials()) {
                $scope.isError = false;
                //make login call
                authService.login($scope.user.username, $scope.user.password)
                    .then(function(user){
                        sessionService.setUserData(user);
                        $state.go('home');
                    }, function(error){
                        $scope.isError = true;
                        $scope.user.errorMessage = error.message;
                    });
            }
            else {
                //throw error
                $scope.isError = true;
            }
        };
    }]);