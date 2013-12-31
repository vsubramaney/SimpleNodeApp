/**
 * Created by vsubramaney on 12/26/13.
 */

exports.renderVideo = function (req, res) {
    res.render('main/video', {
        title: 'video',
        message: req.flash('error')
    })
}
