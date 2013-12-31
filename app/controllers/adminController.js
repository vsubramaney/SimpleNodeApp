/**
 * Created by vsubramaney on 12/25/13.
 */

/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Problems = mongoose.model('Problems')
    , utils = require('../../lib/utils')


exports.login = function (req, res) {
    res.render('admin/login', {
        title: 'Login',
        message: req.flash('error')
    })
}

exports.add_problem = function (req,res) {
    var problem = new Problems(req.body);
    console.log(problem);
    problem.provider = 'local'
    problem.save(function (err) {
        if (err) {
            return res.render('admin/add_problem', {
                errors: utils.errors(err.errors),
                problem: problem,
                title: 'New Question'
            })
        }
    });
    return res.render('admin/add_problem', {
    });
}

exports.render_add_problem = function (req,res) {
    return res.render('admin/add_problem', {
    });
}

exports.render_remove_problem = function (req,res) {
    return res.render('admin/remove_problem', {
    });
}

exports.render_home = function (req,res) {
    Problems.list('', function(error, problems){
        res.render('admin/home', {
            title: 'Questions',
            questions:problems
        });
    });
}

exports.authenticate = function (req,res) {
    var username = "admin";
    var password = "admin";
    if (req.body.username === username &&
        req.body.password === password) {
        console.log("authorized!");
        req.session.authenticated = true;
        req.session.save();
        Problems.list('', function(error, problems){
            res.render('admin/home', {
                title: 'Questions',
                questions:problems
            });
        });
        return;
    } else {
        console.log("re-render login!");
        res.render('admin/login', {
            title: 'Login',
            message: req.flash('error')
        });
    }
}


exports.remove_problem = function (req,res) {
    var problem = new Problems(req.body);
    console.log(problem.problem_statement);
    Problems.remove({problem_statement :problem.problem_statement}, function(error, result){
        if (error){
        console.log("error"+error);
        } else {
        console.log("record removed!");
        }
    });
    res.render('admin/remove_problem', {
    });
}