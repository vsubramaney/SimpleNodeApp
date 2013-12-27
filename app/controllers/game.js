/**
 * Created by vsubramaney on 12/26/13.
 */

exports.game = function (req, res) {
    res.render('main/game', {
        title: 'Game',
        message: req.flash('error')
    })
}