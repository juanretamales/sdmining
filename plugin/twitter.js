
const settings = require('electron-settings');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: this.getConsumerKey,
  consumer_secret: this.getConsumerSecret,
  access_token_key: this.access_token_key,
  access_token_secret: this.access_token_secret
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

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

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
