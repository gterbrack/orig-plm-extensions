const express       = require('express');
const axios         = require('axios');
const router        = express.Router();



/* ------------------------------------------------------------------------------
    DEFAULT LANDING PAGE
   ------------------------------------------------------------------------------ */
router.get('/', function(req, res, next) {
    res.render('framework/landing', {
        title : 'PLM TS User Experiences',
        theme : (typeof req.query.theme === 'undefined') ? '' : req.query.theme
    });
});



/* ------------------------------------------------------------------------------
    STANDARD APPLICATIONS
    router.get('/<endpoint>', function(req, res, next) { launch('<pug filename in /views>', '<page title>', req, res, next); });
   ------------------------------------------------------------------------------ */
router.get('/classes'       , function(req, res, next) { launch('apps/classes'         , 'Classification Browser'       , req, res, next); });
router.get('/client'        , function(req, res, next) { launch('apps/client'          , 'Mobile PLM Client'            , req, res, next); });
router.get('/dashboard'     , function(req, res, next) { launch('apps/dashboard'       , 'Dashboard'                    , req, res, next); });
router.get('/explorer'      , function(req, res, next) { launch('apps/explorer'        , 'Product Data Explorer'        , req, res, next); });
router.get('/impactanalysis', function(req, res, next) { launch('apps/impactanalysis'  , 'Change Impact Analysis'       , req, res, next); });
router.get('/insights'      , function(req, res, next) { launch('apps/insights'        , 'Tenant Insights Dashboard'    , req, res, next); });
router.get('/mbom'          , function(req, res, next) { launch('apps/mbom'            , 'Manufacturing BOM Editor'     , req, res, next); });
router.get('/navigator'     , function(req, res, next) { launch('apps/navigator'       , 'Workspace Navigator'          , req, res, next); });
router.get('/portfolio'     , function(req, res, next) { launch('apps/portfolio'       , 'Product Portfolio Catalog'    , req, res, next); });
router.get('/projects'      , function(req, res, next) { launch('apps/projects'        , 'Projects Dashboard'           , req, res, next); });
router.get('/reports'       , function(req, res, next) { launch('apps/reports'         , 'Reports Dashboard'            , req, res, next); });
router.get('/reviews'       , function(req, res, next) { launch('apps/reviews'         , 'Design Reviews'               , req, res, next); });
router.get('/service'       , function(req, res, next) { launch('apps/service'         , 'Services Portal'              , req, res, next); });
router.get('/variants'      , function(req, res, next) { launch('apps/variants'        , 'Variant Manager'              , req, res, next); });



/* ------------------------------------------------------------------------------
    APPLICATIONS IN DEVELOPMENT
   ------------------------------------------------------------------------------ */
router.get('/configurator'  , function(req, res, next) { launch('dev/configurator'    , 'Product Configuration Editor', req, res, next); });
router.get('/control'       , function(req, res, next) { launch('dev/control'         , 'Remote Device Control'       , req, res, next); });
router.get('/customer'      , function(req, res, next) { launch('dev/customer'        , 'Customer Services'           , req, res, next); });
router.get('/editor'        , function(req, res, next) { launch('dev/editor'          , 'Content Editor'              , req, res, next); });
router.get('/matrix'        , function(req, res, next) { launch('dev/matrix'          , 'Portfolio Matrix'            , req, res, next); });



/* ------------------------------------------------------------------------------
    TUTORIAL APPLICATIONS
   ------------------------------------------------------------------------------ */
router.get('/template'      , function(req, res, next) { launch('tutorial/template'   , 'App Template Page'           , req, res, next); });



/* ------------------------------------------------------------------------------
    INVENTOR ADDINS
   ------------------------------------------------------------------------------ */
router.get('/addins/change'  , function(req, res, next) { launch('addins/change'  , 'Change Management'               , req, res, next); });
router.get('/addins/context' , function(req, res, next) { launch('addins/context' , 'Context Browser'                 , req, res, next); });
router.get('/addins/item'    , function(req, res, next) { launch('addins/item'    , 'Item & BOM Management'           , req, res, next); });
router.get('/addins/search'  , function(req, res, next) { launch('addins/search'  , 'Search'                          , req, res, next); });
router.get('/addins/products', function(req, res, next) { launch('addins/products', 'Product Configuration Management', req, res, next); });



/* ------------------------------------------------------------------------------
    LAUNCH APPLICATION
   ------------------------------------------------------------------------------ */
function launch(view, title, req, res, next) {

    let redirect = false;
    let refresh  = false;
    let now      = new Date().getTime();

    if(req.session.hasOwnProperty('headers')) {
        if(req.session.headers.hasOwnProperty('expires')) {
            let expires = new Date(req.session.headers.expires).getTime();
            if(expires > now) {
                refresh = true;
            } else {
                redirect = true;
            }
        } else {
            redirect = true;
        }
    } else {
        redirect = true;
    }

    if(redirect) {

        res.render('framework/redirect', { 
            title       : title,
            clientId    : req.app.locals.clientId,
            redirectUri : req.app.locals.redirectUri,
            appUrl      : encodeURIComponent(req.url)
        });

    } else {

        console.log(' ');
        console.log('  Launch Application START');
        console.log(' --------------------------------------------');
        
        let reqWS           = ''
        let reqDMS          = '';
        let reqPartNumber   = '';
        let reqRevisionBias = 'release';
        let reqTheme        = '';
        let reqOptions      = req.query.hasOwnProperty('options') ? req.query.options : '';
    
        for(key in req.query) {
            switch(key.toLowerCase()) {
                case 'wsid'         :           reqWS = req.query[key]; break;
                case 'dmsid'        :          reqDMS = req.query[key]; break;
                case 'partnumber'   :   reqPartNumber = req.query[key]; break;
                case 'revisionbias' : reqRevisionBias = req.query[key]; break;
                case 'theme'        :        reqTheme = req.query[key]; break;
            }
        }

        req.session.tenant = req.query.hasOwnProperty('tenant') ? req.query.tenant : req.app.locals.tenant;
    
        console.log('  view         = ' + view); 
        console.log('  title        = ' + title); 
        console.log('  tenant       = ' + req.session.tenant); 
        console.log('  wsId         = ' + reqWS); 
        console.log('  dmsId        = ' + reqDMS); 
        console.log('  partNumber   = ' + reqPartNumber); 
        console.log('  options      = ' + reqOptions); 
        console.log('  revisionBias = ' + reqRevisionBias); 
        console.log('  theme        = ' + reqTheme); 
        console.log();
        
        if(reqPartNumber !== '') {

            res.render('framework/search', {
                partNumber   : reqPartNumber,
                revisionBias : reqRevisionBias,
                theme        : reqTheme
            });

        } else {

            res.render(view, { 
                title        : title, 
                tenant       : req.session.tenant,
                wsId         : reqWS,
                dmsId        : reqDMS,
                revisionBias : reqRevisionBias,
                theme        : reqTheme,
                options      : reqOptions,
                config       : req.app.locals.config
            });    
            
        }

    }

}



/* ------------------------------------------------------------------------------
    CALLBACK & APS LOGIN
   ------------------------------------------------------------------------------ */
router.get('/callback', function(req, res, next) {
    
    console.log();
    console.log('  /callback START');
    console.log(' --------------------------------------------');
    console.log('  Target URL = ' + req.query.state);

    getToken(req, req.query.code, function() {
        res.redirect(req.query.state);
    });
        
});
function getToken(req, code, callback) {
    
    let data = {
        'code'          : code,
        'grant_type'    : 'authorization_code',
        'redirect_uri'  : req.app.locals.redirectUri
    }

    axios.post('https://developer.api.autodesk.com/authentication/v2/token', data, {
        headers : {
            'accept'        : 'application/json',
            'authorization' : 'Basic ' + btoa(req.app.locals.clientId + ':' + req.app.locals.clientSecret),
            'content-type'  : 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {

        if (response.status == 200) {               
            
            console.log();
            console.log('  Login to Autodesk Platform Services (APS) successful');
            console.log();

            let expiration = new Date();
                expiration.setSeconds(expiration.getSeconds() + (response.data.expires_in - 90));

            req.session.headers = {
                'Content-Type'  : 'application/json',
                'Accept'        : 'application/json',
                'X-Tenant'      : req.app.locals.tenant,
                'token'         : response.data.access_token,
                'Authorization' : 'Bearer ' + response.data.access_token,
                'expires'       : expiration,
                'refresh_token' : response.data.refresh_token
            };
            
            callback();

        } else {

            console.log();      
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');      
            console.log('             LOGIN FAILED');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'); 
            console.log(); 
            
            console.log(error);
        }

    }).catch(function (error) {
        console.log(error);
    });
    
}

module.exports = router;