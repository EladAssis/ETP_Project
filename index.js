
const express = require('express');
const  r = require('./db/db');
const config = require('./config/config');
const app = express();

require('./middleware')(app);
require('./routes')(app);

app.disable('etag');
app.listen(config.app.port, function () {
    console.log('Example app listening on port ' + config.app.port + '!');
});


r.connect();








