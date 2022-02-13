const path = require('path');
const fs = require('fs');
const db = require('../database/models'); 				// Requerimos el dir donde almacenamos los modelos
const sequelize = db.sequelize							// Requrimos sequlize
const {Op} = require('sequelize') 						// Constante para requerir Operadores de sequelize

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Llamamos a los modelos creados
const Products = db.Product;
const Genres = db.Genre;
const Users = db.User;

const productsController = {
    list: (req,res) => {
		// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // //res.send(products)
		// res.render('productsList', {productos: products});
		db.Product.findAll()								// Buscamos todos los productos con findAll -> método de sequlize
			.then(products =>{								// .then toma la promesa y recibe la variable products
				//res.send(products)
				res.render('productsList.ejs', {products})	 // Renderizamos la vista productList -> products:products (clave:valor)
			})
    },
	create: (req,res) => {
		//res.send('se ejecuto el controlador por GET');
		res.render('admin/createForm');
		
	//	db.Product.create(req.body)        // Del modelo Movie, usamos el método create y recibimos .body que viaja por POST, podría armarse un objeto literal con las claves de cada campo, en este caso se llaman igual por ello podemos pasar todo el .body (name = columnas tabla origen) -> name: req.body.formularioName
    //        .then(() => {              // Callback para redireccinar la vista
    //            res.redirect('/products')}); // realizado lo anterior, la promesa redirije a /products    
	},
	// Create method to store
	store: (req, res) => {
		//res.send('se ejecuto el controlador que guarda JSON') // Validación del Form
		//res.json(req.body);
		//return res.json(req.file);
		//accedes al id del ultimo elemento (0 no existiria) y le sumas 1 para los nuevos productos
		//let newID = products[products.length-1].id + 1; 
		//let newProduct = {						
		// 	id:newID,			
		// 	...req.body, //Spred operator, si hay OL toma c propiedad y valor.. y los SEPARA.
		// 	img1: req.file == undefined ? 'default-image.png': req.file.filename // if ternario 
		// }	
		// products.push(newProduct);
		// let productsJSON = JSON.stringify(products, null, 2); //para que no quede todo en una linea.
		// fs.writeFileSync(productsFilePath, productsJSON);
		//res.redirect("/products"); // falta view productList.ejs

		db.Product.create(req.body)        // Del modelo Movie, usamos el método create y recibimos .body que viaja por POST, podría armarse un objeto literal con las claves de cada campo, en este caso se llaman igual por ello podemos pasar todo el .body (name = columnas tabla origen) -> name: req.body.formularioName
    	    .then(() => {              // Callback para redireccinar la vista
				res.redirect('/products')}); // realizado lo anterior, la promesa redirije a /products
				
		//res.redirect("/products");
	},
	detail: (req,res) => {
        // let idProducto = req.params.id //id se refiere al :id
		//res.send(req.params.id);
        // const productoMostrar = products.find(el => el.id == idProducto); 
		//res.send({productos: productosMostrar});
        // res.render('products/detail', {productos: productoMostrar});
		db.Product.findByPk(req.params.id)					// Buscar el producto por el ID que recibe por URL-> select id.product from products where id like 'id.buscado'
			.then(product => {								// captura la promesa y devuelve el producto que cumple 
				//res.send({product})						// test -> Objeto Literal product:product		
				res.render('detail.ejs', {product});		// filttrado por ID, remite el obj -> clave:valor product	
			})
    },
    edit: (req, res) => {
		// let idProduct = req.params.id;
		// let productoAMostrar = products.find(el => el.id == idProduct);
		// res.render("modifForm", {productToEdit: productoAMostrar})
		
		// *** Relacion -> genre ***
		db.Product.findByPk(req.params.id, {				// Buscar el producto por el ID que recibe por URL-> select id.product from products where id like 'id.buscado'
			include: [{association:'genre'}]				// Incluye relacion por su alias
		})		
			.then(productToEdit => {
				db.Genre.findAll()								// captura la promesa y busca todos los géneros
				.then(genres =>{								// captura  la promesa 
					res.render('modifForm', {productToEdit, genres})	// renderiza la vista con los products y los géneros
				})
			})
		// *** Relaciones -> genre, brand ***	
		// db.Product.findByPk(req.params.id, {				// Buscar el producto por el ID que recibe por URL-> select id.product from products where id like 'id.buscado'
		// 	include: [{association:'genre'}, {association: 'brand'}]				// Incluye relacion por su alias
		// })		
		// 	.then(productToEdit => {
		// 		db.Genre.findAll()								// captura la promesa y busca todos los géneros
		// 		.then(genres, brands =>{								// captura  la promesa 
		// 			res.render('modifForm', {productToEdit, genres, brands})	// renderiza la vista con los products y los géneros
		// 		})
		// 	})
		// *** FIN ***

		// db.Product.findByPk(req.params.id, {				// Buscar el producto por el ID que recibe por URL-> select id.product from products where id like 'id.buscado'
		// 	include: [{association:'brand'}]				// Incluye relacion por su alias
		// })
		// 	.then(productToEdit => {
		// 		db.Brand.findAll()								// captura la promesa y busca todos los géneros
		// 		.then(brands =>{								// captura  la promesa 
		// 			res.render('modifForm', {productToEdit, brands})	// renderiza la vista con los products y los géneros
		// 		})
		// 	})

			// 	.then(productToEdit => {							// captura la promesa y devuelve el producto que cumple 
			// 	//res.send({productToEdit})						// test -> Objeto Literal product:product		
			// 	res.render('modifForm', {productToEdit});			// filttrado por ID, remite el obj -> clave:valor product	
			// })
		.catch(console.error)	
	},

    update: (req, res) => {
		// let id = req.params.id;
		// let modifiedProducts = products.map(element => {    //retorna nuevo array con elemtnos modificados
		// 	if (element.id == id) {
		// 		return element = {
		// 			id:id,
		// 			...req.body,					
		// 			img1: req.file == undefined ? element.img1 : req.file.filename //image siempre x fuera del body. Ya tenemos datos aca.				
		// 		}
		// 	}
		// 	return element //el .map siempre necesita que se retorne el elemetno 
		// })	
		// let productsJSON = JSON.stringify(modifiedProducts, null, 2); //para que no quede todo en una linea. Stringy porque lo de arriba esta en formatojson (OL)
		// fs.writeFileSync(productsFilePath, productsJSON);
		// //res.send(productsJSON);
		// res.redirect("/products");
		db.Product.update(req.body, {       		// Actualizamos los campos del form (viaja por POST)
            where: {                        		
                id:req.params.id					// Condicional -> coincida el ID con el ID que viaja por URL
            }
        })
            .then(product =>{
                res.redirect('/products')
            })
		
	},	    
    destroy : (req, res) => {
		// let id = req.params.id;
		// let productoAEliminar = products.find(el => el.id == id);
		// let newsProducts = products.filter((el) => el.id !== productoAEliminar.id); 			
		
		// //res.send(newsProducts);  
		// let productsJSON = JSON.stringify(newsProducts, null, 2); //para que no quede todo en una linea. Stringy porque lo de arriba esta en formatojson (OL)
		// fs.writeFileSync(productsFilePath, productsJSON);
		// //res.send(productsJSON);
		// res.redirect("/products");

		// *** Sequelize ***
		db.Product.findByPk(req.params.id)  				// Con Where es más atómico
			.then((product) => {	
				product.destroy()								// método .destroy de sequelize								
					.then(()=> {
						res.redirect('/products')				// redirecciona a /products
					})
			})
	},
	productCart: (req,res) =>{
		//res.send(products)
        res.render('productsCart');
    } 	
};

module.exports = productsController