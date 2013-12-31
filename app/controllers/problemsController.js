/**
 * Created by vsubramaney on 12/26/13.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
    , Problems = mongoose.model('Problems')
    , Points = mongoose.model('Points')
    , utils = require('../../lib/utils')
    , rewardPoints = require('./rewardPointsController')


exports.new_problem = function (req, res) {
    randomNo = randomFromInterval(0,31);
    console.log("random No - "+randomNo);

    Problems.randomProblem(randomNo, function(error, problem){
       var prblm = problem[0];
       return res.render('main/problem',{title: 'problem',
            question: prblm})
    });
}

exports.validate_problem = function (req, res) {

    var userId = req.session.passport.user;

    console.log("userId -"+userId);

    // register the event
    var pointsEvent = new rewardPoints(userId);

    // act upon the event
    pointsEvent.on('updatePoints', function(userId, newPoints){

        // update points for the user
        var point = new Points({
            user : userId,
            rewardPoint : newPoints
        });

        Points.updatePoint(point);

        // emit another event to refresh the score
        pointsEvent.emitRefreshScore(userId);
    });

    var problem_id = req.param('problem_id');
    var answer_entered = req.param('answer');
    Problems.load(problem_id, function(error, problem){
        var correct_answer = false;
        if (error) {
            console.log(error);
        } else {

            console.log(problem.answers);
            console.log(answer_entered);
            if (problem.answers.trim() === answer_entered.trim()) {
                console.log('valid answer!')
                correct_answer = true;
            }
        }

        if (correct_answer) {

            // update points only for logged in user's
            if (typeof(userId) != 'undefined') {
                // emit the event
                pointsEvent.emitUpdatePoints(5);
            } else {
                console.log("Guest user!");
            }

            console.log(problem.answers.trim());
            console.log(answer_entered.trim());

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