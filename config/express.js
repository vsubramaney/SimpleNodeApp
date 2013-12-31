/**
 * Created by vsubramaney on 12/25/13.
 */

var express = require('express')
    , mongoStore = require('connect-mongo')(express)
    , flash = require('connect-flash')
    , helpers = require('view-helpers')
    , pkg = require('../package.json')

module.exports = function (app, config, passport) {
    app.set('showStackError', true)
    app.use(express.favicon())
    app.use(express.static(config.root + '/public'))
    app.set('views', config.root + '/app/views')
    app.set('view engine', 'jade')


    app.configure(function () {
        // expose package.json to views
        app.use(function (req, res, next) {
            res.locals.pkg = pkg
            next()
        })

        // cookieParser should be above session
        app.use(express.cookieParser())

        // bodyParser should be above methodOverride
        app.use(express.bodyParser())
        app.use(express.methodOverride())

        // express/mongo session storage
        app.use(express.session({
            secret: 'noobjs',
            store: new mongoStore({
                url: config.db,
                collection : 'sessions'
            })
        }))

        // use passport session
        app.use(passport.initialize())
        app.use(passport.session())

        // connect flash for flash messages - should be declared after sessions
        app.use(flash())

        // should be declared after session and flash
        app.use(helpers(pkg.name))

        app.use(app.router)

    });
}
