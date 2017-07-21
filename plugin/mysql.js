/*  MySQL */
const mysql = require('mysql');
const settings = require('electron-settings');

var connection = mysql.createConnection({
  host     : this.getHost(),
  user     : this.getUser(),
  password : this.getPassword(),
  database : this.getDatabase()
});

function getHost()
{
    return settings.get('mysql.host');
}
function getUser()
{
    return settings.get('mysql.user');
}
function getPassword()
{
    return settings.get('mysql.password');
}
function getDatabase()
{
    return settings.get('mysql.database');
}

function setHost(q)
{
    settings.set('mysql',{host: q});
}
function setUser(q)
{
    settings.set('mysql',{user: q});
}
function setPassword(q)
{
    settings.set('mysql',{password: q});
}
function setDatabase(q)
{
    settings.set('mysql',{database: q});
}

function query(q)
{
    connection.connect();
    var solution;
    connection.query(q, function (error, results, fields) {
      if (error) throw error;
      solution = results;
      console.log('The solution is: ', results[0].solution);
    });
    connection.end();
    return solution;
}
