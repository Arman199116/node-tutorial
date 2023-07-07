const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');


const app = express();
var cors = require('cors');
const errorController = require('./controllers/error');
app.use(express.json());

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static( path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000);

