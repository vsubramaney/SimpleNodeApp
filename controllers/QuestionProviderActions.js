/**
 * Created by vsubramaney on 12/23/13.
 */

var dataPersistenceBridge = new (require("../dao/DataPersistenceBridge"));

QuestionProviderActions = function(req){
    dataPersistenceBridge.setDB(req.db);
};



/*
* method to remove a question from DB
* */
QuestionProviderActions.prototype.remove = function(req, callback) {
    var question = req.param('question');
    console.log("removing question "+question);
    dataPersistenceBridge.remove(question, callback);
};

/*
 * method to get list of questions persisted in DB
 * */
QuestionProviderActions.prototype.list= function(callback) {
        dataPersistenceBridge.getlist(function(err, records) {
            if( err ) {
                callback(err);
            }
            else {
                callback(null, records);
            }
        })
};

/*
 * method to persist a question in DB
 * */
QuestionProviderActions.prototype.save= function(data, callback) {
        console.log(data);
        console.log("Inserting data - question :{"+data.question+ " } " +
            "answers :{" +data.answers+" }");

        dataPersistenceBridge.insert(data, callback);
};

/*
 * method to update a question in DB
 * */
QuestionProviderActions.prototype.update= function(req, callback) {
        var data = {
            question: req.param('question'),
            answers: req.param('answers')
        }
        console.log("data -"+data.question+data.answers);
        dataPersistenceBridge.update(data, function(err) {
            res.redirect('/');
        })
};

exports.QuestionProviderActions = QuestionProviderActions;


