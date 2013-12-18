
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var questionsProvider = require('./public/javascripts/QuestionsProvider').QuestionsProvider;

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
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

var questionsProvider= new QuestionsProvider('localhost', 27017);

//Routes

app.get('/', function(req, res){
    questionsProvider.findAll(function(error, qtns){
        res.render('index', {
            title: 'Questions',
            questions:qtns
        });
    });
});

app.get('/questions/new', function(req, res) {
    res.render('question_new', {
        title: 'New Question'
    });
});

//save new question
app.post('/questions/new', function(req, res){
    questionsProvider.save({
        question: req.param('question'),
        values: req.param('values'),
        answers: req.param('answers')
    }, function( error, docs) {
        res.redirect('/')
    });
});

app.get('/questions/remove', function(req, res) {
    res.render('question_remove', {
        title: 'Question to be removed'
    });
});

//remove a question
app.post('/questions/remove', function(req,res){
    questionsProvider.remove({
        question: req.param('question')
    }, function(error, docs){
        console.log("err"+error);
        console.log("doc"+docs);
        console.log("res"+res);
        res.redirect('/')
    });

});


//remove all question
app.post('/questions/removeAll', function(req,res){
    questionsProvider.removeAll(function(error, docs){
        console.log("err"+error);
        console.log("doc"+doc);
        console.log("res"+res);
        res.redirect('/')
    });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
