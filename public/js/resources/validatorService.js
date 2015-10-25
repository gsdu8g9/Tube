'use strict';

tubeApp
    .service("validatorService", function(){

        // Accepted file extensions for uploading
        var validFileExtensions = [ 'mov', 'mpeg4', 'mp4', 'avi', 'wmv', 'mpegps', 'flv', '3gpp', 'webm'];

        this.isGreaterThan = function(numberOne, numberTwo){
            return true;
        };

        this.isPhoneNumber = function(number){
            var phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
            return phoneRegex.test(number);
        };

        this.isValidBirthday = function(date){
            var dateReg = /^\d{2}([./-])\d{2}([./-])\d{4}$/;
            var now = new Date();

            // Is an actual date
            if(!(dateReg.test(date))){
                return false;
            }
            else {
                var testValue = new Date(date);
                var diff = (now.getUTCFullYear() - testValue.getUTCFullYear());

                // Not more than 105 years old and not less than 5 years old
                if( diff > 105 || diff < 5){
                    return false;
                }
            }
            return true;
        };

        // Doesn't contain equal sign(=), brackets(<,>), plus sign (+), or period (.)
        // Contains letters (a-zA-Z), numbers (0-9), dashes(-), underscores(_)
        // Contains a minimum of 8 characters
        this.isValidPassword = function(password){
            var passRegex = /^[0-9a-zA-Z_/-]{8,16}$/;
            return passRegex.test(password);
        };

        // Doesn't contain equal sign(=), brackets(<,>), plus sign (+), or period (.)
        // Contains letters (a-z), numbers (0-9), dashes(-), underscores(_)
        // Contains a minimum of 2 characters
        this.isValidUserName = function(username){
            var nameRegex = /^[0-9a-zA-Z_/-]{8,16}$/;
            return nameRegex.test(username);
        };

        // Is valid Email Address
        this.isEmail = function(email){
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        this.isVideo = function(video){
            return  true;
        };

        this.isValidName = function(name){
            var nameRegex = /^[a-zA-Z]{2,20}$/;
            return nameRegex.test(name);
        };

        this.isAlphaNumeric = function(subject){
            var  regex = /^[a-zA-Z0-9]*$/g;
            return regex.test(subject);
        };

//        return validatorService;
    });