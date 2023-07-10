const fs = require('fs');
const path = require('path');
const folder = require('../util/path');
const p = path.join(folder, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err || !data?.length) {
            cb([]);
        } else {
            cb(JSON.parse(data));
        }
    })
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }
    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                if (err) {
                    console.log(err);
                }
            })
        })
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}