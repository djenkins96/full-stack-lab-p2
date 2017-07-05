angular.module('blog.controllers', [])
    .controller('FrontPageController', ['$scope', 'Post', function ($scope, Post) {
        getPosts();

        function getPosts() {
            $scope.posts = Post.query();
        }
        $scope.newPost = function () {
            window.location.assign('/compose');
        }

    }])

    .controller('SingleViewController', ['$scope', 'Post', '$routeParams', '$location', function ($scope, Post, $routeParams, $location) {
        var id = $routeParams.id
        $scope.post = Post.get({ id: id });
        $scope.updateBlog = function () {
            window.location.assign('/posts/' + id + '/update');
        }
        $scope.deleteBlog = function () {
            if (confirm('Are you sure you would like to delete this post?')) {
                $scope.post.$delete(function () {
                    $location.replace().path('/');
                }, function (err) {
                    console.log(err);
                })
            }
        }
    }])
    .controller('ComposeController', ['$scope', 'Users', 'Categories', 'Post', function ($scope, Users, Categories, Post) {
        $scope.users = Users.query();
        $scope.categories = Categories.query();

        $scope.newPost = function () {
            var payload = {
                title: $scope.title,
                userid: $scope.user,
                categoryid: $scope.category,
                content: $scope.content
            };
            var p = new Post(payload);
            p.$save(function (success) {
                    window.history.back();  
            }, function(err){
                console.log(err)
            });
        };
    }])
    .controller('UpdateController', ['$scope', 'Categories', 'Post', '$routeParams', function ($scope, Categories, Post, $routeParams) {
        $scope.categories = Categories.query();
        $scope.post = Post.get({ id: $routeParams.id });

        $scope.updatePost = function () {
            $scope.post.$update(function () {
                window.history.back();
            }, function (err) {
                console.log(err);
            })
        }
    }])