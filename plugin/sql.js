/*  SQL */
const Sequelize = require('sequelize');

// Obtenemos datos desde loki.js
const loki = require('lokijs')
var db = new loki('loki.json')
var collection=global.sharedObj.settings;
if(collection==null || collection==undefined)
{
    collection = db.addCollection('settings')
}

// creamos una nueva conexión de Sequelize
//var sequelize = new Sequelize(getDatabase(), getUser(), getPassword());
var sequelize = new Sequelize(getDialect()+'://'+getUser()+':'+getPassword()+'@'+getHost()+':5432/'+getDatabase());
/*var sequelize = new Sequelize(getDatabase(), getUser(), getPassword()){
	host: getDatabase(),
	dialect: getDialect(),
	pool: {
    	max: 5,
    	min: 0,
    	idle: 10000,
	}
}*/

//busca un elemento con el nombre n y el grupo twitter, luego retorna su valor, de no existir o ser undefined lo agrega a la tabla o coleccion y retorna 'degault'
function getOne(n)
{
    //busca un elemento con el nombre n y el grupo twitter,
    var temp=collection.findOne({'name':n, 'group':'sql'});
    if(temp===null)
    {
        //lo agrega a la tabla o coleccion
        insertConfig(n,'default');
        global.sharedObj.settings= collection;
        return 'default';
    }
    /*try {
        if(temp==undefined)//de no existir o ser undefined
        {

        }
    }
    catch(err) {
        console.log('Error:'+err);
    }*/
    return temp.value;
}
//obtiene todos los datos del grupo twitter
function getAll()
{
    var temp=collection.findOne({'group':'sql'});
    return temp;
}
//modifica el elemento con el nombre n y el grupo sql, y asigna el valor v, para este fichero todos los elementos o datos seran de grupo twitter.
function setConfig(n,v)
{
    //busca un elemento  con el nombre n y el grupo twitter
    var temp=collection.findOne({'name':n, 'group':'sql'});
    //asigna el valor v sobre el elemento encontrado
    console.log('intentando modificar el elemento ['+n+'] a valor ['+v+']');
    temp.value=v;
    //aplica los cambios en la tabla o colleccion
    collection.update(temp);
    //asigno el dato a la variable global para que no se quede solo en este fichero
    global.sharedObj.settings= collection;
}
//agrego el elemento con el nombre n, y el valor v para el grupo sql, para este fichero todos los elementos o datos seran de grupo twitter.
function insertConfig(n,v)
{
    collection.insert({name:n, value: v, group: 'sql'});
    //asigno el dato a la variable global para que no se quede solo en este fichero
    global.sharedObj.settings= collection;
}
function testConnection()
{
    sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return true;
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    return false;
  });
}

function getHost()
{
    return getOne('host');
}
function getUser()
{
    return getOne('user');
}
function getPassword()
{
    return getOne('password');
}
function getDatabase()
{
    return getOne('database');
}
function getDialect()
{
    x=getOne('dialect');
    if(x=='default')
    {
        return 'mysql';
    }
    return x
}

function setHost(q)
{
    setConfig('host',q);
}
function setUser(q)
{
    setConfig('user',q);
}
function setPassword(q)
{
    setConfig('password',q);
}
function setDatabase(q)
{
    setConfig('database',q);
}
function setDialect(q)
{
    setConfig('dialect',q);
}
