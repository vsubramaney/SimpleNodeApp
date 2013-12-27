/**
 * Created by vsubramaney on 12/26/13.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , crypto = require('crypto')
    , _ = require('underscore')

/**
 * Points Schema
 */

var PointsSchema = new Schema({
    user: {type : Schema.ObjectId, ref : 'User'},
    rewardPoint: { type: Number, default: '' }
})

mongoose.model('Points', PointsSchema)
