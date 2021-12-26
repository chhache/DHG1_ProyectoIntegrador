const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const path = require("path");

const usersController = require('../controllers/usersController');


/*** Listado de usuarios ***/
router.get('/',usersController.index) 

router.get('/:id',usersController.detail) 



module.exports = router