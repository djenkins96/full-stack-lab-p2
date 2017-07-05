angular.module('blog.factories', [])
//need user category and post factory here
.factory('Post', ['$resource', function($resource){
    return $resource('/api/posts/:id', { id: '@id'},{
        update:{
            method: 'PUT'
        }
    })
}])
.factory('Users', ['$resource', function($resource){
    return $resource('/api/users/:id')
}])
.factory('Categories', ['$resource', function($resource){
    return $resource('/api/Categories/:id')
}]) 