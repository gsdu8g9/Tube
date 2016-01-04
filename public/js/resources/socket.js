'use strict';

tubeApp.factory("socket", ['$rootScope', function($rootScope){
    var socket = io.connect("http://localhost:8080");

    return {
        on: function(eventName, callback){
            socket.on(eventName, function () {
                var args = arguments;
                console.log("This is being called...!!!!!!!!!!!!");
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        off: function(event, callback) {
            if(typeof callback === 'function') {
                socket.removeListener(event, callback);
            }
            else {
                socket.removeAllEventListeners(event);
            }
        },
        emit: function(event, data, callback){
            if(typeof callback === 'function'){
                socket.emit(event, data, function(){
                    var args = arguments;
                    $rootScope.$apply(function(){
                        if(callback){
                            callback.apply(socket, args);
                        }
                    });
                })
            }
            else {
                console.log("This is being called...!!!!!!!!!!!!", event);
                socket.emit(event, data);
            }
        }
    }
}]);