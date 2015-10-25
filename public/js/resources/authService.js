'use strict';

tubeApp.service("authService", ["$http", "$q", "sessionService", function($http, $q, sessionService){

//        var authService = {};

        var transformData = function(obj){
            var str = [];

            for(var p in obj){
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        };

        /** login **/
        this.login = function(username, password){
            var result = $q.defer();
            var data = {
                username: username,
                password: password
            };

            $http.post("/account/login", data, {
                transformRequest: transformData,
                headers:{"Content-Type": "application/x-www-form-urlencoded"}
            }).success(function(response){
                    return result.resolve(response);
            }).error(function(response){
                   return result.reject(response);
            });

            return result.promise;
        };

        /** logout **/
        this.logOut = function(){
            var result = $q.defer();

            $http.post("/account/logout")
                .success(function(response){
                    sessionService.clear();
                    result.resolve(response);
            }).error(function(response){
                    result.reject(response);
            });

            return result.promise;
        };

        this.register = function(name, username, age, email, password, confirmPassword) {
            var result = $q.defer();

            var data = {
                name:name,
                username: username,
                age: age,
                email: email,
                password: password,
                confirm: confirmPassword
            }

            $http.post("/account/register", data, {
                transformRequest: transformData,
                headers:{"Content-Type": "application/x-www-form-urlencoded"}
            }).success(function(response){
                result.resolve(response);
            }).error(function(response){
                result.reject(response);
            });

            return result.promise;
        };

        /** islogged in **/
        this.isAuthenticated = function(){
            console.log("The isAuthenticated code is being called...");
            return sessionService.get('token')? true: false;
        };

        /** **/
        this.checkSession = function(){

        };

//        return authService;
    }]);