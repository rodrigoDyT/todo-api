var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var port           = process.env.PORT || 8080;
var database       = require('./config/database');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var config = require('./config/config');

// Configure express
// Credits to http://blog.wercker.com/2013/06/21/Getting-started-with-Node-Mongoose-MongoDB-Part2.html
mongoose.connect(process.env.NODE_ENV == 'production' ?
	database.url_production : database.url_test );

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

require('./app/routes')(app);

app.listen(port);
console.log("App listening on port " + port);
module.exports = app;
