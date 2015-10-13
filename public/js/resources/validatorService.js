'use strict';

tubeApp
    .service("validatorService", function(){

//        var validatorService = {};

        this.isGreaterThan = function(numberOne, numberTwo){
            return true;
        };

        this.isPhoneNumber = function(number){
            return true;
        };

        this.isEmail = function(email){
            return true;
        };

        this.isAlphaNumeric = function(subject){
            var  regex = /^[a-zA-Z0-9]*$/g;
            return regex.test(subject);
        };

//        return validatorService;
    });