'use strict';

tubeApp
    .controller("UserController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', function($rootScope, $scope, $state, $stateParams, videoService) {

        $scope.user = $stateParams.username;

        $scope.goTo = function(event, state){
            Array.prototype.forEach.call(document.querySelectorAll('.second-head-nav li'), function(item){
                item.classList.remove('selected');
            });

            if(event){
                event.preventDefault();
                event.target.parentNode.classList.add('selected');
            }
            else {
                document.querySelector('.second-head-nav li:first-child').classList.add('selected');
            }
            $state.go(state);
        };

        $scope.init = function(){
            $scope.goTo(null ,'user.home');
        };
        $scope.init();
    }]);