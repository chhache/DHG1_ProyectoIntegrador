const path = require('path');
const fs = require('fs');


const mainController = {
    index: function (req,res){
        res.render('index')
    },
    register: function (req,res){
        res.render('users/register')
    },
    productDetail: function (req,res){
        let id = req.params.id //id se refiere al :id
        const productoListado = listadoProductos() //traigo de nuevo el listado
        let productoId = productoListado.find(el => el.id == id) //busco un solo elemento del array que tenga el id
        res.render('products/productDetail', {productoId})
    },
    productCart:function (req,res){
        res.render('products/productCart')
    },
    login:function (req,res){
        res.render('users/login')
    },
    redirect:function(req,res){
        res.render('index')
    },
    admin: function(req,res){
        res.render('admin/createForm')
    }
}

//Funcion para transofmar el archivo JSON 
const listadoProductos = function () {
    let listadoJson = fs.readFileSync(path.resolve(__dirname, '../db/listadoProductos.json'),'utf-8');
    return JSON.parse(listadoJson)
  }

module.exports = mainController