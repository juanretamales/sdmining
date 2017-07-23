//https://www.npmjs.com/package/@google/maps

const settings = require('electron-settings');

var googleMapsClient = require('@google/maps').createClient({
  key: getGmapKey()
});

function getGmapKey()
{
    if(settings.has('gmapKey'))
    {
        return settings.get('gmapKey');
    }
    else {
        return '';
    }
}

function setGmapKey(q)
{
    settings.set('gmapKey',q);
}

function geocodeAnAddress(q)
{
    // Geocode an address.
    googleMapsClient.geocode({
      address: q
    }, function(err, response) {
      if (!err) {
        console.log(response.json.results);
        return response;
      }
    });
}

/*Disponibles fuera del fichero*/
exports.geocodeAnAddress= function(q){return geocodeAnAddress(q)};
