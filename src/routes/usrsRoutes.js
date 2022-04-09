const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const path = require("path");
const { body } = require('express-validator');

// ***************** Controller Require *******************
const usrsController = require('../controllers/usrsController');
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
//const uploadFile = require('../middlewares/multerMiddleware');
//const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
//const authMiddleware = require('../middlewares/authMiddleware');

// Middlewares
// const uploadFile = require('../middlewares/multerMiddleware');
//const validations = require('../middlewares/validateRegisterMiddleware');
const validations = [
    body('first_name')
		.notEmpty()
		.withMessage('Tienes que escribir un nombre')
		.isLength({ min: 2 })
		.withMessage('Un mínimo de 2 caracteres'),
	body('last_name')
		.notEmpty()
		.withMessage('Tienes que escribir un apellido')
		.isLength({ min: 2 })
		.withMessage('Un mínimo de 2 caracteres'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password')
		.notEmpty()
		.withMessage('Tienes que escribir una contraseña')
		.isLength({ min: 8 })
		.withMessage('Contraseña inválida, mínimo de 8 caracteres'),
	body('repassword')
		.notEmpty()
		.withMessage('Tienes que escribir una contraseña').bail()
		.isLength({ min: 8 })
		.withMessage('Contraseña inválida, mínimo de 8 caracteres'),
		//.equals(body.password)        
		//.withMessage('No coniciden las contraseñas'),	
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.JPG', '.png', '.PNG', '.gif', '.GIF'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	})
]

/*** Formulario login usuario - Sequelize ***/
router.get('/login', guestMiddleware, usrsController.login ); //Funciona.
/*** Procesar el login usuario - Sequelize ***/
router.post('/login', usrsController.loginProcess);
/*** Logout de un usuario - Sequelize ***/
router.get('/logout', usrsController.logout);

/***Listado de usuarios - Sequelize ***/
router.get('/', usrsController.list)                // Listado de usuarios (restaría mejorar la vista/estilos) 

/*** Creación de usuario - Sequelize ***/
router.get('/create', guestMiddleware, usrsController.create);       // 2. /users/create (GET) Formulario de creación de producto
router.post('/create', uploadFile.single('image'), validations, usrsController.store);       // -> Usar con Multer // 4. /users/create (POST) Acción de creación (a donde se envía el formulario)

/*** Detalle de usuario - Sequelize***/ 
router.get('/:id', usrsController.detail);          // 3. /usrs/:id (GET) Detalle de un usuario.

/*** Edición de un usuario - Sequelize***/
router.get('/edit/:id', usrsController.edit);       // 5. /usrs/edit/:id (GET) Formulario de edición de Usuarios.
router.patch('/edit/:id', usrsController.update);        // 6. /usrs/:id (PATCH) Edición (a donde se envía el formulario).   

/*** Eliminar un usuario - Sequelize ***/ 
router.delete('/:id', usrsController.destroy);                          // 7. /products/:id (DELETE) Acción de borrado. 

module.exports = router