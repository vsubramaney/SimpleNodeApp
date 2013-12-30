/**
 * Created by vsubramaney on 12/25/13.
 */

/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')

function getProblemStatement (problem_statement){
    return problem_statement;
}

function getAnswers (answers) {
    return answers;
}

/**
 * Problems Schema
 */

//var ProblemSchema = new Schema({
//    problem_statement : {type : String,default : '', get: getProblemStatement ,trim : false},
//    answers :{type : String, default : '', get: getAnswers, trim : true}
//}, {collection: 'Problems'})

var ProblemSchema = new Schema({
    problem_statement :  String,
    answers : String})

ProblemSchema.path('problem_statement').validate(function (problem_statement) {
    return problem_statement.length > 0
}, 'problem_statement cannot be blank')

ProblemSchema.path('answers').validate(function (answers) {
    return answers.length > 0
}, 'problem_answers cannot be blank')

/**
 * Statics
 */

ProblemSchema.statics = {


    /**
     * Find problem by id
     *
     * @param {ObjectId} id
     * @param {Function} callback
     * @api private
     */

    load: function (id, callback) {
        this.findOne({ _id : id })
            .exec(callback)
    },

    /**
     * List problems
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    list: function (options, cb) {
        var criteria = options.criteria || {}

        this.find(criteria)
            .exec(cb)
    },

    /**
     * randomly pick a problem
     *
     * @param {Function} cb
     * @api private
     */

    randomProblem: function (randomNumber, cb) {
        console.log("inside randomProblem");
        this.find()
            .limit(-1)
            .skip(randomNumber)
            .select('problem_statement')
            .exec(cb)
    }
}

mongoose.model('Problems', ProblemSchema)