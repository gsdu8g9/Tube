'use strict';

tubeApp
    .service("validatorService", function(){

        // Accepted file extensions for uploading
        var validFileExtensions = [ 'mov', 'mpeg4', 'mp4', 'avi', 'wmv', 'mpegps', 'flv', '3gpp', 'webm'];

        this.isGreaterThan = function(numberOne, numberTwo){
            return true;
        };

        this.isPhoneNumber = function(number){
            return true;
        };

        this.isEmail = function(email){
            return true;
        };

        this.isVideo = function(video){
            return  true;
        };

        this.isAlphaNumeric = function(subject){
            var  regex = /^[a-zA-Z0-9]*$/g;
            return regex.test(subject);
        };

//        return validatorService;
    });