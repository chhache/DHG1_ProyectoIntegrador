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

/*** Registro de usuarios ***/
router.get('/users',usersController.index) // 1. /products (GET) Listado de productos. OK, queda maquillar 


router.get('/login', usersController.login );        //Funciona.
router.post('/login', usersController.redirect);     //Funciona. Aparece un ? luego de apretar el boton.

/*** Formulario registro usuario ***/
router.get('/register', usersController.register );  //Funciona.
/*** Procesar el registro usuario ***/
router.post('/register', uploadFile.single('image'), usersController.processRegister);  //Funciona. Aparece un ? luego de apretar el boton.
        
module.exports = router