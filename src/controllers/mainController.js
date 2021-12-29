const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: function (req,res){
        res.render('index', {producto: products})
    },

    // register: function (req,res){
    //     res.render('users/register')
    // },

    // login:function (req,res){
    //     res.render('users/login')
    // },
    
    redirect: (req,res) => {
        res.redirect('index')
    },    
}

module.exports = mainController