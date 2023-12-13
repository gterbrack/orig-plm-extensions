let fileSettings = (process.argv.length > 2) ? './settings/' + process.argv[2] + '.js' : './settings.js';

const fs  = require('fs');

if ((process.argv.length > 2) && (!fs.existsSync('./' + fileSettings))) {

    console.log();
    console.log();
    console.log('  ERROR ! File ' + process.argv[2] + '.js could not be found in folder settings');
    console.log('        ! Since the release of 13. December 2023, alternate settings files');
    console.log('        ! must be stored in folder settings and no longer in the root folder');
    console.log('        ');
    console.log('        Please create file /settings/' + process.argv[2] + '.js');
    console.log('        as copy of the master settings.js file');
    console.log();
    console.log();
    console.log();
  
} else {

    const express     = require('express');
    const session     = require('express-session');
    const path        = require('path');
    const favicon     = require('serve-favicon');
    const morgan      = require('morgan');
    const bodyParser  = require('body-parser');
    const landing     = require('./routes/landing');
    const plm         = require('./routes/plm');
    const services    = require('./routes/services');
    const { fchmodSync } = require('fs');
    const settings    = require(fileSettings);
    const app         = express();


    // READ CONFIGURATION SETTINGS
    app.locals.tenant       = settings.tenant;
    app.locals.clientId     = settings.clientId;
    app.locals.clientSecret = settings.clientSecret;
    app.locals.redirectUri  = settings.redirectUri;
    app.locals.config       = settings.config;
    app.locals.debugMode    = settings.debugMode;


    // VIEW ENGINE SETUP
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');


    // FAVICON & OTHERS
    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(morgan('dev'));
    app.use(session({
        secret: "XASDSEDR",
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
    app.use(express.static(path.join(__dirname, 'public')));


    // ROUTING
    app.use('/', landing);
    app.use('/plm', plm);
    app.use('/services', services);


    // CATCH 404 AND FORWARD TO ERROR HANDLER
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


    // ERROR HANDLER
    app.use(function(err, req, res, next) {

        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('framework/error');

    });

    module.exports = app;

    fchmodSync

}