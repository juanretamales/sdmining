

var Twitter = require('twitter');
const loki = require('lokijs')
var db = new loki('loki.json')
var collection=global.sharedObj.settings;
if(collection==null || collection==undefined)
{
    collection = db.addCollection('settings')
}

var client = new Twitter({
  consumer_key: getConsumerKey(),
  consumer_secret: getConsumerSecret(),
  access_token_key: getAccessTokenKey(),
  access_token_secret: getAccessTokenSecret()
});
//busca un elemento con el nombre n y el grupo twitter, luego retorna su valor, de no existir o ser undefined lo agrega a la tabla o coleccion y retorna 'degault'
function getOne(n)
{
    //busca un elemento con el nombre n y el grupo twitter,
    var temp=collection.findOne({'name':n, 'group':'twitter'});
    if(temp==undefined)//de no existir o ser undefined
    {
        //lo agrega a la tabla o coleccion
        insert(n,'default');
        global.sharedObj.settings= collection;
        return 'default';
    }
    return temp.value;
}
//obtiene todos los datos del grupo twitter
function getAll()
{
    var temp=collection.findOne({'group':'twitter'});
    return temp;
}
//modifica el elemento con el nombre n y el grupo twitter, y asigna el valor v, para este fichero todos los elementos o datos seran de grupo twitter.
function update(n,v)
{
    //busca un elemento  con el nombre n y el grupo twitter
    var temp=collection.findOne({'name':n, 'group':'twitter'});
    //asigna el valor v sobre el elemento encontrado
    console.log('intentando modificar el elemento ['+n+'] a valor ['+v+']');
    temp.value=v;
    //aplica los cambios en la tabla o colleccion
    collection.update(temp);
    //asigno el dato a la variable global para que no se quede solo en este fichero
    global.sharedObj.settings= collection;
}
//agrego el elemento con el nombre n, y el valor v para el grupo twitter, para este fichero todos los elementos o datos seran de grupo twitter.
function insert(n,v)
{
    collection.insert({name:n, value: v, group: 'twitter'});
    //asigno el dato a la variable global para que no se quede solo en este fichero
    global.sharedObj.settings= collection;
}
function getConsumerKey()
{
    //console.log(global.sharedObj.settings);
    //settings.set('twitterConsumerKey',q);
    /*var consumerkey = collection.findOne({'name':'ConsumerKey', 'group':'twitter'})
    if(consumerkey==null || consumerkey==undefined)
    {
        collection.insert({name:'ConsumerKey', value: 'empty, replace with a value',group:'twitter'})
        return 'empty, replace with a value';
    }
    return consumerkey.value;*/
    //var temp=collection.findOne({'name':'ConsumerKey', 'group':'twitter'});
    //return temp.value;
    return getOne('ConsumerKey');
}

function setConsumerKey(q)
{
    update('ConsumerKey',q);
    //settings.set('twitterConsumerKey',q);
}

function getConsumerSecret()
{
    //return settings.get('twitter.consumerSecret');
    /*if(settings.has('twitterConsumerSecret'))
    {
        return settings.get('twitterConsumerSecret');
    }
    else {
        return '';
    }*/
    return getOne('ConsumerSecret');
}

function setConsumerSecret(q)
{
    //settings.set('twitterConsumerSecret',q);
    update('ConsumerSecret',q);
}
function getAccessTokenKey()
{
    //return settings.get('twitter.accessTokenKey');
    /*if(settings.has('twitterAccessTokenKey'))
    {
        return settings.get('twitterAccessTokenKey');
    }
    else {
        return '';
    }*/
    //var temp=collection.findOne({'name':'AccessTokenKey', 'group':'twitter'});
    return getOne('AccessTokenKey');
}

function setAccessTokenKey(q)
{
    //settings.set('twitterAccessTokenKey',q);
    //var temp=collection.findOne({'name':'AccessTokenKey', 'group':'twitter'});
    //temp.value=q;
    //collection.update(temp);
    update('AccessTokenKey',q);
}
function getAccessTokenSecret()
{
    //return settings.get('twitter.accessTokenSecret');
    return getOne('AccessTokenSecret');
}

function setAccessTokenSecret(q)
{
    //settings.set('twitterAccessTokenSecret',q);
    update('AccessTokenSecret',q);
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

/*Experimentals*/
//exports.getParameters= function(){return JSON.stringify(parameters) };
