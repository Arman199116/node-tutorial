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
    })
    .catch(err => console.log('err ', err))

    const product = new Product(null, title, imageUrl, price, description);
    product.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log('err ', err));

}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
        return;
    }

    const prodId = req.params.productId;

    Product.findById(prodId, product => {
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

}

exports.postEditProduct = (req, res, next) => {
    const {productId, title, imageUrl, price, description} = req.body;
    const updatedProduct = new Product(productId, title, imageUrl, price, description);

    updatedProduct.save();
    res.redirect('/admin/products');
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
    Product.deleteById(prodId);
    res.redirect('products');
}