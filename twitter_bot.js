var Twit = require('twit');
var config = require('./config.json');
var logger = require('./logger');

var twitter = new Twit(config.twitter);

stream = twitter.stream('user');

stream.on('tweet', function (tweet) {
  console.log(tweet);
  if (does_tweet_have_geo(tweet)) {
    logger.debug("Tweet from " + tweet.user.screen_name + " had geo info: " + tweet.geo);
  } else {
    create_tweet_for_no_geo(tweet);
  }
});

var does_tweet_have_geo = function (tweet) {
  return !!tweet.geo;
};

var create_tweet_for_no_geo = function (tweet) {
  var user = tweet.user;
  var status = "@" + user.screen_name + ", I really need you to enable geolocation to adventure with me.";
  twitter.post('statuses/update', { status: status, in_reply_to_status_id: tweet.id }, function(err, reply) {
    if (err) {
      logger.error(err);
    }
  });
};
