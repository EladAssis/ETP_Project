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

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63343');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);



    // Pass to next layer of middleware
    next();
});

app.disable('etag');

app.get('/clusters', function (req, res) {
    //createTable();
    //insertTable();
    //listenToChange();
    authorsList(req, res);
});



app.listen(config.app.port, function () {
    console.log('Example app listening on port ' + config.app.port + '!');
});


