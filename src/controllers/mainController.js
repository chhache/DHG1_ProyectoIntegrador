const path = require('path')

const mainController = {
    index: function (req,res){
        res.render('index')
    },
    register: function (req,res){
        res.render('users/register')
    },
    productDetail: function (req,res){
        res.render('products/productDetail')
    },
    productCart:function (req,res){
        res.render('products/productCart')
    },
    login:function (req,res){
        res.render('users/login')
    },
    redirect:function(req,res){
        res.render('index')
    }
}

module.exports = mainController