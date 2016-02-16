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
        .state('history.search', {
            url:'/search',
            templateUrl: '/views/historySearch.html',
            controller: 'HistorySearchController'
        })
        .state('history.watch', {
            url:'/watch',
            templateUrl: '/views/historyWatch.html',
            controller: 'HistoryWatchController'
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
        })
        .state('channel',{
            url:'/channel/:chid',
            templateUrl: '/views/channel.html',
            controller:'ChannelController'
        })
        .state('myprofile',{
            url:'/myprofile',
            templateUrl: '/views/myprofile.html',
            controller:'MyProfileController'
        })
        .state('myprofile.overview',{
            url:'/overview',
            templateUrl: '/views/profileOverview.html',
            controller:'profileOverviewController'
        })
        .state('myprofile.privacy',{
            url:'/privacy',
            templateUrl: '/views/profilePrivacy.html',
            controller:'profilePrivacyController'
        })
        .state('myprofile.notification',{
            url:'/notification',
            templateUrl: '/views/profileNotification.html',
            controller:'profileNotificationController'
        })
        .state('myprofile.playback',{
            url:'/playback',
            templateUrl: '/views/profilePlayback.html',
            controller:'profilePlaybackController'
        })
        .state('myprofile.connected',{
            url:'/connected',
            templateUrl: '/views/profileConnected.html',
            controller:'profileConnectedController'
        })
        .state('user',{
            url:'/user/:username',
            templateUrl:'/views/user.html',
            controller: 'UserController'
        })
        .state('user.home',{
            url:'/home',
            templateUrl: '/views/userHome.html',
            controller:'UserHomeController'
        })
        .state('user.video',{
            url:'/video',
            templateUrl: '/views/userVideo.html',
            controller:'UserVideoController'
        })
        .state('user.playlists',{
            url:'/playlists',
            templateUrl: '/views/userPlaylists.html',
            controller:'UserPlaylistsController'
        })
        .state('user.channels',{
            url:'/channels',
            templateUrl: '/views/userChannels.html',
            controller:'UserChannelsController'
        })
        .state('user.discussion',{
            url:'/discussion',
            templateUrl: '/views/userDiscussion.html',
            controller:'UserDiscussionController'
        })
        .state('user.about',{
            url:'/about',
            templateUrl: '/views/userAbout.html',
            controller:'UserAboutController'
        });

}]);