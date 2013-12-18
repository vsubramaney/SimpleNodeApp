/**
 * Created by vsubramaney on 12/17/13.
 */

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

QuestionsProvider = function(host, port) {
    this.db= new Db('node-mongo-question', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
    this.db.open(function(){});
};


QuestionsProvider.prototype.getCollection= function(callback) {
    this.db.collection('questions', function(error, questions_collection) {
        if( error ) callback(error);
        else callback(error, questions_collection);
    });
};

//find all questions
QuestionsProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, questions_collection) {
        if( error ) callback(error)
        else {
            questions_collection.find().toArray(function(error, results) {
                if( error ) callback(error)
                else callback(null, results)
            });
        }
    });
};

//save new question
QuestionsProvider.prototype.save = function(questions, callback) {
    this.getCollection(function(error, questions_collection) {
        if( error ) callback(error)
        else {
            if( typeof(questions.length)=="undefined")
                questions = [questions];

            questions_collection.insert(questions, function() {
                callback(null, questions);
            });
        }
    });
};

//remove all question
QuestionsProvider.prototype.removeAll = function(callback) {
    this.getCollection(function(error, questions_collection) {
        if( error ) callback(error)
        else {
            questions_collection.remove(function(err, removed){
                console.log("removed"+removed);
        });
        }
    });
};

//remove a question
QuestionsProvider.prototype.remove = function(questions, callback) {
    console.log(questions);
    this.getCollection(function(error, questions_collection) {
        if( error ) callback(error)
        else {
            questions_collection.remove({ question : questions.question }, function(err) {
                if (err) {
                    console.log("removed error"+err);
                }
                else {
                    console.log("removed");
                }
                console.log(questions);
                callback(null, questions);
            });
        }
    });
};

exports.QuestionsProvider = QuestionsProvider;
