const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {	validationResult } = require('express-validator');
//const User = require('../models/Users');
const db = require('../database/models'); 				// Requerimos el dir donde almacenamos los modelos
const sequelize = db.sequelize							// Requrimos sequlize
const {Op} = require('sequelize') 						// Constante para requerir Operadores de sequelize


const usersController = {

	// Listado Usuarios Sequelize	
	list: (req,res) => {
        //res.send('LIST')
		db.User.findAll()								// Buscamos todos los usuarios con findAll -> método de sequlize
			.then(users =>{								// .then toma la promesa y recibe la variable users
				//res.send(users)
				res.render('usersList.ejs', {users})	 // Renderizamos la vista usersList -> users:users (clave:valor)
			})

    },
	// Método GET Formulario Creación User - Sequelize
	create: (req,res) => {
		//res.send('CREATE');
        res.render("usersCreate");
    },
	// Método POST Formulario Registro de Usuario - Sequelize 
	store: function (req,res){

		const resultValidation = validationResult(req);
		// -- Enviar a JSON con errors para visualizar por navegador
		//res.send(resultValidation.errors);
		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),				
				oldData: req.body
			});
		}
		db.User
		.create({
			...req.body,																// Spread operator
			password : bcryptjs.hashSync(req.body.password, 10),
			// repassword: bcryptjs.compare(req.body.rerepassword, this.password),
			image: req.file == undefined ? 'image_user_default.png': req.file.filename  // If Ternario ? si es undifined -> defaul.png SiNo -> 
		
		})					
											// Del modelo Movie, usamos el método create y recibimos .body que viaja por POST, podría armarse un objeto literal con las claves de cada campo, en este caso se llaman igual por ello podemos pasar todo el .body (name = columnas tabla origen) -> name: req.body.formularioName
		//image1: req.file == undefined ? 'default-image.png': req.file.filename, 
		.then(() => {			             												// Callback para redireccinar la vista
			//res.send('Insertado a la Base de Datos')
			res.redirect('login');				// Error de lectura de header	
			})	
		.catch((err) => {
			console.log(err);
		})		
	},

	detail: (req,res) => {
        //let idUser = req.params.id 
		db.User
		.findByPk(req.params.id)
			.then(user => {					 	 // captura  la promesa
				res.render('userDetail', {user})	 // renderiza la vista con los products y los géneros									
			})	
		// const userMostrar = users.find(el => el.id == idUser); 
        // //res.send({users: userMostrar})
		// res.render('users/detail', {user: userMostrar});
		.catch((err) => {
			console.log(err);
		})	
    },

	edit: (req,res) => {
        //res.send('EDIT')		
		db.User
		.findByPk(req.params.id)						// Buscar usuario por el nombre que recibe por URL-> select id.product from products where id like 'id.buscado'
			.then(userToEdit => {						// captura  la promesa
				res.render('usersEdit', {userToEdit})	// renderiza la vista con los products y los géneros									
			})
			.catch((err) => {
				console.log(err);
			})			
    },
	update: (req,res) => {
        //res.send('UPDATE')
		db.User
		.update({
			...req.body,
			password : bcryptjs.hashSync(req.body.password, 10),			
			image: req.file == undefined ? 'image_user_default.png': req.file.filename  // If Ternario ? si es undifined -> defaul.png SiNo -> 
		},{       			// Actualizamos los campos del form (viaja por PUT)
            where: {                        		
                id: req.params.id					// Condicional -> coincida el ID con el ID que viaja por URL
            }
        })
            .then( user => {
                //res.redirect('/usersList')
				//res.send('Actualizado')
				return res.redirect('/')
				// res.render('userDetail', {user})
            })
			.catch((err) => {
				console.log(err);
			})		
    },

	destroy : (req, res) => {
		// *** Sequelize ***
		db.User.destroy({								// Método .destroy de sequelize	
			where: {									// Con Where es más atómico
				id: req.params.id
			}		
		})  				
			.then(() => {
				// return res.redirect('/');
				return res.redirect('/')				// redirecciona a /
			})
			.catch((err) => {
				console.log(err);
			})	
	},
	
	login: (req,res) => {
        res.render('users/login')
    },

	loginProcess: (req, res) => {
		
		let userToLogin = req.body.email;
		//res.send(userToLogin)

		//if (userToLogin !== null){
			db.User.findOne({
				where:{
					email: req.body.email
				}
			})								// Buscamos todos los usuarios con findAll -> método de sequlize
				.then(user => {								// .then toma la promesa y recibe la variable users
					
					if(user === null || user === " "){
						// res.send('No existe el usuario')
						return res.render('users/login', {
							errors: {
								email: {
									msg: 'Completar con correo/usuario existente'
								}
							}
						});

					}else{
						if(userToLogin === user.email){
							// -- Eliminar comentar para encriptar password --
							let isOkThePassword = bcryptjs.compareSync(req.body.password, user.password);
							//let isOkThePassword = user.password;
								if (isOkThePassword) {
									delete userToLogin.password;
							// -- Eliminar comentar para encriptar password --		

									req.session.userLogged = user;

									if(req.body.remember_user) {
										res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 3 }) // 1000 = 1 seg * 60 = 1 min * 3 = 3 min 
									}

									//return res.redirect('/users/profile');
									return res.redirect('/');
									//return res.send('Login correcto');
								} 
								return res.render('users/login', {
									errors: {
										email: {
											msg: 'Las credenciales son inválidas'
										}
									}
								});
							}						
					}									
				})
				.catch(err => {
					console.log(err)
				})
	},	
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	redirect: function(req,res){
         res.redirect('index')
    } 

};

module.exports = usersController