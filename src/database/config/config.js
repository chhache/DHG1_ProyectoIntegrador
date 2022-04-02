//require('dotenv').config();       // requerimos el paquete para ver variables de entorno

module.exports = {
  //* Conección alwaysdata.com */
  // "development": {
  //   "username": "decompras_chache",
  //   "password": "deCompras_1357",
  //   "database": "decompras_db",
  //   "host": "https://phpmyadmin.alwaysdata.com/phpmyadmin/index.php?route=/",
  //   "dialect": "mysql"
  // },
  "development": {
    "username": "root",
    "password": null,
    "database": "dcompras_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  // "development": {
  //   "username": process.env.DB_USER,
  //   "password": process.env.DB_PASS,
  //   "database": process.env.DB_NAME,
  //   "host": process.env.DB_HOST,
  //   "dialect": "mysql"
  // },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  // Cambiar datos al subir a Heroku
  // "production": {
  //   "username": process.env.DB_USER,
  //   "password": process.env.DB_PASS,
  //   "database": process.env.DB_NAME,
  //   "host": process.env.DB_HOST,
  //   "port": process.env.DB_PORT,
  //   "dialect": "mysql"
  // }
  "production": {
  "username": "decompras_chache",
  "password": "deCompras_1357",
  "database": "decompras_db",
  "host": "mysql-decompras.alwaysdata.net",   
  "dialect": "mysql"
  }
}  
