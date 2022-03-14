//const path = require('path');
// const res = require('express/lib/response');
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
                    total: users.length,   // Es un array puedo contabilizar el total  //data: users[0].id,            // Info de users                  
                    data: users,           // users[i].id 
                    url: "images/users" 
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
    },
    // create: (req, res) => {
    //     db.User 
    //         .create(req.body)  // Viaja por POST
    //         .then(user => {
    //             return res.status(200).json({
    //                 data:user,
    //                 created: 'ok'
    //             })
    //         })    

    // },

    delete: (req, res) => {
        db.User 
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(response => {
                return res.json(response)
            })
    },
    search: (req, res) => {
        db.User 
            .findAll({
                where: {
                    id: { [ Op.like ]: '%' + req.query.keyword + '%' } // El query String viene por URL
                }
            })
            .then(users => {
                if(users.length > 0 ) {
                    return res.status(200).json(users);    
                }
                    return res.status(200).json('No existe el usuario en la BD');
            })
    }
}
