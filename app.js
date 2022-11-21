const express = require('express')
const sequelize = require('./src/database/connection')
const { Sequelize } = require('./src/database/connectionj')

const app = express()

app.use(express.json())

app.use(express.static('public'))

//Inicializando a porta que o app irá rodar
app.listen('8080', () => {
    console.log('Aplicação rodando na porta 8080!');
})