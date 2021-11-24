const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/', mainController.index );
router.get('/register', mainController.register );
router.get('/productDetail', mainController.productDetail );
router.get('/productCart', mainController.productCart );
router.get('/login', mainController.login );
router.post('/register', mainController.redirect );

module.exports = router