'use strict';

tubeApp
    .controller("MyProfileController", ['$rootScope', '$scope', '$state', '$stateParams', 'videoService', function($rootScope, $scope, $state, $stateParams, videoService) {

//        $scope.viewVideo = $stateParams.vid;
//        $scope.activeVid = null;
//        $scope.vidList = null;

        $scope.init = function(){
//            if($scope.viewVideo){
//                videoService.getVideos()
//                    .then(function(response){
//                        $scope.vidList = response;
//                        $scope.vidList.forEach(function(item){
//                            if(item.id === $scope.viewVideo){
//                                $scope.activeVid = item;
//                                return;
//                            }
//                        });
//                    });
//            }
//            else{
//                $state.go('home');
//            }
        };
        $scope.init();
    }]);