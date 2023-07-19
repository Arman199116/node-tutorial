const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');
const db = require('./util/database');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
let cors = require('cors');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());

app.use(cors());

db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result[0]);
    })
    .catch(err => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static( path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000);

