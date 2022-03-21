const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const path = require("path");

// ***************** Controller Require *******************
const usersSQLController = require('../controllers/usersSQLController');
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
//const validations = require('../middlewares/validateRegisterMiddleware');
//const guestMiddleware = require('../middlewares/guestMiddleware');
//const authMiddleware = require('../middlewares/authMiddleware');

/*** Creación de usuario - Sequelize ***/
router.get('/create', usersSQLController.create);       // 2. /users/create (GET) Formulario de creación de producto
router.post('/create', usersSQLController.store);       // -> Usar con Multer // 4. /users/create (POST) Acción de creación (a donde se envía el formulario)

/***Listado de usuarios - Sequelize ***/
router.get('/', usersSQLController.list)                // Listado de usuarios (restaría mejorar la vista/estilos) 

/*** Logout de un usuario - Sequelize ***/
router.get('/logout', usersSQLController.logout);

/*** Detalle de usuario - Sequelize***/ 
router.get('/:id', usersSQLController.detail);          // 3. /products/:id (GET) Detalle de un producto particular. OK, queda maquillar.

/*** Edición de un usuario - Sequelize***/
router.get('/edit/:id', usersSQLController.edit);       // 5. /products/edit/:id (GET) Formulario de edición de productos. OK, queda maquillar.
router.put('/:id', usersSQLController.update);          // 6. /products/:id (PUT) Acción de edición (a donde se envía el formulario). !FALTA!   

module.exports = router