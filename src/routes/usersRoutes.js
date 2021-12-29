const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const path = require("path");

// ***************** Controller Require *******************
const usersController = require('../controllers/usersController');
const multer = require('multer'); // Para el file del form. + enctype + storage + uploadFile

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/images/users')
    },
    filename: function(req, file, cb){
        let fileName = `${Date.now()}_user${path.extname(file.originalname)}`
        cb(null, fileName);
    }
})

const uploadFile = multer({storage: storage});

// Middlewares
// const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/***Listado de usuarios ***/
router.get('/users', usersController.index) // Listado de usuarios (restaría mejorar la vista/estilos) 

/*** Formulario registro usuario ***/
router.get('/register', guestMiddleware, usersController.register );  //Funciona.
/*** Procesar el registro usuario ***/
router.post('/register', uploadFile.single('image'), usersController.processRegister);  //Funciona. Aparece un ? luego de apretar el boton.

/*** Formulario login usuario ***/
router.get('/login', guestMiddleware,usersController.login ); //Funciona.
/*** Procesar el login***/
router.post('/login', usersController.loginProcess);
//router.post('/login', usersController.redirect);     //Funciona. Aparece un ? luego de apretar el boton.

// Perfil de Usuario
router.get('/profile', authMiddleware, usersController.profile);

// Logout
router.get('/logout', usersController.logout);

module.exports = router