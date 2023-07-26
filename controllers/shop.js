const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/products-list', {
                prods: products,
                pageTitle: 'All product',
                path: '/products'
            });
        })
        .catch(err => console.log('Err1 ', err));
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            })

        })
        .catch(err => console.log('ERROr ', err));
}

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log('Err ', err));
}

exports.postOrder = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            return order.addProducts(products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product;
            }))
        })
        .catch(err => console.log('ErRr ', err))
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log('ErR ', err))
}

exports.getOrders = (req, res, next) => {
    res.render('shop/order', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
                    .then(products => {
                        res.render('shop/cart', {
                            path: '/cart',
                            pageTitle: 'Your Cart',
                            products
                        });
                    })
                    .catch(err => console.log('eerr ', err));
    })
    .catch(err => console.log('ErR ', err))
}

exports.postCart = (req, res, next) => {

    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;

    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: { id: prodId}})
    })
    .then(products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }

        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }

        return Product.findByPk(prodId);
    })
    .then(product => {
        return fetchedCart.addProduct(product, { through: { quantity: newQuantity}});
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => console.log('err1 ', err));
}

exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: { id: prodId}})
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log('err2 ', err))
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}