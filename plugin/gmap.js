//https://www.npmjs.com/package/@google/maps

const settings = require('electron-settings');

/*
{
  "type": "service_account",
  "project_id": "apitest-174603",
  "private_key_id": "b8ef5f5de05dc6c52b17aeb343ec32b0544d73dd",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC62pg7A1hIA2f7\nUH+htKine173eg3AQYitdkbZpOQ/scSF97biivGN4QFiOWdGzqC5PwIvFHyan37h\nI5Ulv9K+15jT1wCFXUtAxe88RDKgr+ZbQdA6bpUZ7lEibDjtdRwtLRdsnlRwCjZn\nOpNk18b2lmd2Ii5AzJpIMKDsJGYkC87o6xK2+rA/CZsNbOJqJ3wzCvHDiOtMEVbz\nYmifvqjMaJTwZdgBSJrxMXB7PXhUWBzkGijgU5WXFrVSL+FklrHrJRXqZvtjgTEF\nFaufR1kqR7pOwG20j7HamV+/UQwTeP7vf3XcXKn5DOo8QP++jj2ObCEOgnouu4p7\nRAaKqhAvAgMBAAECggEACAiT7khDiGe/wGStSBozUhgSH4O7iZ4yWSWHqvMq7mN0\ni+n4OUnjVB1DaPdc2FopO4MDqLCHIZgP5XAZM9Pzz0ldBGaZsCIwX8A4JpgsBmU+\n+yzGM2zuXidf4kyoL0APY7ss5vpGWRbR+02KaWsu3l/dt4zaqOXjEDgprbLBmB+9\ns8Z3pNm1lX4imdUBODN0ErkfC0nLCgWoDcqJanh39GohYmJg9cRD/cjnl6kxBGqt\ni0BmVmZQMSUMy3sd5zDZH9Rhk2SQRaJGOmbrEgXuvISyuwRLIjzLt+qKLqy+l9AT\nMNv3B4p0Y1JAjKj/2phqojR7TMW2r+Nw3rOIB+6rWQKBgQDdV+QM3+mH8WTJQL/3\nmai4+qQp8poA0jm111czGPOanhcVVREGzMfLSPBam5dOuWWQepWZkJpdnjhfYW24\nfBRJXfBeQH0rOp/LRlrVJQn8o5mxAj2CABqefYY6XL/R+WxBz+tHGpRjbGohafqH\n9BauSaBDUeQBISZCz4kLfvpy8wKBgQDYHENQCj89/9Ys/a6rSbISKFUs/eQijOtW\niYgGhfxpaQiPVqqNp/W0EBx/PqSObgBz8r6nWIH0hBEwnHumxoWXCciAkLvXKvsm\n/lC0xocRIsKTycx4Nbh2yRQLrws4qHNA5lsqeJmNWJQEXrAOQPp2Gx0TQf5QU1Fu\n2MnYPHjk1QKBgAPGog9OKo+1IIEGZ7/zkRtGu1Iz30iwTWe6urQWcuFqXP5yKw4w\npB/lqKQDD3u6Ue87CB5MhzWdo1yNLu/8vePahGU3OGtqXpt7IcWNEjSLHe4VGbOE\nCPA3N/j66BLO7Hfa8iqOW4WurcjQJAP5uAFVJDTByt/yDtMI80+M5PzdAoGBALy3\nwZhNunhbxx420adGjbgJfIfzlpsNUB2bsCtyKb+rNwxk9D8LoyaAw0Hi5DR0nvSh\n0Be21JVAFvrKS7iRt+rzYiHTQhVdtUCR6MxUaXJvVldUa7e1wcYJRfYF/9iUUUEl\naAsokX67EVbXkQqBd7ZXawZ8JKbke0I/EdRAypmZAoGAO3/t29DHgGXV+WQJGy0p\n1Hr2NAey5edm973MPDVCGIV/nKFkPuepFWnTzIh4uFzqCO7Iedu+CAXc1BPwRyQT\nvVFjvloh/tweQeSyUy9pKPXrw2i4x+Adk/Zh4iBoHU44wDvHj/iAFX5F+fLIRqqQ\n6XGRDpp/itd824/oDhxBIkc=\n-----END PRIVATE KEY-----\n",
  "client_email": "probar-la-api@apitest-174603.iam.gserviceaccount.com",
  "client_id": "106438687093703262282",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/probar-la-api%40apitest-174603.iam.gserviceaccount.com"
}
*/

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
