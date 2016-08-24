/**
 * Created by asisel01 on 8/24/2016.
 */
'use strict';
module.exports = function middleware(app) {
    // Add headers
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        let allowedOrigins = ['http://localhost:63342', 'http://localhost:9000', 'http://127.0.0.1:63343'];
        let origin = req.headers.origin;
        if(allowedOrigins.indexOf(origin) > -1){
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });
};

