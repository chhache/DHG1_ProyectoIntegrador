//const path = require('path');
const db = require('../../database/models');
//const sequelize = db.sequelize;
const { Op } = require("sequelize");
//const fetch = require ('node-fetch');


const apiProductsController = {
    
    list: function (req, res){
        db.Product
            .findAll()
            .then(products => {
                return res.status(200).json({
                    total: products.length,  // lo que pide como count ->  // lo que pide como count by category
                    data: products,         // info de los productos
                    url: "api/products"
                    }
                )
            })

    },

    detail: (req, res) => {
        db.Product
            .findByPk(req.params.id)                
            .then(product =>{
                return res.status(200).json({
                data: product                          
            }); 
            // falta agregar el detalle de las relaciones mas importantes
        })       
    }
}

module.exports = apiProductsController