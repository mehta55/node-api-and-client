const Sequelize = require('sequelize');
const db = require('../db');
const Band = require('./band');

const { Model } = Sequelize;

class User extends Model {

};

User.init({
    uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    organization: Sequelize.STRING,
    dob: Sequelize.STRING,
    otp: Sequelize.INTEGER
},{
    sequelize: db,
    modelName: 'users' 
});

User.hasMany(Band);

module.exports = User;