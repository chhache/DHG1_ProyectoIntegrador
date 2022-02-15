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
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  // Cambiar datos al subir a Heroku
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
