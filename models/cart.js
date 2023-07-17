const fs = require('fs');
const path = require('path');
const folder = require('../util/path');
const p = path.join(folder, 'data', 'cart.json');

module.exports = class Cart {
    constructor() {
        this.products = [];
        this.price = 0;
    }

    static addProduct(id, productPrice) {
        // fetch
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err && fileContent?.length) {
                cart = JSON.parse(fileContent);
            }
            //
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = existingProductIndex != -1 ? cart.products[existingProductIndex] : null;
            let updatingProduct;
            if (existingProduct) {
                updatingProduct = { ...existingProduct};
                updatingProduct.qty = +updatingProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatingProduct;
            } else {
                updatingProduct = {id, qty: 1};
                cart.products = [...cart.products, updatingProduct];
            }
            cart.totalPrice = +cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log("err ", err);
            });
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice -= productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log("err ", err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb(null);
            } else {
                const cart = JSON.parse(fileContent);
                cb(cart);
            }
        });
    }
}