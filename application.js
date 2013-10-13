

var express = require('express');
var routes = require('./lib/routes');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());



app.post('/send/', routes.onSend);

app.get('/get/', routes.onGet);

app.get('/delete/', routes.onDelete);


app.listen(7070);

