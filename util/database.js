const Sequelize  = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'goyaArman', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;