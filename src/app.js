// requerir el módulo Express y almacenar en fc express
const express = require('express');
//Ejecutar la fc express y almacenar el obj en la constante app
const app = express();
//cont puerto a solicitar el servidor web
const port = 3031
//Requerir el módulo nativo path 
const path = require('path');
//Requerir mainRoutes
const mainRoutes = require('./routes/mainRoutes');

//Servicio de archivos estáticos (img, CSS y JS) se utiliza el middelware nativo express.static
//Pasar el nombre del dir que continee los archivos etáticos y la fc express.static, para invocarla para varios archivos sse debe definir por separado
//Informar que queremos usar archivos estáticos -> path
app.use(express.static(path.resolve(__dirname, '../public')));

//Seteo EJS
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'views'));
//El obj app con el método listen se encargará de levantar el servidor
//Recibe dos parámetros el puerto (modificar las comillas en el campo text para definir la var) y opcional el callback con el msn
//configurar variable de entornoen la PC Virtual de Heroku dond se va a realizar el deploy de mi app
//emplearemos la variable de entorno nativa  -> process.env brinda acceso a las var de entorno del sistema
//process.env.PORT, add en la linea de comando y validamos esa variavle  ó la anterior -> port
// app.listen(port, () => console.log(`Servidor corriendo en port ${port}`)); -> conf sin acceso a HEROKU
app.listen(process.env.PORT || port, () => console.log(`Servidor corriendo en port ${port}`));

app.use('/', mainRoutes)
