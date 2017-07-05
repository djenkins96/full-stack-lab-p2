var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var path = require('path')

var clientPath = path.join(__dirname, '../client');
var app = express();
app.use(bodyParser.json());
app.use(express.static(clientPath));

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'bloguser',
    password: 'blogpassword',
    database: 'AngularBlog'
});

app.route('/api/posts')
    .get(function(req, res){
        rows('allPosts')
        .then(function(posts){
            res.send(posts);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(500);
        });
    }).post(function(req, res){
        var newPost = req.body;
        row('newPost', [newPost.title, newPost.userid, newPost.categoryid, newPost.content])
        .then(function(id){
            res.status(201).send(id);
        }).catch(function(err){
            res.sendStatus(500);
        });
    });

app.route('/api/posts/:id')
    .get(function(req,res){
        row('singleBlog', [req.params.id])
        .then(function(blog){
            res.send(blog)
        }).catch(function(err){
            console.log(err);
            res.sendStatus(500);
        });
    }).put(function(req, res){
        empty('updateBlog', [req.params.id, req.body.content, req.body.categoryid])
        .then(function(){
            res.sendStatus(204);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(500);
        });
    }).delete(function(req, res){
        empty('deletePost', [req.params.id])
        .then(function(){
            res.sendStatus(204);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(500);
        }) ;
    });

app.get('/api/users', function (req, res){
    rows('allUsers')
    .then(function(users){
        res.send(users);
    }).catch(function(err){
        console.log(err);
        res.sendStatus(500);
    })
})

app.get('/api/categories', function(req, res){
    rows('allCategories')
    .then(function(categories){
        res.send(categories);
    }).catch(function(err){
        console.log(err);
        res.sendStatus(500);
    })
})
// `/api/posts` get all posts
// `/api/posts/:id` get single post by id
// `/api/users` get list of users
// `/api/categories` get list of all catgories

app.get('*', function (req, res, next) {
    if (isAsset(req.url)) {
        return next();
    } else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
});


app.listen(3000);

function callProcedure(procedureName, args) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            connection.release();
            if (err) {
                reject(err);
            } else {
                var placeholder = '';
                if (args && args.length > 0) {
                    for (var i = 0; i < args.length; i++) {
                        if (i === args.length - 1) {
                            placeholder += '?'
                        } else {
                            placeholder += '?,';
                        }
                    }
                }
                var callString = 'CALL ' + procedureName + '(' + placeholder + ')';
                connection.query(callString, args, function (err, resultsets) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                })
            }
        })
    });
}

function rows(procedureName, args) {
    return callProcedure(procedureName, args)
        .then(function (resultsets) {
            return resultsets[0];
        })
}

function row(procedureName, args) {
    return callProcedure(procedureName, args)
        .then(function (resultsets) {
            return resultsets[0][0]
        })
}

function empty(procedureName, args) {
    return callProcedure(procedureName, args)
        .then(function () {
            return;
        });
}

function isAsset(path) {
    var pieces = path.split('/');
    if (pieces.length === 0) { return false; }
    var last = pieces[pieces.length - 1];
    if (path.indexOf('/api') !== -1 || path.indexOf('/?') !== -1) {
        return true;
    } else if (last.indexOf('.') !== -1) {
        return true;
    } else {
        return false;
    }
}
