const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const path = require("path");

// ***************** Controller Require *******************
const productsController = require('../controllers/productsController');

const multer = require('multer'); // Para el file del form. + enctype + storage + uploadFile

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/images/users')
    },
    filename: function(req, file, cb){
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, fileName);
    }
})

const uploadFile = multer({storage: storage});


// CTRL + CLICK DERECHO... -> Se debe tipear en la URL /products ANTES~!

/*** GET ALL PRODUCTS ***/ 
//router.get('/productsList', productsController.index);  
router.get('/',productsController.index)         // 1. /products (GET) Listado de productos. OK, queda maquillar. (OK)   

// /*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);   // 2. /products/create (GET) Formulario de creación de productos. (OK)
//router.post('/', upload.single('img1'), productsController.store); // 4. /products (POST) Acción de creación (a donde se envía el formulario). (OK)
router.post('/', uploadFile.single('img1'), productsController.store); // -> Usar con Multer

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail);   // 3. /products/:id (GET) Detalle de un producto particular. OK, queda maquillar.

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);       // 5. /products/edit/:id (GET) Formulario de edición de productos. OK, queda maquillar.
router.put('/:id', upload.single('img1'), productsController.update);          // 6. /products/:id (PUT) Acción de edición (a donde se envía el formulario). !FALTA!   
       
/*** BUY ONE PRoDUCT ***/
router.get('/productsCart', productsController.productCart);  // [No se muestra como corresponde.] 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy);    // 7. /products/:id (DELETE) Acción de borrado. !FALTA!


module.exports = router;

