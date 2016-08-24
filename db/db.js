/**
 * Created by asisel01 on 8/24/2016.
 */
"use strict";
const  r = require('rethinkdb');

let connection = null;

class db {

    static connect () {

        r.connect({
            host: 'ec2-52-91-107-30.compute-1.amazonaws.com',
            port: 28015,
            user: 'admin',
            password: 'etpproject'
            //host: 'localhost',
        }, function (err, conn) {
            if (err) throw err;
            connection = conn;
            console.log("connect")
        });

    }

    static pullClusters(req, res) {
        r.table('cluster').run(connection, function(err, cursor) {
            if (err) throw err;
            cursor.toArray(function(err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
                res.json(result);
            });
        });
    }
}

module.exports = db;