/**
 * Created by vsubramaney on 12/26/13.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
    , Problems = mongoose.model('Problems')
    , utils = require('../../lib/utils')

exports.new_problem = function (req, res) {
    randomNo = randomFromInterval(0,31);
    console.log("random No - "+randomNo);
    Problems.list('',function(error, problems){
        return res.render('main/problem',{title: 'problem',
            question: problems[randomNo]});
    });
}

exports.validate_problem = function (req, res) {
    var problem_id = req.param('problem_id');
    var answer_entered = req.param('answer');
    Problems.load(problem_id, function(error, problem){
        var correct_answer = false;
        if (error) {
            console.log(error);
        } else {
                console.log(problem.answers.trim());
                console.log(answer_entered.trim());
                if (problem.answers.trim() === answer_entered.trim()) {
                    console.log('valid answer!')
                    correct_answer = true;
                }
        }

        if (correct_answer) {
            console.log('render new problem')
            randomNo = randomFromInterval(0,31);
            console.log(randomNo);
            Problems.list('',function(error, problems){
                return res.render('main/problem',{title: 'problem',
                    question: problems[randomNo]});
            });
            return;
        }

        console.log('render same problem')
        return res.render('main/problem',{title: 'problem',
            question: problem});
    })
}

var randomFromInterval  = function(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
}