const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const app = express();
const port = 3031
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require ('./routes/usersRoutes')
const usersSQLRoutes = require ('./routes/usersSQLRoutes')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));
app.use(cookies());
app.use(userLoggedMiddleware);
// Servicio de express-validator para form
app.use(express.urlencoded({ extended: false }));
//Servicio de archivos estáticos (img, CSS y JS) se utiliza el middelware nativo express.static
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//Seteo EJS
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'views'));

app.listen(process.env.PORT || port, () => console.log(`Servidor corriendo en port ${port}`));

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/usersSQL', usersSQLRoutes);

module.exports = app;


