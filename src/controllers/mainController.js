//const path = require('path');
//const fs = require('fs');
const db = require('../database/models'); 				// Requerimos el dir donde almacenamos los modelos
const sequelize = db.sequelize							// Requrimos sequlize
//const {Op} = require('sequelize') 						// Constante para requerir Operadores de sequelize

// Estructura BD JSON -> Sprint 5
// const productsFilePath = path.join(__dirname, '../data/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: function (req,res){
        // res.render('index', {products});                 // BD JSON -> Sprint 5
        db.Product.findAll()								// Buscamos todos los productos con findAll -> método de sequlize
			.then(products =>{
				//res.send('Hola')
				res.render('index.ejs', {products})	 // Renderizamos la vista productList -> products:products (clave:valor)
			})
    },
    // register: function (req,res){
    //     res.render('users/register')
    // },
    // login:function (req,res){
    //     res.render('users/login')
    // },    
    redirect: (req,res) => {
        res.redirect('index')
    },
    
    help: (req, res) =>{
        res.render('help');
    }    
}

module.exports = mainController