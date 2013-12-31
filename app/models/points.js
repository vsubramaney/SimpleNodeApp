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

PointsSchema.statics = {
    loadByUserId : function (user_id, callback) {
        this.findOne({ user : user_id})
            .exec(callback)
    },
    updatePoint : function (point) {
        console.log("user id"+point.user)
        var self = this;
        self.findOne({'user' : point.user}, function(error,record){
            if(record!=null) {
                self.update({'user' : point.user},
                    {rewardPoint: record.rewardPoint+point.rewardPoint},
                    {},
                    function(err){
                        if (err){
                            console.log("failed to update"+err)
                        } else {
                            console.log("update successfully")
                        }
                    })
            }  else {
                point.save(function(err){
                    if (err){
                        console.log("failed to save"+err)
                    } else {
                        console.log("saved successfully")
                    }
                });
            }
        })
    }
}

mongoose.model('Points', PointsSchema)
