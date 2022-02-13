const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const path = require("path");

// ***************** Controller Require *******************
const productsController = require('../controllers/productsController');

const multer = require('multer'); // Para el file del form. + enctype + storage + uploadFile

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/images')
    },
    filename: function(req, file, cb){
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, fileName);
    }
})

const uploadFile = multer({storage: storage});

/*** Listado de producto ***/
router.get('/',productsController.list)         // 1. /products (GET) Listado de productos. OK, queda maquillar   

/*** Creación de producto ***/
router.get('/create', productsController.create);   // 2. /products/create (GET) Formulario de creación de producto
router.post('/', uploadFile.single('img1'), productsController.store); // -> Usar con Multer // 4. /products (POST) Acción de creación (a donde se envía el formulario)

/*** Detalle de un producto particular ***/ 
router.get('/:id', productsController.detail);   // 3. /products/:id (GET) Detalle de un producto particular. OK, queda maquillar.

/*** Edición de un producto ***/
router.get('/edit/:id', productsController.edit);       // 5. /products/edit/:id (GET) Formulario de edición de productos. OK, queda maquillar.
router.put('/:id', uploadFile.single('img1'), productsController.update);          // 6. /products/:id (PUT) Acción de edición (a donde se envía el formulario). !FALTA!   
       
/*** Comprar un prodcuto ***/
router.get('/productsCart', productsController.productCart);  // No se muestra como corresponde -> pendiente a revisar

/*** Eliminar un prodcuto ***/ 
router.delete('/:id', productsController.destroy);    // 7. /products/:id (DELETE) Acción de borrado. 

//Rutas CRUD -> Sprint 6


module.exports = router;

