const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {	validationResult } = require('express-validator');
//const User = require('../models/Users');
const db = require('../database/models'); 				// Requerimos el dir donde almacenamos los modelos
const sequelize = db.sequelize							// Requrimos sequlize
const {Op} = require('sequelize') 						// Constante para requerir Operadores de sequelize

// Path BD JSON
// const usersFilePath = path.join(__dirname, '../data/users.json');
// Parseo delarchivo para ser interpretado por Node.js
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

    // Listado de usuarios JSON
	// index: (req,res) => {
	// 	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	// 	//res.send(users);
    //     res.render('users/users', {users: users});
    // },

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
	// Método POST Formulario Creación User - Sequelize 
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
			image: req.file == undefined ? 'image_user_default.png': req.file.filename  // If Ternario ? si es undifined -> defaul.png SiNo -> 
		
		})					
											// Del modelo Movie, usamos el método create y recibimos .body que viaja por POST, podría armarse un objeto literal con las claves de cada campo, en este caso se llaman igual por ello podemos pasar todo el .body (name = columnas tabla origen) -> name: req.body.formularioName
		//image1: req.file == undefined ? 'default-image.png': req.file.filename, 
		.then(() => {			             												// Callback para redireccinar la vista
			res.send('Insertado a la Base de Datos')
			//return res.redirect('login');				// Error de lectura de header	
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
    },

	edit: (req,res) => {
        //res.send('EDIT')		
		db.User
		.findByPk(req.params.id)						// Buscar usuario por el nombre que recibe por URL-> select id.product from products where id like 'id.buscado'
			.then(userToEdit => {						// captura  la promesa
				res.render('usersEdit', {userToEdit})	// renderiza la vista con los products y los géneros									
			})		
    },
	update: (req,res) => {
        //res.send('UPDATE')
		db.User
		.update(req.body, {       			// Actualizamos los campos del form (viaja por PUT)
            where: {                        		
                id: req.params.id					// Condicional -> coincida el ID con el ID que viaja por URL
            }
        })
            .then( user => {
                //res.redirect('/usersList')
				//res.send('Actualizado')
				res.render('userDetail', {user})
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
				res.render('usersList')				// redirecciona a /products
			})
	},
	
	// Proceso registro usuario -> POST
	// processRegister: (req, res) => {
		//res.send('se ejecuto el controlador que guarda JSON') // Validación del Form
		//res.json(req.body);
		//return res.json(req.file);
		//accedes al id del ultimo elemento (0 no existiria) y le sumas 1 para los nuevos productos
		// const resultValidation = validationResult(req);
		
		// -- Enviar a JSON con errors para visualizar por navegador
		//res.send(resultValidation.errors);

		// if (resultValidation.errors.length > 0) {
		// 	return res.render('users/register', {
		// 		errors: resultValidation.mapped(),				
		// 		oldData: req.body
		// 	});
		// }
				
		// let userInDB = User.findByField('email', req.body.email);	
		// console.log(userInDB);
				
		// if (userInDB) {
		// 	 return res.render('/users/register', {
		// 		errors: {
		// 			email: {msg: 'Este email ya está registrado, usuario inválido'}
		// 		},
		// 		oldData: req.body
		// 	});
		// }

		// let userToCreate = {
		// 	...req.body,															// spread Operator
		// 	password: bcryptjs.hashSync(req.body.password, 10),
		// 	repassword: bcryptjs.hashSync(req.body.password, 10),
		// 	image: req.file == undefined ? 'image_user_default.png': req.file.filename // if ternario
		// }

		// let userCreated = User.create(userToCreate);

		// return res.redirect('login');

		// *** Codigo viejo funcional sin validator *** //
		// let newID = users[users.length-1].id + 1; 
		// let newUser = {						
			// id:newID,			
			// ...req.body, //Spred operator, si hay OL toma c propiedad y valor.. y los SEPARA.
			// password: bcryptjs.hashSync(req.body.password, 10),
			// image: req.file == undefined ? 'image_user_default.png': req.file.filename // if ternario 
		// }	
		// users.push(newUser);
		// let usersJSON = JSON.stringify(users, null, 2); //para que no quede todo en una linea.
		// fs.writeFileSync(usersFilePath, usersJSON);		
		// res.redirect("/users/login");
		// *** Fin Codigo viejo funcional sin validator *** //
	// },
  
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
				.then(user =>{								// .then toma la promesa y recibe la variable users
					//res.send(user.email)
					if(user === null){
						res.send('No existe el usuario')
					}else{
						if(userToLogin === user.email){
							//res.send('Usuario logueado')
							//res.render('userProfile.ejs', {user})	 // Renderizamos la vista usersList -> users:users (clave:valor)
							
							// -- Eliminar comentar para encriptar password --
							//let isOkThePassword = bcryptjs.compareSync(req.body.password, user.password);
							let isOkThePassword = user.password;
								if (isOkThePassword) {
									delete userToLogin.password;
							// -- Eliminar comentar para encriptar password --		

									req.session.userLogged = user;

									if(req.body.remember_user) {
										res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 3 }) // 1000 = 1 seg * 60 = 1min * 2 = 2 min 
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
						
							// }else{
							// res.send('Login incorrecto');
							// }
					}									
				})
				.catch(err => {
					console.log(err)
				})
	},
		// LOGIN JSON		
		// if(userToLogin) {
		// 	let isOkThePassword = bcryptjs.compareSync(req.body.password, user.password);
		// 	if (isOkThePassword) {
		// 		delete userToLogin.password;
		// 		req.session.userLogged = user;

		// 		if(req.body.remember_user) {
		// 			res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 3 }) // 1000 = 1 seg * 60 = 1min * 2 = 2 min 
		// 		}

		// 		//return res.redirect('/users/profile');
		// 		return res.redirect('/');
		// 		//return res.send('Login correcto');
		// 	} 
		// 	return res.render('users/login', {
		// 		errors: {
		// 			email: {
		// 				msg: 'Las credenciales son inválidas'
		// 			}
		// 		}
		// 	});
		// }
		
		// return res.render('users/login', {
		// 	errors: {
		// 		email: {
		// 			msg: 'No se encuentra este usuario en la base de datos'
		// 		}
		// 	}
		// });

	// profile: (req, res) => {
	// 	//res.send('Login exitoso') // Usuario validado
	// 	//return res.render('users/userProfile', {
	// 	return res.render('userProfile', {
	// 	user: req.session.userLogged
	// 	});		
	// },

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