/**
 * Created by vsubramaney on 12/25/13.
 */

var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/user')
    , admin = require('../app/controllers/admin')
    , auth = require('./middlewares/authorization')
    , problems = require('../app/controllers/problems')
    , mainConsole = require('../app/controllers/mainConsole')
    , game = require('../app/controllers/game')
    , video = require('../app/controllers/video')
//    , test = require('../app/controllers/test')


/**
 * Expose routes
 */

module.exports = function (app, passport) {
    //upload data
//    app.get('/uploadData', test.upload_data)

    // main routes
    app.get('/', mainConsole.home)
    app.get('/game', game.game)
    app.get('/problem', problems.new_problem)

    // user routes
    app.get('/login', users.login)
    app.get('/signup', users.signup)
    app.get('/logout', users.logout)
    app.post('/users', users.create)
    app.post('/users/session',
        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: 'Invalid email or password.'
        }), users.session)

    //admin routes
    app.get('/admin', admin.login)
    app.get('/admin/login', admin.login)
    app.get('/admin/home', admin.render_home)
    app.get('/admin/add_problem', admin.render_add_problem)
    app.post('/admin/add_problem', admin.add_problem)
    app.post('/admin/authenticate', admin.authenticate)
    app.get('/admin/remove_problem', admin.render_remove_problem)
    app.post('/admin/remove_problem', admin.remove_problem)

    // problems routes
    app.get('/problem/new_problem', problems.new_problem)
    app.post('/problem/validate', problems.validate_problem)

    //video routes
    app.get('/video', video.renderVideo)
}