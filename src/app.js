const express = require('express');
const app = express();
const port = 3031
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');

//Servicio de archivos estáticos (img, CSS y JS) se utiliza el middelware nativo express.static
app.use(express.static(path.resolve(__dirname, '../public')));

//Seteo EJS
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'views'));

app.listen(process.env.PORT || port, () => console.log(`Servidor corriendo en port ${port}`));

app.use('/', mainRoutes)
