// requerir el módulo Express y almacenar en fc express
const express = require('express');
//Ejecutar la fc express y almacenar el obj en la constante app
const app = express();
//cont puerto a solicitar el servidor web
const port = 3031
//Requerir el módulo nativo path 
const path = require('path');

//Servicio de archivos estáticos (img, CSS y JS) se utiliza el middelware nativo express.static
//Pasar el nombre del dir que continee los archivos etáticos y la fc express.static, para invocarla para varios archivos sse debe definir por separado
//Informar que queremos usar archivos estáticos -> path
app.use(express.static('public'));
//El obj app con el método listen se encargará de levantar el servidor
//Recibe dos parámetros el puerto (modificar las comillas en el campo text para definir la var) y opcional el callback con el msn
//configurar variable de entornoen la PC Virtual de Heroku dond se va a realizar el deploy de mi app
//emplearemos la variable de entorno nativa  -> process.env brinda acceso a las var de entorno del sistema
//process.env.PORT, add en la linea de comando y validamos esa variavle  ó la anterior -> port
// app.listen(port, () => console.log(`Servidor corriendo en port ${port}`)); -> conf sin acceso a HEROKU
app.listen(process.env.PORT || port, () => console.log(`Servidor corriendo en port ${port}`));


//Al objeto app le pedimos el método get
//Recibe dos parámetros -> 1° string que define la URL del path 2° callback con dos parámetros req,res
//req -> las prop y métodos de la petición / res -> las prop y métodos de la respuesta a enviar
//Dentro del callback al obj res le pedimos el método send, pasamos lo que queremos mostras en el navegador (msn ó file)
//Dentro del método sendFile() utilizaremos el método join() que nos brinda el path completo del file
//__dirname -> const de Node.js que hacer referencia al directorio actual | /views/home.html -> es el path relativo
app.get('/', (req, res) => res.sendFile(path.join(__dirname, "/views/index.html")));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, "/views/register.html")));
app.get('/productDetail', (req, res) => res.sendFile(path.join(__dirname, "/views/productDetail.html")));
app.get('/productCart', (req, res) => res.sendFile(path.join(__dirname, "/views/productCart.html")));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, "/views/login.html")));

app.post("/register", (req,res) =>{res.redirect("/")});

//opcional
//recibe argu dirActual, ./ subir un dir y buscar public
//const publicPath = path.resolve(__dirname, './public'); 
//Informar que queremos usar archivos estáticos -> path
//app.use(express.static(publicPath))