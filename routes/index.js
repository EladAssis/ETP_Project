/**
 * Created by asisel01 on 8/24/2016.
 */
'use strict';
const  r = require('../db/db');
module.exports = function routes (app) {

    app.get('/clusters', function (req, res) {
        r.pullClusters(req, res);
    });


};