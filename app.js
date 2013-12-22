
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config')();
var MongoClient = require('mongodb').MongoClient;
var questionsProvider = require('./controllers/QuestionsProvider');


var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/templates');
    app.set('view engine', 'jade');
    app.set('view options', {layout: false});
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

MongoClient.connect('mongodb://' +
    config.mongo.host + ':' + config.mongo.port +
    '/node-mongo-question', function(err, db) {
        if(err) {
            console.log('Sorry, there is no mongo db server running.');
        }
        else {
            var attachDB = function(req, res, next) {
                req.db = db;
                next();
            };
            app.all('/', attachDB, function(req, res, next) {
                questionsProvider.run(req, res, next);
            });

            app.all('/question*', attachDB, function(req, res, next) {
                questionsProvider.run(req, res, next);
            });

            http.createServer(app).listen(config.port, function() {
                console.log(
                    'Successfully connected to mongodb://' + config.mongo.host + ':' + config.mongo.port,
                    '\nExpress server listening on port ' + config.port
                );
            });
        }
});

