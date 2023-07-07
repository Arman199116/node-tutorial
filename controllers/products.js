const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product',
        roductCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res, next) => {
    console.log('req.body ', req.body);

    const product = new Product(req.body.title);
    product.save();

    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
    });
}