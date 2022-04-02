const path = require('path');
const fs = require('fs');
const db = require('../database/models'); 				// Requerimos el dir donde almacenamos los modelos
const sequelize = db.sequelize							// Requerimos sequlize
const {Op} = require('sequelize') 						// Constante para requerir Operadores de sequelize

//* Requerir path y parsear JSON */
//const productsFilePath = path.join(__dirname, '../data/products.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
	//* Test consola */
	//res.send('se ejecuto el controlador por GET');
	//res.render('admin/createForm');
	//* FIN */

		//* Completar SELECT Categories de la vista */
		//db.Category.findAll()                  			// Busca todos los géneros del modelo,select de la vista -> const sequilize (metodo de sequelize -> create, findAll, findByPk etc)
		//	.then(function(categories){         		// Captura la promesa (se va a cumplir en algún momento) que recibe la variable generos
		//		res.render("createForm", {categories}); // Renderiza en la vista todos los generos, pasando un objeto literal -> clave:valor = genres:genres (cdo se repite clave:valor no es mandatory escribir ambos nombres)  
		//	})
		//* FIN */

		//* Completar SELECT Genres de la vista */
		db.Genre.findAll()                  			// Busca todos los géneros del modelo,select de la vista -> const sequilize (metodo de sequelize -> create, findAll, findByPk etc)
            .then(genres => {         			// Captura la promesa (se va a cumplir en algún momento) que recibe la variable generos
				db.Brand.findAll()
					.then(brands => {
						db.Type.findAll()
							.then(types =>{
								db.Category.findAll()
									.then(categories =>{
										res.render("createForm", {genres, brands, types, categories}); 	// Renderiza en la vista todos los generos, pasando un objeto literal -> clave:valor = genres:genres (cdo se repite clave:valor no es mandatory escribir ambos nombres)  	
									})	
							})						
					})				
            })
		//* FIN */		    
	},
	
	store: (req, res) => {
		/* BD JSON */
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
		/* FIN */

		db.Product.create({
			...req.body,															// Spread operator		
			image1: req.file == undefined ? 'default-image.png': req.file.filename, // If Ternario ? si es undifined -> defaul.png SiNo -> 
			image2: req.file == undefined ? 'default-image.png': req.file.filename,
			image3: req.file == undefined ? 'default-image.png': req.file.filename,
			image4: req.file == undefined ? 'default-image.png': req.file.filename
			})        																// Del modelo Movie, usamos el método create y recibimos .body que viaja por POST, podría armarse un objeto literal con las claves de cada campo, en este caso se llaman igual por ello podemos pasar todo el .body (name = columnas tabla origen) -> name: req.body.formularioName
    	    .then(() => {              												// Callback para redireccinar la vista
				res.redirect('/')													// realizado lo anterior, la promesa redirije a /products
			});											 
				
		//res.redirect("/products");
	},
	detail: (req,res) => {
		//* BD JSON */
        // let idProducto = req.params.id //id se refiere al :id
		//res.send(req.params.id);
        // const productoMostrar = products.find(el => el.id == idProducto); 
		//res.send({productos: productosMostrar});
        // res.render('products/detail', {productos: productoMostrar});
		//* FIN */
		db.Product.findByPk(req.params.id)					// Buscar el producto por el ID que recibe por URL-> select id.product from products where id like 'id.buscado'
			.then(product => {								// captura la promesa y devuelve el producto que cumple 
				//res.send({product})						// test -> Objeto Literal product:product		
				res.render('detail.ejs', {product});		// filttrado por ID, remite el obj -> clave:valor product	
			})
    },
    edit: (req, res) => {		
		//*** BD JSON ***/
		// let idProduct = req.params.id;
		// let productoAMostrar = products.find(el => el.id == idProduct);
		// res.render("modifForm", {productToEdit: productoAMostrar})
		// *** FIN ***//

		// *** Relaciones varias del modelo *** //
		db.Product.findByPk(req.params.id, {							// Buscar el producto por el ID que recibe por URL-> select id.product from products where id like 'id.buscado'
			//include: {all: true,nested: true}
			include: [
				{
					association:'genre'
				},
				{
					association:'brand'
				},
				{
					association:'type'
				},
				{
					association:'category'
				}
			]
		})

			.then(productToEdit => {
				//return res.json(productToEdit)						// Todas las
				db.Genre.findAll()										// captura la promesa y busca todos los géneros
				.then((genres) =>{										// captura  la promesa
					db.Brand.findAll()
					.then(brands => {
						//res.render('modifForm', {productToEdit, genres, brands})	// renderiza la vista con los products y los géneros	
						db.Type.findAll()
						.then(types => {
							db.Category.findAll()
								.then(categories => {
									res.render('modifForm', {productToEdit, genres, brands, types, categories})	// renderiza la vista con los products y los géneros	
							})
							//res.render('modifForm', {productToEdit, genres, brands, types})	// renderiza la vista con los products y los géneros	
						})					
					})						
				})				
			})	
	},							
			
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
			// 	.then(productToEdit => {							// captura la promesa y devuelve el producto que cumple 
			// 	//res.send({productToEdit})						// test -> Objeto Literal product:product		
			// 	res.render('modifForm', {productToEdit});			// filttrado por ID, remite el obj -> clave:valor product	
			// })	

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

	sale: (req,res) => {
        db.Product.findAll()
            .then(products =>{
                //res.send(products)
                res.render('productsListSale.ejs', {products})
            })
    },
	
	search: (req,res) => {                                          // Método search   
        if(req.query.name){                                         // Recibe de un callback como parámetro el titulo de la película a través de un Query String  por URL -> ?
            db.Product                                              // El Callback conecta al modelo Product
        		.findAll({                                          // Busca todos los productos   
            		where: {                                        // Que conicidan con lo recibido por POST (método asíncrono recibido por Form)  
                		name: {                                     // El campo name 
                    		[Op.like]: '%' + req.query.name + '%'   // "like" = % palabraBuscar % -> usa wilcards para completar los caracteres  
                		} 
            		}    
        		})    
        .then(products => {                                                 // Recibe de la promesa la movie a buscar
           if(products.length > 0) { 
			   //res.send('Soy searhc POST')                                       // Si el array de objetos es > a 0 (osea existen movies)  
               res.render('productsList', {products})                        // Si es true ->   renderiza movieList.ejs con el clave:valor resultante de la consulta {movie:movie}
			}else{     
				//res.send('Sin coincidencias')                                // Sino existe en la BD local o externa (consultada a traves de API con fetch) 
				res.render('productsList', {products: []})                     // Renderizar la vista -> moviesList.ejs sin valor (misma lógica anterior pero pasar un array vacio)                   
				}            
			})
		}	         
	}, 
	
		//   } else {                                                         // Si es false  
        //        fetch('http://www.omdbapi.com/?apikey=d4e35e92&t=' + req.query.titulo) //  Ir a buscar: www.site.com -> promesa en un .then (devuelve la respuesta de la petición), Esa petición tambien es una promesa, por ello vamos a pedir que esa respuesta sea, procesada en un formato json ( a traves de otro then)    
        //        .then(movie => {                                           // En el 2° .then puedo trabajar con la información que llega de la API, idem lógica anterior {movie:movie}
        //             res.render('moviesDetailOmdb', {movie})
        //        })
           		

	cart: (req,res) =>{
		res.render('underconstruction');
        //res.render('/');
    } 	
}

module.exports = productsController