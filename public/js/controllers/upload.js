'use strict';

tubeApp
    .controller("UploadController", ['$rootScope', '$scope', 'validatorService','socket', function($rootScope, $scope, validatorService, socket) {

        $scope.selectedFiles = [];
        $scope.invalidFile = false;
        $scope.FReader;
        $scope.fileName;
        $scope.file;
        var Path = "http://localhost:8080/";

        socket.on('MoreData', function (data){
            $scope.UpdateBar(data['Percent']);
            console.log("!!!!!! called...");
            var Place = data['Place'] * 524288; //The Next Blocks Starting Position
            var NewFile; //The Variable that will hold the new Block of Data
            NewFile = $scope.file.slice(Place, Place + Math.min(524288, ($scope.file.size-Place)));
            $scope.FReader.readAsBinaryString(NewFile);
        });

        socket.on('Done', function (data){
            var Content = "Video Successfully Uploaded !!"
            Content += "<img id='Thumb' src='" + Path + data['Image'] + "' alt='" + $scope.fileName + "'><br>";
            Content += "<button  type='button' name='Upload' value='' id='Restart' class='Button'>Upload Another</button>";
            document.getElementById('UploadArea').innerHTML = Content;
            document.getElementById('Restart').addEventListener('click', $scope.refreshPage);
        });

//        $scope.$on('$destroy', function (event) {
//            socket.removeAllListeners();
//        });

        $scope.getFile = function($event){
            $event.preventDefault();
            if($scope.selectedFiles.length === 0){
                $('#file').click();
                $('#file').change(function(event){
                    $scope.file = this.files[0];
                    $scope.fileName = this.files[0].name;
                    if($scope.fileName && validatorService.isVideo($scope.fileName)){
                        $scope.invalidFile = false;
                        $scope.$apply($scope.selectedFiles.push($scope.fileName));
                        $scope.startUpload();
                    }
                    else{
                        $scope.$apply($scope.invalidFile = true);
                    }
                });
            }
        };

        $scope.UpdateBar = function(percent) {
            document.getElementById('ProgressBar').style.width = percent + '%';
            document.getElementById('percent').innerHTML = (Math.round(percent*100)/100) + '%';
            var MBDone = Math.round(((percent/100.0) * $scope.file.size) / 1048576);
            document.getElementById('MB').innerHTML = MBDone;
        };

        $scope.startUpload = function(){
            $scope.FReader = new FileReader();
            var Content = "<span id='NameArea'>Uploading " + $scope.file.name + " as " + $scope.fileName + "</span>";
            Content += '<div id="ProgressContainer"><div id="ProgressBar"></div></div><span id="percent">0%</span>';
            Content += "<span id='Uploaded'> - <span id='MB'>0</span>/" + Math.round($scope.file.size / 1048576) + "MB</span>";
            document.getElementById('UploadArea').innerHTML = Content;

            $scope.FReader.onload = function(event){
                socket.emit('Upload', { 'Name' : $scope.fileName, Data : event.target.result });
            }
            socket.emit('Start', { 'Name' : $scope.fileName, 'Size' : $scope.file.size });
        };

        $scope.refreshPage = function(){
            location.reload(true);
        }

        $scope.init = function(){

        }
        $scope.init();
    }]);
