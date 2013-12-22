/**
 * Created by vsubramaney on 12/22/13.
 */


var BaseController = require("./Base"),
    //View = require("../views/"),
    model = new (require("../models/ContentModel"));


    module.exports = BaseController.extend({

        run: function(req, res, next) {
            model.setDB(req.db);
            var self = this;
            self.list(function(error, qtns){
                self.returnTheForm(req, res, qtns);
            });
        },
        remove: function(req, callback) {
            var question = req.param('question');
            console.log("removing question "+question);
            model.remove(question, callback);
        },
        list: function(callback) {
            model.getlist(function(err, records) {
                if( err ) {
                    callback(err);
                }
                else {
                    callback(null, records);
                }
            })
        },
        save: function(req, callback) {
            var data = {
                question: req.param('question'),
                values: req.param('values'),
                answers: req.param('answers')
            }
            console.log("Inserting data - question :{"+data.question+ " } " +
                "values :{ "+data.values+" } " +
                "answers :{" +data.answers+" }");

            model.insert(data, callback);
        },
        update: function(req, callback) {
            var data = {
                question: req.param('question'),
                values: req.param('values'),
                answers: req.param('answers')
            }
            console.log("Vinod data -"+data.question+data.values+data.answers);
            model.insert(data, function(err) {
                res.redirect('/');
            });
        },
        returnTheForm : function(req, res, qtns) {
            var self = this;
            if (req.body && req.body.save && req.body.save == "yes") {
                self.save(req, function(){
                    console.log("record inserted!");
                });

                self.renderHome(req, res);
            } else if (req.body && req.body.remove && req.body.remove == "yes") {
                self.remove(req,function(){
                    console.log("record removed!");
                });
                self.renderHome(req, res);
            }
            else if (req.query && req.query.action === "home"){
                res.render('index', {
                    title: 'Questions',
                    questions:qtns
                });
            }
            else if(req.query && req.query.action === "new"){
               res.render('question_new');
            } else if(req.query && req.query.action === "remove") {
                res.render('question_remove');
            }
            else {
                self.renderHome(req, res);
            }
        } ,
        renderHome : function(req, res){
            var self = this;
            self.list(function(error, qtns){
                res.render('index', {
                    title: 'Questions',
                    questions:qtns
                });
            });
        }
});
