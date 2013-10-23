

var express = require('express');
var routes = require('./lib/routes');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());



app.post('/send/', routes.onSend);

app.get('/get/', routes.onGet);

app.post('/delete/', routes.onDelete);


//app.listen(7070);
app.listen(process.env.PORT || 7070, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
