var express = require('express'),
    r = require('rethinkdb'),
    app = express(),
    config = require('./config'),
    express = require('express'),
    app = express();


var connection = null;

function connect () {
    r.connect( {
        host: 'ec2-52-91-107-30.compute-1.amazonaws.com',
        port: 28015,
        user: 'admin',
        password: 'etpproject'
        //host: 'localhost',
    }, function(err, conn) {
        if (err) throw err;
        connection = conn;
        console.log("connect")
    });
}


function createTable () {
    r.db('test').tableCreate('cluster').run(connection, function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });
}

function insertTable () {

    r.table('cluster').insert([
        {
            "cluster":2,
            "error[severity,count]":{
                "dwhlog Size > 3G ({ITEM.LASTVALUE1})":[
                    5,
                    36
                ],
                "dwhlog Size > 500M":[
                    3,
                    36
                ],
                "dwhlog Size > 1G":[
                    4,
                    36
                ],
                "eXelator Priority .log file larger than 100M":[
                    2,
                    1
                ],
                "eXelator Priority .log file larger than 250M":[
                    3,
                    1
                ],
                "Priority Synclog Size > 5G":[
                    2,
                    1
                ],
                "Priority Synclog Size > 4G":[
                    1,
                    1
                ]
            },
            "dc":4,
            "severity":5
        },


    ]).run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    })
}


function listenToChange() {
    r.table('cluster').changes().run(connection, function(err, cursor) {
        cursor.each(console.log);
    });
}


function authorsList(req, res) {
    r.table('cluster').run(connection, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
            res.json(result);
        });
    });
}

connect();

app.get('/clusters', function (req, res) {
    //createTable();
    //insertTable();
    //listenToChange();
    authorsList(req, res);
});


app.listen(config.app.port, function () {
    console.log('Example app listening on port ' + config.app.port + '!');
});


