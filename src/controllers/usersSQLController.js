const path = require('path');
const fs = require('fs');
const db = require('../database/models'); 				// Requerimos el dir donde almacenamos los modelos
const sequelize = db.sequelize							// Requrimos sequlize
const {Op} = require('sequelize') 						// Constante para requerir Operadores de sequelize

const bcryptjs = require('bcryptjs');

const {
	validationResult
} = require('express-validator');
const User = require('../database/models/User');


// const usersFilePath = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersSQLController = {
	
	list: (req,res) => {
        //res.send('LIST')
		db.User.findAll()								// Buscamos todos los productos con findAll -> método de sequlize
			.then(users =>{								// .then toma la promesa y recibe la variable products
				//res.send(products)
				res.render('usersList.ejs', {users})	 // Renderizamos la vista productList -> products:products (clave:valor)
			})

    },
    create: (req,res) => {
		//res.send('CREATE');
        res.render("usersCreate");
    },
	// Formulario de registro usuario -> GET
	store: function (req,res){
        //res.send('STORE')
		db.User
		.create(req.body)					// Spread operator
											// Del modelo Movie, usamos el método create y recibimos .body que viaja por POST, podría armarse un objeto literal con las claves de cada campo, en este caso se llaman igual por ello podemos pasar todo el .body (name = columnas tabla origen) -> name: req.body.formularioName
		//image1: req.file == undefined ? 'default-image.png': req.file.filename, // If Ternario ? si es undifined -> defaul.png SiNo -> 
		.then(() => {              												// Callback para redireccinar la vista
			res.send('Creación Exitosa')
			// res.redirect('/usersSQL');
			//res.redirect('/usersSQL');	
			});									 
	},
	
    detail: (req,res) => {
        //res.send('DETAIL')
		db.User.findByPk(req.params.id)					// Buscar el producto por el ID que recibe por URL-> select id.product from products where id like 'id.buscado'
			.then(user => {								// captura la promesa y devuelve el producto que cumple 
				//res.send({user})						// test -> Objeto Literal product:product		
				res.render('userDetail.ejs', {user});		// filttrado por ID, remite el obj -> clave:valor product	
			})
    },
	edit: (req,res) => {
        //res.send('EDIT')		
		db.User.findByPk(req.params.id)							// Buscar el producto por el ID que recibe por URL-> select id.product from products where id like 'id.buscado'
			.then(userToEdit => {								// captura  la promesa
				res.render('usersEdit', {userToEdit})			// renderiza la vista con los products y los géneros									
			})		
    },
	update: (req,res) => {
        //res.send('UPDATE')
		db.User.update(req.body, {       			// Actualizamos los campos del form (viaja por POST)
            where: {                        		
                id:req.params.id					// Condicional -> coincida el ID con el ID que viaja por URL
            }
        })
            .then( user => {
                //res.redirect('/usersSQL')
				res.render('/usersSQL', )
            })	
    },
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
};

module.exports = usersSQLController
