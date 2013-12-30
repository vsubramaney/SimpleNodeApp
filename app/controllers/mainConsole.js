/**
 * Created by vsubramaney on 12/26/13.
 */

var points = require('./rewardPoints')

exports.home = function (req, res) {
    //var user = 10;
    //points = new rewardPoints();
   //points.rewardPoints(user);
    res.render('main/home', {
        title: 'home',
        message: req.flash('error')
    })
}