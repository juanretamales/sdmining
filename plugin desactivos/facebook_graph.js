//https://www.npmjs.com/package/facebook-sdk
const settings = require('electron-settings');

var connect = require('connect'),
  fbsdk = require('facebook-sdk');

connect()
  .use(connect.cookieParser())
  .use(connect.bodyParser())
  .use(fbsdk.facebook({
    appId  : 'YOUR APP ID',
    secret : 'YOUR API SECRET'
  }))
  .use(function(req, res, next) {

    if (req.facebook.getSession()) {
      res.end('<a href="' + req.facebook.getLogoutUrl() + '">Logout</a>');

      // get my graph api information
      req.facebook.api('/me', function(me) {
          console.log(me);
      });

    } else {
        res.end('<a href="' + req.facebook.getLoginUrl() + '">Login</a>');
    }

  })
  .listen(3000);
