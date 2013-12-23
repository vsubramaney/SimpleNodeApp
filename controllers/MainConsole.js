/**
 * Created by vsubramaney on 12/23/13.
 */

var BaseController = require("./Base"),
questionProviderAction = require("./QuestionProviderActions"),
questionValidator = require("./QandAValidator")

module.exports = BaseController.extend({

    run: function(req, res, next) {
        questionProviderAction = new QuestionProviderActions(req);
        questionValidator = new QandAValidator(req);
        var self = this;
        self.renderPage(req, res, next);
        return;
    },
    renderPage: function(req, res, next) {

        if(req.query && req.query.render === "game_window"){
            res.render('game_window');
            return;
        }

        if (req.body && req.body.validate && req.body.validate == "yes") {
            var self = this;
            var qtn = req.param('question');
            questionValidator.validate(req,
                function(result){
                console.log("result -"+result);
                    if (result == true) {
                        self.renderProblem("Correct answer..", true, res);
                    } else {
                        self.renderProblem("Sorry! try again", false, res);
                    }
            });
            return;
        }

        if(req.query && req.query.render === "problems_window"){
            this.renderProblem("New Problem", false, res);
            return;
        }

        if(req.query && req.query.render === "video_tutorial_window"){
            res.render('video_tutorial_window');
            return;
        }

        this.renderHome(req, res);
        return;
    },
    renderHome: function(req, res){
            res.render('game_home');
        },
    renderProblem : function (titleValue, shouldGetNewProblem, res){
        var problemNo = 0;
        if (shouldGetNewProblem == true){
            problemNo = this.randomFromInterval(0,3);
            console.log("problemNo - "+problemNo);
        }
        questionProviderAction.list(function(error, qtns){
            console.log("question - "+qtns);
            qtn = qtns[problemNo].question;
            console.log("question - "+qtn);
            res.render('problems_window',{title: titleValue,
                question: qtn});
        });
    },

    randomFromInterval :function(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
    }
});
