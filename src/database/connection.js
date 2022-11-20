const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('projeto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

try{
    sequelize.authenticate()
    console.log('Conectado com Sequelize!');
} catch(err){
    console.error('Não foi possível conectar com Sequelize!', err)
};