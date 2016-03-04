'use strict';

tubeApp
    .controller("MyProfileController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', function($rootScope, $scope, $state, $stateParams, videoService) {


        $scope.goTo = function(event, state){
            Array.prototype.forEach.call(document.querySelectorAll('.side-list li'), function(item){
                item.classList.remove('selected');
            });

            if(event){
                event.preventDefault();
                event.target.parentNode.classList.add('selected');
            }
            else {
                document.querySelector('.side-list li:first-child').classList.add('selected');
            }
            $state.go(state);
        };

        $scope.init = function(){
            $scope.goTo(null ,'myprofile.overview');
        };
        $scope.init();
    }]);