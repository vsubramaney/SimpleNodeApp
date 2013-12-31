var util = require('util');
var EventEmitter = require('events').EventEmitter;

function rewardPointsEvents(userId){
    console.log("inside rewardPointsEvents"+userId);
    this.userId = userId;
}

util.inherits(rewardPointsEvents, EventEmitter);
rewardPointsEvents.prototype.emitUpdatePoints = function(points){
    console.log('About to emit....'+points+this.userId)
    this.emit('updatePoints',this.userId, points);
}

rewardPointsEvents.prototype.emitRefreshScore = function(userId) {
    console.log('About to emit....'+userId);
    this.emit('refreshScore', userId);
}

exports.get_score = function (req, res) {
    var userId = req.session.passport.user;
    var pointsEvent = new rewardPoints(userId);

    var userPoint = 0;
    var shouldLoadPoints = true;
    pointsEvent.on('refreshScore', function(userId){
        Points.loadByUserId(userId, function(error, record){
            if (error) {
                console.log("error -"+error);
            } else {
                userPoint = record.rewardPoint;
                shouldLoadPoints = false;
            }
        })
    });

    if (shouldLoadPoints == true) {
        Points.loadByUserId(userId, function(error, record){
            if (error) {
                console.log("error -"+error);
            } else {
                userPoint = record.rewardPoint;
            }
        })
    }
    //res.
}

module.exports = rewardPointsEvents;

