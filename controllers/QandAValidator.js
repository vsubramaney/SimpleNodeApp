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
           var answers = record.answers;
           console.log("ans entered - "+data.answer+
               " ans from DB -"+answers);
           var result = false;
           for (i=0; i<answers.length; i++)
           {
               if (data.answer.trim === answers[i].trim) {
                   result = true;
                   break;
               } else {
                   result = false;
               }
           }
           callback(result);
       }
    });
}

