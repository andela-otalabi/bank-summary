var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var config = require('./config');

var dbUrl = process.env.ENV === 'test' ? config.testDbUrl : config.dbUrl

mongoose.connect(dbUrl);
mongoose.connection.on('open', function(){
    console.log('connected to ' + dbUrl);
})

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(methodOverride('X-HTTP-Method-Override'));

require('./app/routes')(app);

app.listen(3000, function(err){
    if (err) {
        console.log(err);
    }
    console.log('app server started');
})

module.exports = app;