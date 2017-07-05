angular.module('myBlog', ['ngRoute', 'ngResource', 'blog.controllers', 'blog.factories'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'views/frontpage.html',
                controller:'FrontPageController'
            })
            .when ('/posts/:id', {
                templateUrl: 'views/singleview.html',
                controller: 'SingleViewController'
            })
            .when ('/compose', {
                templateUrl: 'views/compose.html',
                controller: 'ComposeController'
            })
            .when (`/posts/:id/update`, {
                templateUrl: 'views/update.html',
                controller: 'UpdateController'
            })
    }]);