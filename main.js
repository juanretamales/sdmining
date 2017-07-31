const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const settings = require('electron-settings');

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

const fs = require('fs'); //file system

var workspace="";//ruta del archivo a editar


const path = require('path')
const url = require('url')

const loki = require('lokijs')
//test in: http://www.obeliskos.com/LokiSandbox/
var collection;
var db = new loki(path.resolve(__dirname, '', 'sdmining.db'), {
	autoload: true,
	autoloadCallback : databaseInitialize,
	autosave: true,
	autosaveInterval: 4000
});

function databaseInitialize() {
  collection = db.getCollection("settings");
  if (collection === null) {
    collection = db.addCollection("settings");
  }

  // kick off any program logic or start listening to external events
  runProgramLogic();
}
function runProgramLogic() {
  var entryCount = db.getCollection("settings").count();
  console.log("number of entries in database : " + entryCount);
}
//comparto la informacion de sdmining.db al resto de archivos
global.sharedObj = {settings: collection};


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

    //precharge settings of electron-settings

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, icon: __dirname + '/app/img/icon.ico'})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})



//test: ipc.send('funcion',{require: 'twitter.js', nombre: 'getConsumerKey' , console: true});
//funcion que enruta las respuesta a funciones del servidor
ipc.on('funcion', function (event,arg) {
	//para asignar las dependencias de esta funcion
	var req={};
	//para asignar el valor si quiere algun retorno.
	var temp;
	//revisa si existe este valor a archivo a ocupar, por ejemplo './plugin/twitter.js' para require('./plugin/twitter.js');
	if(arg.console == true)
	{
		console.log('recibirOpciones:');
	}
	//revisa si existe esta funcion, por ejemplo require.getConsumerKey(, require debe ser seteado en arg.require anteriormente
	if(arg.require !== undefined)
	{
		if(arg.console == true)
		{
			console.log('./plugin/'+ arg.require);
		}
		req=require('./plugin/'+arg.require);
		//intenta ejecutar la funcion
		try {
			//revisa si tiene parametros o no
			if(arg.data==undefined || arg.data=='')
			{
				temp=req[arg.nombre]();
			}
			else {
				//de tener parametros lo envia como objetos como una sola variable que debe ser tratada en el plugin
				temp=req[arg.nombre](arg.data);
			}
		} catch (e) {
			if(arg.console == true)
			{
				console.log('['+arg.nombre+'] no es funcion de '+arg.require);
				//console.log('Error: '+e);
			}
		} finally {

		}
	}
	else {
		if(arg.console == true)
		{
			console.log('arg.require !== '+ arg.require);
		}
		//revisa si existe esta funcion, por ejemplo require.getConsumerKey(), require debe ser seteado en arg.require anteriormente
		if(typeof arg.nombre === 'function')
		{
			//ejecuta la funcion.
			temp = windows[arg.nombre](arg.data);
		}
		else {
			if(arg.console == true)
			{
				console.log('['+arg.nombre+'] no es funcion');
			}
		}
	}

	if(arg.console == true)
	{
		//console.log('recibirOpciones:');
		console.log(temp);
	}
	if(arg.return == true)
	{
		event.returnValue = temp;
	}
})

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function (files) {
    if (files)
	{
		event.sender.send('selected-directory', files);
	}
  })
})

ipc.on('save-file', function (event,arg) {
	//let content = document.getElementById('editor-container').innerHTML;
	if(workspace=="")
	{
		dialog.showSaveDialog((fileName) => {
			if (fileName === undefined){
				console.log("You didn't save the file");
				return;
			}
			content=`${arg}`;
			workspace=fileName;
			// fileName is a string that contains the path and filename created in the save file dialog.
			fs.writeFile(workspace, content, (err) => {

				if(err){
					console.log("An error ocurred creating the file "+ err.message)
				}
				console.log("The file has been succesfully saved");
			});
		});
	}
	else
	{
		content=`${arg}`;
		fs.writeFile(workspace, content, (err) => {
				if(err){
					console.log("An error ocurred creating the file "+ err.message)
				}
				console.log("The file has been succesfully saved");
		});
	}
})

ipc.on('save-as-file', function (event,arg) {
	//let content = document.getElementById('editor-container').innerHTML;
	dialog.showSaveDialog((fileName) => {
		if (fileName === undefined){
			console.log("You didn't save the file");
			return;
		}

		// fileName is a string that contains the path and filename created in the save file dialog.
		// fs.writeFile(fileName, content, (err)
		content=`${arg}`;
		fs.writeFile(workspace, content, (err) => {
			if(err){
				console.log("An error ocurred creating the file "+ err.message)
			}
			console.log("The file has been succesfully saved");
		});
	});
})

ipc.on('git-version', function (event,arg) {
	var shell = require('shelljs');
	//shell.config.path='C:\\Program Files\\nodejs\\node.exe' ;
	//shell.config.execPath='C:\\Program Files\\nodejs\\node.exe';
	shell.config.shell.config.execPath='C:\\Windows\\System32\\cmd.exe';
	//shell.config.execPath='C:\Windows\System32';
	var exec = shell.exec;
	if (!shell.which('git')) {
	  shell.echo('Sorry, this script requires git');
	  shell.exit(1);
	}
	if (shell.exec('git --version').code !== 0) {
	  shell.echo('Error: Git commit failed');
	  shell.exit(1);
	  console.log('Git version failed');
	}
	else
	{
		console.log('Git version sucesull');
	}
})

ipc.on('node-version', function (event,arg) {
	var shell = require('shelljs');

	shell.config.path='C:\\Program Files\\nodejs\\node.exe' ;
	/*dialog.showOpenDialog((fileName) => {
			if (fileName === undefined){
				console.log("You didn't save the file");
				return;
			}
			shell.config.execPath=fileName;
			console.log(fileName);
		}); */

	var version = shell.exec('node --version', {silent:true}).stdout;

	//var child = shell.exec('node --version', {async:true});
	//	child.stdout.on('data', function(data) {
	//  /* ... do something with data ... */
	//});

	shell.exec('node --version', function(code, stdout, stderr) {
	  console.log('Exit code:', code);
	  console.log('Program output:', stdout);
	  console.log('Program stderr:', stderr);
	});
})

ipc.on('test1', function (event,arg) {
	var shell = require('shelljs');
	shell.config.path='C:\\Program Files\\nodejs\\node.exe' ;
	echo('hello world');
	var str = echo('hello world');
	exec('node','--version');
})

ipc.on('txtSave', function (event,arg) {
	console.log('entra al ipc');
	const settings = require('electron-settings');
	settings.set('name', {
		first: arg,
		last: 'ejemplo x consola'
	});
})

ipc.on('txtTwitter', function (event,arg) {
    var twitter = require('./plugin/twitter.js');

    console.log('txtTwitter:['+arg+']');
    var temp=twitter.getUserTimeLine(arg);
    //var temp=twitter.getHashTag(arg);
    console.log('Parametros twitter: ['+twitter.getParameters()+']');
    console.log('txtTwitter:['+temp+']');
    event.returnValue = temp;
	//alert('Twitter:['+temp+']'); alert es del navegador, y estamos en consola
})

ipc.on('recibirOpciones', function (event,arg) {
    console.log('recibirOpciones');
    var twitter = require('./plugin/twitter.js');
    var temp={};
    temp['txtConsumerKey']=twitter.getConsumerKey();
    temp['txtConsumerSecret']=twitter.getConsumerSecret();
    temp['txtAccessTokenKey']=twitter.getAccessTokenKey();
    temp['txtAccessTokenSecret']=twitter.getAccessTokenSecret();
    console.log('temp['+temp+']');
    event.returnValue = temp;
    //event.sender.send('enviarRespuesta', temp);
	//alert('Twitter:['+temp+']'); alert es del navegador, y estamos en consola
})

ipc.on('guardarOpciones', function (event,arg) {
    var twitter = require('./plugin/twitter.js');
    if(arg.txtConsumerKey!=undefined)
    {
        twitter.setConsumerKey(arg['txtConsumerKey']);
        console.log('txtConsumerKey:'+twitter.getConsumerKey());
    }
    if(arg.txtConsumerSecret!=undefined)
    {
        twitter.setConsumerSecret(arg['txtConsumerSecret']);
        console.log('txtConsumerSecret:'+twitter.getConsumerSecret());
    }if(arg.txtAccessTokenKey!=undefined)
    {
        twitter.setAccessTokenKey(arg['txtAccessTokenKey']);
        console.log('txtAccessTokenKey:'+twitter.getAccessTokenKey());
    }if(arg.txtAccessTokenSecret!=undefined)
    {
        twitter.setAccessTokenSecret(arg['txtAccessTokenSecret']);
        console.log('txtAccessTokenSecret:'+twitter.getAccessTokenSecret());
    };

    settings.set('settings',db.serialize());
	//alert('Twitter:['+temp+']'); alert es del navegador, y estamos en consola
})
