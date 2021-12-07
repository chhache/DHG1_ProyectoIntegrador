const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

// CTRL + CLICK DERECHO...
//Se debe tipear en la URL /products ANTES~!

router.get('/productsList', productsController.index);              // 1. /products (GET) Listado de productos. OK, queda maquillar.
router.get('/create', productsController.adminCreate);              // 2. /products/create (GET) Formulario de creación de productos. OK, queda maquillar.
router.get('/:id', productsController.productDetail);               // 3. /products/:id (GET) Detalle de un producto particular. OK, queda maquillar.

router.post('/', productsController.store);                         // 4. /products (POST) Acción de creación (a donde se envía el formulario). !FALTA!

router.get('/:id/edit', productsController.edit);                   // 5. /products/:id/edit (GET) Formulario de edición de productos. OK, queda maquillar.
//router.put('/:id', productsController.update);                   // 6. /products/:id (PUT) Acción de edición (a donde se envía el formulario). !FALTA!

//router.delete('/:id', productsController.destroy);               // 7. /products/:id (DELETE) Acción de borrado. !FALTA!




router.get('/productCart', productsController.productCart);           // [No se muestra como corresponde.] 


module.exports = router;

