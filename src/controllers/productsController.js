const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const listadoProductos = function () {
    let listadoJson = fs.readFileSync(path.resolve(__dirname, '../data/products.json'),'utf-8');
    return JSON.parse(listadoJson)
}


const productsController ={

    index: function (req,res){
        res.render('products/productsList', {producto: listadoProductos})
    },

    productDetail: function (req,res){
        let id = req.params.id //id se refiere al :id
        const productoListado = listadoProductos() //traigo de nuevo el listado
        let productoId = productoListado.find(el => el.id == id) //busco un solo elemento del array que tenga el id
        res.render('products/productDetail', {productoId})
    },

    productCart: function (req,res){
        res.render('products/productCart');
    },

    store: (req, res) => {
	
		let newId = products[products.length-1].id + 1; //accedes al id del ultimo elemento (0 no existiria) y le sumas 1 para los nuevos productos

		let newProduct = {
			id: newId,
			 ...req.body,   //Spred operator, si hay OL toma c propiedad y valor.. y los SEPARA.
			 // image: req.file == undefined ? "default-image.png" : req.file.filename // Debe haber si no no se muestra nada.
		};  
		products.push(newProduct);

		let productsJSON = JSON.stringify(products, null, 2); //para que no quede todo en una linea.
		fs.writeFileSync(productsFilePath, productsJSON);

		res.redirect("/products");
	},

    edit: (req, res) => {
		let idProduct = req.params.id;
		let productoAMostrar = products.find(producto => producto.id == idProduct);
		res.render("admin/modifForm", {producto: productoAMostrar})
	},

    update: (req, res) => {

		let idProduct = req.params.id;

		let productoAModificar = products.map(producto => {    //retorna nuevo array con elemtnos modificados
			if (producto.id == idProduct) {
				return producto = {
					id: id,
					...req.body,
					image: req.file == undefined ? producto.image : req.file.filename    //image siempre x fuera del body. Ya tenemos datos aca.
				}
			}
			return producto
		})
		

		let productsJSON = JSON.stringify(products, null, 2); //para que no quede todo en una linea. Stringy porque lo de arriba esta en formatojson (OL)
		fs.writeFileSync(productsFilePath, productsJSON);

		res.redirect("/products");
	
	},

    destroy : (req, res) => {
		let idProduct = req.params.id;
		let productoEliminar = products.find(producto => producto.id == idProduct);
		res.render('products', {productsToDelete: productoEliminar})
	},


    adminCreate: function(req,res){
        res.render('admin/createForm')
    },


}






module.exports = productsController