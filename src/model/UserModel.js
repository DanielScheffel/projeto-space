const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        require: true,
    },

    email: {
        type: DataTypes.STRING,
        require: true,
    },

    password: {
        type: DataTypes.STRING,
        require: true,
    },

    type: {
        type: DataTypes.STRING,
        require: true
    }
})

module.exports = User