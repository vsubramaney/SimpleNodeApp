/**
 * Created by vsubramaney on 12/22/13.
 */


var BaseController = require("./Base"),
    questionProviderAction = require("./QuestionProviderActions");

    module.exports = BaseController.extend({

        run: function(req, res, next) {
            console.log(req.url);
            questionProviderAction = new QuestionProviderActions(req);
            var self = this;
            self.returnTheForm(req, res);
        },

        /*
        * returns the form that needs to be rendered
        * */
        returnTheForm: function(req, res) {
            var self = this;
            if (req.body && req.body.save && req.body.save == "yes") {
                questionProviderAction.save(req, function(){
                    console.log("record inserted!");
                });
            }
            else if (req.body && req.body.authenticate && req.body.authenticate == "yes"){
                var username = req.param('username');
                var pwd = req.param('password');
                console.log(username+" "+pwd);
                if (username == "admin" && pwd == "admin") {
                    self.renderHome(req, res);
                    return;
                } else {
                    res.render('admin_login');
                    return;
                }
            }
            else if (req.body && req.body.remove && req.body.remove == "yes") {
                questionProviderAction.remove(req,function(){
                    console.log("record removed!");
                });
            }
            else if(req.query && req.query.action === "login"){
                res.render('admin_login');
                return;
            }
            else if(req.query && req.query.action === "new"){
               res.render('question_new');
                return;
            }
            else if(req.query && req.query.action === "remove") {
                res.render('question_remove');
                return;
            } else {
                self.renderHome(req, res);
                return;
            }

        } ,

        /*
         * method to render home page
         * */
        renderHome: function(req, res){
            var self = this;
            console.log(questionProviderAction);
            questionProviderAction.list(function(error, qtns){
                res.render('admin_home', {
                    title: 'Questions',
                    questions:qtns
                });
            });
        }
});
