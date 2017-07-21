# PiscoEditor Guia Rapida

**Clonalo, compilalo y ejecutalo para probarlo.**

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/juanretamales/PiscoEditor.git
# Go into the repository
$ cd PiscoEditor
# Install dependencies
$ npm install
# Run the app
$ npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

# Sistemas de capas!
Para un mejor funcionamiento en la personalizacion y flexibilidad del editor, las librerias javascript y archivos css se separaron en capas, las cuales todas menos la capa 0 o Core pueden reemplazarse.

  - # Capa 1 o Core
    Guarda los archivos indispensables para el correcto funcionamiento y precarga de la aplicacion-Handlebars.js: Permite la utilizacion de plantillas, principalmente para traducir facilmente la interfaz de la aplicacion. 

| Carpeta/Tipo | Archivo | Descripcion |
| ------ | ------ | ------ |
| Javascript (js) | renderer.js | nexo entre el archivo index.html y node.js. |
| Javascript (js) | [Handlebars.js](http://handlebarsjs.com/) | Permite la utilizacion de plantillas, principalmente para traducir facilmente la interfaz de la aplicacion. |
| Javascript (js) | [Browserify.js](http://browserify.org) | Para usar require('Modulo') desde el navegador. |
| Imagenes (img) | logopisco.png | icono de la aplicacion. |
| Diseño (css) | style.css | Contiene el diseño de la aplicación. |

  - # Capa 2
    Añade los archivos base necesarios para el correcto funcionamiento del editor, como un editor WYSIWYG

| Carpeta/Tipo | Archivo | Descripcion |
| ------ | ------ | ------ |
|  | [ContentTools](http://getcontenttools.com/) | Un editor WYSIWYG seleccionado entre otros opensource. |

  - # Capa 3
    Añade los archivos complementos al editor, como la libreria para añadir codigo programacion, graficos, etc.

| Carpeta/Tipo | Archivo | Descripcion |
| ------ | ------ | ------ |
| Javascript(js) | [momentjs-with-locales](http://momentjs.com/) | Analizar, validar, manipular y mostrar fechas y horas en Javascript. |
| Javascript(js) | [chart.js](http://www.chartjs.org/) | Despliega y arma distintos tipos de graficos. |
| Javascript(js) | []() | |


  - # Capa 4
    Añade los archivos opcionales para el editor, otra manera de explicarlo, es que aquí se encuentran los plugin o complementos.

| Carpeta/Tipo | Archivo | Descripcion |
| ------ | ------ | ------ |
|  |  |  |


## License

[Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) ](LICENSE.md)

**Free Software!**
