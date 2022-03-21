const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {	validationResult } = require('express-validator');
const User = require('../models/Users');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

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
    
    // -- Enviar a JSON con errors -- //
    res.send(resultValidation.errors);

    if (resultValidation.errors.length > 0) {
        return res.render('users/register', {
            errors: resultValidation.mapped(),				
            oldData: req.body
        });
    }
            
    let userInDB = User.findByField('email', req.body.email);
            
    if (userInDB) {
        return res.render('users/register', {
            errors: {
                email: {
                    msg: 'Este email ya está registrado'
                }
            },
            oldData: req.body
        });
    }	

},
    profile: (req, res) => {
        //res.send('Login exitoso') // Usuario validado
        //return res.render('users/userProfile', {
        return res.render('userProfile', {
        user: req.session.userLogged
        });		
    },

}

