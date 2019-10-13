const Sequelize = require('sequelize');
const db = require('../db');

const { Model } = Sequelize;

class Band extends Model{

};

Band.init({
    bid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    rating: Sequelize.INTEGER,
    origin: Sequelize.STRING
},{
    sequelize: db,
    modelName: 'bands'
})

module.exports = Band;