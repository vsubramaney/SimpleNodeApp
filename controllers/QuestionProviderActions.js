/**
 * Created by vsubramaney on 12/23/13.
 */

var dataPersistenceBridge = new (require("../dao/DataPersistenceBridge"));

QuestionProviderAction = function(req){
    dataPersistenceBridge.setDB(req.db);
};

module.exports = {
    name: 'QuestionProviderAction',

    /*
    * method to remove a question from DB
    * */
    remove : function(req, callback) {
    var question = req.param('question');
    console.log("removing question "+question);
    dataPersistenceBridge.remove(question, callback);
    },

    /*
     * method to get list of questions persisted in DB
     * */
    list : function(callback) {
        dataPersistenceBridge.getlist(function(err, records) {
            if( err ) {
                callback(err);
            }
            else {
                callback(null, records);
            }
        })
    },

    /*
     * method to persist a question in DB
     * */
    save : function(req, callback) {
        var data = {
            question: req.param('question'),
            values: req.param('values'),
            answers: req.param('answers')
        }
        console.log("Inserting data - question :{"+data.question+ " } " +
            "values :{ "+data.values+" } " +
            "answers :{" +data.answers+" }");

        dataPersistenceBridge.insert(data, callback);
    },

    /*
     * method to update a question in DB
     * */
    update : function(req, callback) {
        var data = {
            question: req.param('question'),
            values: req.param('values'),
            answers: req.param('answers')
        }
        console.log("Vinod data -"+data.question+data.values+data.answers);
        dataPersistenceBridge.update(data, function(err) {
            res.redirect('/');
        })
    }
}


