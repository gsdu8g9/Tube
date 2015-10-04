var tubeApp = angular.module('tubeApp', ['ui.router'])
.config(['$stateProvider','$urlRouterProvider' ,function($stateProvider,  $urlRouterProvider){
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl: '/views/home.html',
            controller: 'HomeController'
        });
}]);