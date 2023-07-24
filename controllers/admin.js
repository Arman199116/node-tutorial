const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;

    Product.create({
        title,
        imageUrl,
        price,
        description
    })
        .then(result => {
            console.log('Created product');
            res.redirect('/admin/products');
        })
        .catch(err => console.log('err111 ', err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
        return;
    }

    const prodId = req.params.productId;

    Product.findByPk(prodId)
        .then(product => {
            if (!product) {
                res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: "Edit Product",
                path: '/admin/edit-product',
                editing: editMode,
                product
            })

        })
        .catch(err => console.log('ERROr ', err));
}

exports.postEditProduct = (req, res, next) => {
    const {productId, title, imageUrl, price, description} = req.body;

    Product.findByPk(productId)
        .then(product => {
            product.title = title;
            product.imageUrl = imageUrl;
            product.price = price;
            product.description = description;

            return product.save();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log('ERROr ', err));

}

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log('Err1 ', err));
}

exports.postDeleteProducts = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('Destroyed product');;
            res.redirect('/admin/products');
        })
        .catch(err => console.log('ERROr ', err));
}