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


module.exports = rewardPointsEvents;

