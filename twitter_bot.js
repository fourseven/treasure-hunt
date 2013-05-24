var Twit = require('twit');
var config = require('./config.json');

var twitter = new Twit(config.twitter);

