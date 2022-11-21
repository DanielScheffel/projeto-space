const express = require('express')
const exphbs = require('express-handlebars')
const con = require('./src/database/connection')


const path = require('path')

const app = express()

//Recebendo as rotas de usuário
const UserRoutes = require('./src/routes/UserRoutes')

const basePath = path.join(__dirname, 'layouts')

app.use(express.json())

app.use(express.static('public'))

// incluindo o engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true,
    })
);

//Selecionando a tabela do banco
app.get('/usuario', (req, res) => {
    con.query('SELECT * FROM adminstrador', (err, result) => {
        res.send(result)
    })
})

//Inicializando a porta que o app irá rodar
app.listen('8080', () => {
    console.log('Aplicação rodando na porta 8080!');
})