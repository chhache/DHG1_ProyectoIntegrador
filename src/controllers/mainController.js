const path = require('path');
const fs = require('fs');


const mainController = {

    index: function (req,res){
        res.render('index', {producto: listadoProductos})
    },

    register: function (req,res){
        res.render('users/register')
    },

    login:function (req,res){
        res.render('users/login')
    },
    
    redirect:function(req,res){
        res.redirect('index')
    },
    
}

//Funcion para transofmar el archivo JSON 
const listadoProductos = function () {
    let listadoJson = fs.readFileSync(path.resolve(__dirname, '../data/products.json'),'utf-8');
    return JSON.parse(listadoJson)
  }

module.exports = mainController