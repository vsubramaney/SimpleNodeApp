/**
 * Created by vsubramaney on 12/26/13.
 */


exports.home = function (req, res) {
    res.render('main/home', {
        title: 'home',
        message: req.flash('error')
    })
}