/**
 * Created by vsubramaney on 12/22/13.
 */


var BaseController = require("./Base"),
    questionProviderAction = require("./QuestionProviderActions");

    module.exports = BaseController.extend({

        run: function(req, res, next) {
            questionProviderAction = new QuestionProviderAction(req);
            var self = this;
            self.returnTheForm(req, res);
        },

        /*
        * returns the form that needs to be rendered
        * */
        returnTheForm : function(req, res) {
            var self = this;
            if (req.body && req.body.save && req.body.save == "yes") {
                questionProviderAction.save(req, function(){
                    console.log("record inserted!");
                });
            }
            if (req.body && req.body.remove && req.body.remove == "yes") {
                questionProviderAction.remove(req,function(){
                    console.log("record removed!");
                });
            }
            if(req.query && req.query.action === "new"){
               res.render('question_new');
            }
            if(req.query && req.query.action === "remove") {
                res.render('question_remove');
            }

            self.renderHome(req, res);

        } ,

        /*
         * method to render home page
         * */
        renderHome : function(req, res){
            var self = this;
            questionProviderAction.list(function(error, qtns){
                res.render('index', {
                    title: 'Questions',
                    questions:qtns
                });
            });
        }
});
