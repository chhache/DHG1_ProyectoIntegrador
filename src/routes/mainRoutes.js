const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const mainController = require('../controllers/mainController');

router.get('/', mainController.index );             //Funciona.

router.get('/register', mainController.register );  //Funciona.
router.post('/register', mainController.redirect);  //Funciona. Aparece un ? luego de apretar el boton.

router.get('/login', mainController.login );        //Funciona.
router.post('/login', mainController.redirect);     //Funciona. Aparece un ? luego de apretar el boton.

module.exports = router