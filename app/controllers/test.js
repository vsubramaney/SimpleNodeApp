///**
// * Created by vsubramaney on 12/26/13.
// */
//
//var mongoose = require('mongoose')
//    , Problems = mongoose.model('Problems')
//
//exports.upload_data = function (req, res) {
//
//    var data = [
//        {problem_statement :"The sum of 5 times y and 15 is 30. Can you write the simple equation to represent the statement?",answers:"5y+15=30"},
//        {problem_statement:"If you subtract 5 from 10 times a number(z), you get 35. Can you write the simple equation to represent the statement?",answers:"10z-5 = 35"},
//        {problem_statement:"One fifth of m is 5 more than 10. Can you write the simple equation to represent the statement?",answers:"m/5-10 = 5"},
//        {problem_statement:"One third of number (n) plus 5 is 12. Can you write the simple equation to represent the statement?",answers:"n/3+5=12"},
//        {problem_statement:"Sam's father's age is 10 years more than 6 times Sam's age. Sam father is 64 years old. Set up an equation to find Sam's age. Let Sam's age is taken as 'a'.",answers:"6a+10=64"},
//        {problem_statement:"A shop next to you have small and large boxes of apples. Each large box contains 4 small boxes and 2 extra apples. Each large box contains 122 apples. Let x be number of apples in small box. Can you write the equation which gives number of apples in a small box. ",answers:"4x+2=122"},
//        {problem_statement:"Say Yes or No, x + 4 - 12 = 0, if x is 8.",answers:"Yes"},
//        {problem_statement:"If you take away 7 from 7 times f, you get 70. Can you write the simple equation to represent the statement?",answers:"7f-7=70"},
//        {problem_statement:"Your mark is twice the marks scored by your friend plus 7. Let e be your friend mark. You scored 81 marks. Can you write the simple equation to represent the statement?",answers:"2e+7=81"},
//        {problem_statement:"Ram says he has 12 balls more than five times the balls Sethu has. Ram conveyed that he has 122 balls. Let 'i' be number of balls Sethu has. Can you write the equation to respresent this statement.",answers:"5i+12=122"},
//        {problem_statement:"Write an equation to represent sum of angles in equilateral triangle. Let x be an angle.",answers:"3x=180"},
//        {problem_statement:"Write an equation to represent sum of angles in an isosceles triangle. The angle made by equal sides with non equal side is 40 degree. Let x be an angle.",answers:"x+80=180, 80+x=180, x+40+40=180"},
//        {problem_statement:"The sum of 5 times y and 15 is 30. What is the value of y?",answers:"3"},
//        {problem_statement:"If you subtract 5 from 10 times a number, you get 35. What is the value of number?",answers:"4"},
//        {problem_statement:"One fifth of m is 5 more than 10. Can you write the simple equation to represent the statement?",answers:"75"},
//        {problem_statement:"One third of number (n) plus 5 is 12. Can you write the simple equation to represent the statement?",answers:"51"},
//        {problem_statement:"Sam's father's age is 10 years more than 6 times Sam's age. Sam father is 64 years old. Set up an equation to find Sam's age. Let Sam's age is taken as 'a'.",answers:"9"},
//        {problem_statement:"A shop next to you have small and large boxes of apples. Each large box contains 4 small boxes and 2 extra apples. Each large box contains 122 apples. Let x be number of apples in small box. Can you write the equation which gives number of apples in a small box. ",answers:"30"},
//        {problem_statement:"What is the value of x + 4 - 12 = 0?",answers:"8"},
//        {problem_statement:"If you take away 7 from 7 times f, you get 70. Can you write the simple equation to represent the statement?",answers:"9"},
//        {problem_statement:"Your mark is twice the marks scored by your friend plus 7. Let e be your friend mark. You scored 42 marks. Can you write the simple equation to represent the statement?",answers:"37"},
//        {problem_statement:"Ram says he has 12 balls more than five times the balls Sethu has. Ram conveyed that he has 122 balls. Let 'i' be number of balls Sethu has. Can you write the equation to respresent this statement.",answers:"25"},
//        {problem_statement:"Write an equation to represent sum of angles in equilateral triangle. Let x be an angle.",answers:"60"},
//        {problem_statement:"Write an equation to represent sum of angles in an isosceles triangle. The angle made by equal sides with non equal side is 40 degree. Let x be an angle.",answers:"100"},
//        {problem_statement:"Solve -5 + 2e -8 = 7",answers:"10"},
//        {problem_statement:"Solve 67-4e = 7",answers:"15"},
//        {problem_statement:"Solve y/3 + 3 = 0",answers:"-9"},
//        {problem_statement:"Solve 3z/2-6 = -6",answers:"0"},
//        {problem_statement:"What is the value of f in 5 = 2f-5?",answers:"0"},
//        {problem_statement:"What is the value of k in 3/k = -3?",answers:"-1"},
//        {problem_statement:"What is the value of p in 56/p - 14 = 14?",answers:"2"},
//        {problem_statement:"Solve 4(4-x)=4",answers:"3"}
//    ];
//
//    for(i=0;i<data.length;i++){
//        var problem = new Problems(data[i])
//        problem.save(function (err) {
//            if (err) {
//                console.log("err - "+err);
//            } else {
//                console.log("record inserted!")
//            }
//
//        })
//    }
//}