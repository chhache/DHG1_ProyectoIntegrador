//const path = require('path');
const res = require('express/lib/response');
const db = require('../../database/models');        // Variables de modelos de la BD
//const sequelize = db.sequelize;                     
const { Op } = require("sequelize");                // Exportar los Operadores de Sequelize

module.exports = {
    list: (req, res) => {
        db.User
            .findAll()   // Informacion que llega por URL por .body
            .then(users =>{
                // return res.render(users); -> para renderizar en vista
                //return res.json(users); // genera el endpoint esperado a consumir 
                return res.status(200).json({
                    total: users.length,   // Es un array puedo contabilizar el total
                    data: users            // Info de users 
            })
        })
    },
    detail: (req, res) => {
        db.User
            .findByPk(req.params.id)                // Vieja por URL
            .then(user =>{
                // return res.render(movies);       -> para renderizar en vista
                //return res.json(movies);          // genera el endpoint esperado a consumir 
                return res.status(200).json({
                data: user                          // Info de users
            }); 
        })       
    }
}
