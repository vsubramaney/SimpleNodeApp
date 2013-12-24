/**
 * Created by vsubramaney on 12/24/13.
 */

var BaseController = require("./Base"),
    questionProviderAction = require("./QuestionProviderActions");
module.exports = BaseController.extend({
    run: function(req, res, next) {
        questionProviderAction = new QuestionProviderActions(req);


        var data = [
                    {"question":"The sum of 5 times y and 15 is 30. Can you write the simple equation to represent the statement?","answers":"5y+15=30"},
                    {"question":"If you subtract 5 from 10 times a number(z), you get 35. Can you write the simple equation to represent the statement?","answers":"10z-5 = 35"},
                    {"question":"One fifth of m is 5 more than 10. Can you write the simple equation to represent the statement?","answers":"m/5-10 = 5"},
                    {"question":"One third of number (n) plus 5 is 12. Can you write the simple equation to represent the statement?","answers":"n/3+5=12"},
                    {"question":"Sam's father's age is 10 years more than 6 times Sam's age. Sam father is 64 years old. Set up an equation to find Sam's age. Let Sam's age is taken as 'a'.","answers":"6a+10=64"},
                    {"question":"A shop next to you have small and large boxes of apples. Each large box contains 4 small boxes and 2 extra apples. Each large box contains 122 apples. Let x be number of apples in small box. Can you write the equation which gives number of apples in a small box. ","answers":"4x+2=122"},
                    {"question":"Say Yes or No, x + 4 - 12 = 0, if x is 8.","answers":"Yes"},
                    {"question":"If you take away 7 from 7 times f, you get 70. Can you write the simple equation to represent the statement?","answers":"7f-7=70"},
                    {"question":"Your mark is twice the marks scored by your friend plus 7. Let e be your friend mark. You scored 81 marks. Can you write the simple equation to represent the statement?","answers":"2e+7=81"},
                    {"question":"Ram says he has 12 balls more than five times the balls Sethu has. Ram conveyed that he has 122 balls. Let 'i' be number of balls Sethu has. Can you write the equation to respresent this statement.","answers":"5i+12=122"},
                    {"question":"Write an equation to represent sum of angles in equilateral triangle. Let x be an angle.","answers":"3x=180"},
                    {"question":"Write an equation to represent sum of angles in an isosceles triangle. The angle made by equal sides with non equal side is 40 degree. Let x be an angle.","answers":"x+80=180, 80+x=180, x+40+40=180"},
                    {"question":"The sum of 5 times y and 15 is 30. What is the value of y?","answers":"3"},
                    {"question":"If you subtract 5 from 10 times a number, you get 35. What is the value of number?","answers":"4"},
                    {"question":"One fifth of m is 5 more than 10. Can you write the simple equation to represent the statement?","answers":"75"},
                    {"question":"One third of number (n) plus 5 is 12. Can you write the simple equation to represent the statement?","answers":"51"},
                    {"question":"Sam's father's age is 10 years more than 6 times Sam's age. Sam father is 64 years old. Set up an equation to find Sam's age. Let Sam's age is taken as 'a'.","answers":"9"},
                    {"question":"A shop next to you have small and large boxes of apples. Each large box contains 4 small boxes and 2 extra apples. Each large box contains 122 apples. Let x be number of apples in small box. Can you write the equation which gives number of apples in a small box. ","answers":"30"},
                    {"question":"What is the value of x + 4 - 12 = 0?","answers":"8"},
                    {"question":"If you take away 7 from 7 times f, you get 70. Can you write the simple equation to represent the statement?","answers":"9"},
                    {"question":"Your mark is twice the marks scored by your friend plus 7. Let e be your friend mark. You scored 42 marks. Can you write the simple equation to represent the statement?","answers":"37"},
                    {"question":"Ram says he has 12 balls more than five times the balls Sethu has. Ram conveyed that he has 122 balls. Let 'i' be number of balls Sethu has. Can you write the equation to respresent this statement.","answers":"25"},
                    {"question":"Write an equation to represent sum of angles in equilateral triangle. Let x be an angle.","answers":"60"},
                    {"question":"Write an equation to represent sum of angles in an isosceles triangle. The angle made by equal sides with non equal side is 40 degree. Let x be an angle.","answers":"100"},
                    {"question":"Solve -5 + 2e -8 = 7","answers":"10"},
                    {"question":"Solve 67-4e = 7","answers":"15"},
                    {"question":"Solve y/3 + 3 = 0","answers":"-9"},
                    {"question":"Solve 3z/2-6 = -6","answers":"0"},
                    {"question":"What is the value of f in 5 = 2f-5?","answers":"0"},
                    {"question":"What is the value of k in 3/k = -3?","answers":"-1"},
                    {"question":"What is the value of p in 56/p - 14 = 14?","answers":"2"},
                    {"question":"Solve 4(4-x)=4","answers":"3"}
                    ];

        for(i=0;i<data.length;i++){
            questionProviderAction.save(data[i], function(){
                console.log(data[i]+" inserted!");
            });
        }


}

});