const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = 3031
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require("./routes/productsRoutes");
const usrsRoutes = require ('./routes/usrsRoutes');
const usersRoutes = require ('./routes/usersRoutes');
const usersSQLRoutes = require ('./routes/usersSQLRoutes')
const apiUsersRoutes = require ('./routes/api/apiUsersRoutes');
const apiProductsRoutes = require ('./routes/api/apiProductsRoutes');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

app.use(session({
	secret: "Secret",
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

// CORS -> Dashboard REACT (soluciona error de correr front-end (Dashboard) & back-end (API) en localhost)
app.use(cors());

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/usrs', usrsRoutes);
app.use('/users', usersRoutes);
app.use('/usersSQL', usersSQLRoutes);
app.use('/api/users', apiUsersRoutes);
app.use('/api/products', apiProductsRoutes);

module.exports = app;


