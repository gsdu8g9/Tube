var tubeApp = angular.module('tubeApp', ['ui.router'])
.config(['$stateProvider','$urlRouterProvider' ,function($stateProvider,  $urlRouterProvider){
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl: '/views/home.html',
            controller: 'HomeController'
        })
        .state('history', {
            url:'/history',
            templateUrl: '/views/history.html',
            controller: 'HistoryController'
        })
        .state('login', {
            url:'/login' ,
            templateUrl:'/views/login.html' ,
            controller:'LoginController'
        })
        .state('register', {
            url:'/register' ,
            templateUrl:'/views/register.html',
            controller:'RegisterController'
        })
        .state('watch',{
            url:'/watch?vid',
            templateUrl:'/views/watch.html',
            controller:'WatchController'
        })
        .state('upload',{
            url:'/upload',
            templateUrl:'/views/upload.html',
            controller:'UploadController'
        });
}]);