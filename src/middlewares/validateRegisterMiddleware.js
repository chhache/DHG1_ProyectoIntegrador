const path = require('path');
const { body } = require('express-validator');

module.exports = [
	// body('fullName').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('firstName')
		.notEmpty()
		.withMessage('Tienes que escribir un nombre')
		.isLength({ min: 2 })
		.withMessage('Un mínimo de 2 caracteres'),
	body('lastName')
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
		.withMessage('Contraseña inválida, mínimo de 8 caracteres');
		//.equals(body.password)
		//.compareSync(body.password)
		//.withMessage('No coniciden las contraseñas'),	
	// body('country').notEmpty().withMessage('Tienes que elegir un país'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

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