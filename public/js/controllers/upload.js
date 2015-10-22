'use strict';

tubeApp
    .controller("UploadController", ['$rootScope', '$scope', 'validatorService', function($rootScope, $scope, validatorService) {

        $scope.selectedFiles = [];
        $scope.invalidFile = false;

        $scope.getFile = function($event){
            $event.preventDefault();
            if($scope.selectedFiles.length === 0){
                $('#file').click();
                $('#file').change(function(event){
                    var fileName = this.files[0].name;
                    if(fileName && validatorService.isVideo(fileName)){
                        $scope.invalidFile = false;
                        $scope.$apply($scope.selectedFiles.push(fileName));
                    }
                    else{
                        $scope.$apply($scope.invalidFile = true);
                    }
                });
            }
        };
    }]);
