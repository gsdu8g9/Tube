'use strict';

tubeApp
    .controller("WatchController", ['$rootScope', '$scope', '$state', '$stateParams', function($rootScope, $scope, $state, $stateParams) {
        $scope.home = {};
        $scope.home.title = "HipKid";

        $scope.viewVideo = $stateParams.vid;
        $scope.activeVid = null;

        $scope.vidList= [
            {
                id:'abcd',
                name:'Thors Hammer',
                owner:'Shane White',
                views:'5,000'
            },
            {
                id:'efgh',
                name:'Godzilla',
                owner:'John Neimo',
                views:'6,000'
            },
            {
                id:'ijkl',
                name:'Spider-Man',
                owner:'Tom Anderson',
                views:'7,000'
            },
            {
                id:'mnop',
                name:'Transformers',
                owner:'Carson Daily',
                views:'8,000'
            },
            {
                id:'qrst',
                name:'Dare Devil',
                owner:'Aron Burr',
                views:'9,000'
            },
            {
                id:'uvwx',
                name:'Captain America',
                owner:'Bill Hendricks',
                views:'10,000'
            }
        ];

        $scope.init = function(){
            if($scope.viewVideo){
                $scope.vidList.forEach(function(item){
                    if(item.id === $scope.viewVideo){
                        $scope.activeVid = item;
                        return;
                    }
                });
            }
            else{
                $state.go('home');
            }
        };
        $scope.init();
    }]);
