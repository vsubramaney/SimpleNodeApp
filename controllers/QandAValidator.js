/**
 * Created by vsubramaney on 12/23/13.
 */

var dataPersistenceBridge = new (require("../dao/DataPersistenceBridge"));

QandAValidator = function(req){
    dataPersistenceBridge.setDB(req.db);
};

QandAValidator.prototype.validate = function(req, callback) {
    var data = {
        question: req.param('question'),
        answer: req.param('answer')
    }
    console.log("question - "+data.question+
    "answer -"+data.answer);
    dataPersistenceBridge.getQuestion(data.question, function(err, record){
       if (err) {
           console.log("error - "+err);
       }  else {
           answer = record.answers;
           console.log("ans entered - "+data.question.answer+
               " ans from DB -"+answer);
           if (data.answer == answer) {
               callback(true);
           } else {
            callback(false);
           }
       }
    });
}

