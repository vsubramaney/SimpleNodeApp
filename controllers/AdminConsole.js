/**
 * Created by vsubramaney on 12/22/13.
 */


var BaseController = require("./Base"),
    questionProviderAction = require("./QuestionProviderActions");

    module.exports = BaseController.extend({
        username: "admin",
        password: "admin",
        run: function(req, res, next) {
            console.log(req.url);
            questionProviderAction = new QuestionProviderActions(req);
            var self = this;
            if(this.authorize(req)) {
                console.log("authorized!");
                req.session.authenticated = true;
                req.session.save();
                self.returnTheForm(req, res);
            } else {
                res.render('admin_login');
                return;
            }
        },

        authorize: function(req) {
            return (
                req.session &&
                    req.session.authenticated &&
                    req.session.authenticated === true
                ) || (
                req.body &&
                    req.body.username === this.username &&
                    req.body.password === this.password
                );
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
            else if (req.body && req.body.remove && req.body.remove == "yes") {
                questionProviderAction.remove(req,function(){
                    console.log("record removed!");
                });
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
