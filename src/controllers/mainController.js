const path = require('path')

const mainController = {
    index: function (req,res){
        res.render('index')
    },
    register: function (req,res){
        res.render('register')
    },
    productDetail: function (req,res){
        res.render('productDetail')
    },
    productCart:function (req,res){
        res.render('productCart')
    },
    login:function (req,res){
        res.render('login')
    },
    redirect:function(req,res){
        res.render('index')
    }
}

module.exports = mainController