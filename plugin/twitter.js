
const settings = require('electron-settings');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'nFhdFaiXeNzl4b9ytJgAUDsR0',
  consumer_secret: 'omQJjccGUzXwTd5bA1ZgFh205JDwuC4ENX6Eogo32gygL5h9cs',
  access_token_key: '883576864052269057-9704MbPp5RwSAzWeXxtev7eHUFfqQz1',
  access_token_secret: 'vmSWffvm2rhicKBpdLs5GpGjHC6mUXsiFhX9ARSiTHu8M'
/*
  consumer_key: this.getConsumerKey,
  consumer_secret: this.getConsumerSecret,
  access_token_key: this.access_token_key,
  access_token_secret: this.access_token_secret*/
});

function getConsumerKey()
{
    return settings.get('twitter.consumerKey');
}

function setConsumerKey(q)
{
    settings.set('twitter',{consumerKey: q});
}

function getConsumerSecret()
{
    return settings.get('twitter.consumerSecret');
}

function setConsumerSecret(q)
{
    settings.set('twitter',{consumerSecret: q});
}
function getAccessTokenKey()
{
    return settings.get('twitter.accessTokenKey');
}

function setAccessTokenKey(q)
{
    settings.set('twitter',{accessTokenKey: q});
}
function getAccessTokenSecret()
{
    return settings.get('twitter.accessTokenSecret');
}

function setAccessTokenSecret(q)
{
    settings.set('twitter',{accessTokenSecret: q});
}

function getUserTimeLine(q)
{
    var params = {screen_name: q};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        return tweets;
      }
    });
}

function Stream()
{
    var stream = client.stream('statuses/filter', {track: 'javascript'});
    stream.on('data', function(event) {
      console.log(event && event.text);
    });

    stream.on('error', function(error) {
      throw error;
    });

    // You can also get the stream in a callback if you prefer.
    client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
      stream.on('data', function(event) {
        console.log(event && event.text);
      });

      stream.on('error', function(error) {
        throw error;
      });
    });
}
/*Disponibles fuera del fichero*/
exports.getConsumerKey = function(){ return getConsumerKey() };
exports.setConsumerKey =  function(q){setConsumerKey(q)};
exports.getConsumerSecret= function(){return getConsumerSecret()};
exports.setConsumerSecret= function(q){setConsumerSecret(q)};
exports.getConsumerSecret= function(){return getConsumerSecret()};
exports.setConsumerSecret= function(q){setConsumerSecret(q)};
exports.getAccessTokenKey= function(){return getAccessTokenKey()};
exports.setAccessTokenKey= function(q){setAccessTokenKey(q)};
exports.getAccessTokenSecret= function(){return getAccessTokenSecret()};
exports.setAccessTokenSecret= function(q){setAccessTokenSecret(q)};

exports.getUserTimeLine= function(q){return getUserTimeLine(q)};
