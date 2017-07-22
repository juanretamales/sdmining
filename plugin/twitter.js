
const settings = require('electron-settings');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'nFhdFaiXeNzl4b9ytJgAUDsR0',
  consumer_secret: 'omQJjccGUzXwTd5bA1ZgFh205JDwuC4ENX6Eogo32gygL5h9cs',
  access_token_key: '883576864052269057-9704MbPp5RwSAzWeXxtev7eHUFfqQz1',
  access_token_secret: 'vmSWffvm2rhicKBpdLs5GpGjHC6mUXsiFhX9ARSiTHu8M'/*

  consumer_key: this.getConsumerKey,
  consumer_secret: this.getConsumerSecret,
  access_token_key: this.access_token_key,
  access_token_secret: this.access_token_secret*/
});


function getConsumerKey()
{
    if(settings.has('twitterConsumerKey'))
    {
        return settings.get('twitterConsumerKey');
    }
    else {
        return '';
    }
}

function setConsumerKey(q)
{
    settings.set('twitterConsumerKey',q);
}

function getConsumerSecret()
{
    //return settings.get('twitter.consumerSecret');
    if(settings.has('twitterConsumerSecret'))
    {
        return settings.get('twitterConsumerSecret');
    }
    else {
        return '';
    }
}

function setConsumerSecret(q)
{
    settings.set('twitterConsumerSecret',q);
}
function getAccessTokenKey()
{
    //return settings.get('twitter.accessTokenKey');
    if(settings.has('twitterAccessTokenKey'))
    {
        return settings.get('twitterAccessTokenKey');
    }
    else {
        return '';
    }
}

function setAccessTokenKey(q)
{
    settings.set('twitterAccessTokenKey',q);
}
function getAccessTokenSecret()
{
    //return settings.get('twitter.accessTokenSecret');
    if(settings.has('twitterAccessTokenSecret'))
    {
        return settings.get('twitterAccessTokenSecret');
    }
    else {
        return '';
    }
}

function setAccessTokenSecret(q)
{
    settings.set('twitterAccessTokenSecret',q);
}
/*Obtiene algun dato por parametro, es para uso general*/
function getData(resource, params)
{
    //params en formato -> var params = {screen_name: q};
    client.get(resource, params, function(error, tweets, response) {
      if (!error) {
        //console.log(tweets);
        return tweets;
      }
    });
}
//https://dev.twitter.com/rest/reference/get/statuses/user_timeline
function getUserTimeLine(q)
{
    console.log('{screen_name: '+q+'}');
    var params = {screen_name: q};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        return tweets;
      }
      else {
          console.log(error);
          //console.log(tweets);
          //console.log(response);
      }
    });
}



function getHashTag(params)
{
    var resource='search/tweets'
    var params = {q: params};
    //return getData(this.resource, this.params);
    client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
       console.log(tweets);
    });
}

function getFavoriteList()
{
    client.get('favorites/list', function(error, tweets, response) {
      if(error) throw error;
      console.log(tweets);  // The favorites.
      console.log(response);  // Raw response object.
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
exports.getConsumerKey = function(){return getConsumerKey() };
exports.setConsumerKey =  function(q){setConsumerKey(q)};

exports.getConsumerSecret= function(){return getConsumerSecret()};
exports.setConsumerSecret= function(q){setConsumerSecret(q)};

exports.getConsumerSecret= function(){return getConsumerSecret()};
exports.setConsumerSecret= function(q){setConsumerSecret(q)};

exports.getAccessTokenKey= function(){return getAccessTokenKey()};
exports.setAccessTokenKey= function(q){setAccessTokenKey(q)};

exports.getAccessTokenSecret= function(){return getAccessTokenSecret()};/*Funciona*/
exports.setAccessTokenSecret= function(q){setAccessTokenSecret(q)};

exports.getUserTimeLine= function(q){return getUserTimeLine(q)};
exports.getHashTag= function(q){return getHashTag(q)};
