/**
 * Created by vsubramaney on 12/22/13.
 */
var Model = require("./PBBase"),
    model = new Model();
var DataPersistenceBridge = model.extend({
    insert: function(data, callback) {
        this.collection().insert(data, {}, callback || function(){ });
    },
    update: function(data, callback) {
        this.collection().update({question: data.question}, data, {}, callback || function(){ });
    },
    getlist: function(callback) {
        this.collection().find().toArray(callback);
    },
    remove: function(question, callback) {
        this.collection().findAndModify({question: question}, [], {}, {remove: true}, callback);
    },
    getQuestion: function(question, callback) {
        this.collection().findOne({question: question}, callback);
    }
});
module.exports = DataPersistenceBridge;
