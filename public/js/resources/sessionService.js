'use strict';

tubeApp.service("sessionService", function(){
        return {
            set:function (key, value) {
                return sessionStorage.setItem(key,value);
            },

            get:function(key) {
                return sessionStorage.getItem(key);
            },
            getToken: function(){
                var value = sessionStorage.getItem("token");

                if(value) return value;

                return undefined;
            },
            getEmail:function(){
                var value = sessionStorage.getItem("email");

                if(value) return value;

                return undefined;
            },
            getIsAdmin:function(){
                var value = sessionStorage.getItem("isAdmin");
                if(value) return value == "true";

                return undefined;
            },
            setUserData:function(user){
                sessionStorage.setItem("token", user.token);
                sessionStorage.setItem("username", user.username);

                if(user.isAdmin) {
                    sessionStorage.setItem("isAdmin", "true");
                }
            },
            clear:function(){
                sessionStorage.clear();
            },
            destroy:function (key) {
                // TODO: Destroy session on sever side
                return sessionStorage.removeItem(key);
            }
        };
    });