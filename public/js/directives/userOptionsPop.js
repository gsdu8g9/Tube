'use strict';

tubeApp
    .directive("userOptionsPopDirective", ['$state', '$compile', 'authService', function($state, $compile, authService) {
        return{
            restrict:'A',
            transclude: true,
            scope: {
            },
            template:'<a ng-transclude></a>',
            link:function (scope,element, attrs){
                scope.title = attrs.popoverTitle;
                scope.content = "";
                scope.content += "<div class='user-options-pop'>" +
                                        "<div class='user-content'>" +
                                        "</div>" +
                                        "<footer class='popover-footer'>" +
                                            "<a class='btn btn-primary' ng-click='goToProfile()'>MyProfile</a>" +
                                            "<a class='btn btn-default' ng-click='logOut()'>Log Out</a>" +
                                        "</footer>" +
                                 "</div>";

                scope.goToProfile = function(){
                        $state.go('myprofile');
                };

                scope.logOut = function(){
                    authService.logOut();
                    $state.go('home');
                };

                element.popover({
                    trigger:'click',
                    html:true,
                    content: $compile(scope.content)(scope),
                    placement:'bottom'
                });
            }
        };
    }]);
