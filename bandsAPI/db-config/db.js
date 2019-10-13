const Sequelize = require('sequelize');


const db = new Sequelize('bandsdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5
    }
})

module.exports = db;