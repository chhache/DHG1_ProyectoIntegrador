const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {	validationResult } = require('express-validator');
const User = require('../models/Users');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

    index: (req,res) => {
		const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		//res.send(users);
        res.render('users/users', {users: users});
    },
	// Formulario de registro usuario -> GET
	register: function (req,res){
        res.render('users/register')
		// **  Comparar password con repassword
		// if(userToLogin) {
		// 	let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
		// 	if (isOkThePassword) {
		// 		delete userToLogin.password;
		// 		req.session.userLogged = userToLogin;

		// 		if(req.body.remember_user) {
		// 			res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
		// 		}

		// 		//return res.redirect('/users/profile');
		// 		return res.redirect('/');
		// 		//return res.send('Login correcto');
		// 	} 
    },
	// Proceso registro usuario -> POST
	processRegister: (req, res) => {
		//res.send('se ejecuto el controlador que guarda JSON') // Validación del Form
		//res.json(req.body);
		//return res.json(req.file);
		//accedes al id del ultimo elemento (0 no existiria) y le sumas 1 para los nuevos productos
		const resultValidation = validationResult(req);
		
		// -- Enviar a JSON con errors para visualizar por navegador
		//res.send(resultValidation.errors);

		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),				
				oldData: req.body
			});
		}
				
		let userInDB = User.findByField('email', req.body.email);	
		console.log(userInDB);
				
		// if (userInDB) {
		// 	 return res.render('/users/register', {
		// 		errors: {
		// 			email: {msg: 'Este email ya está registrado, usuario inválido'}
		// 		},
		// 		oldData: req.body
		// 	});
		// }

		let userToCreate = {
			...req.body,															// spread Operator
			password: bcryptjs.hashSync(req.body.password, 10),
			repassword: bcryptjs.hashSync(req.body.password, 10),
			image: req.file == undefined ? 'image_user_default.png': req.file.filename // if ternario
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('login');

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
	},
    detail: (req,res) => {
        let idUser = req.params.id 
		const userMostrar = users.find(el => el.id == idUser); 
        //res.send({users: userMostrar})
		res.render('users/detail', {user: userMostrar});
    },
	login: (req,res) => {
        res.render('users/login')
    },
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

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
		
		return res.render('users/login', {
			errors: {
				email: {
					msg: 'No se encuentra este usuario en la base de datos'
				}
			}
		});
	},
	profile: (req, res) => {
		//res.send('Login exitoso') // Usuario validado
		//return res.render('users/userProfile', {
		return res.render('userProfile', {
		user: req.session.userLogged
		});		
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	redirect:function(req,res){
        res.redirect('index')
    } 

};

module.exports = usersController