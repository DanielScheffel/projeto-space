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

app.get('/', (req, res) => {
    res.send('main')
})

// incluindo o engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true,
    })
);

//Selecionando a tabela do banco usuario
app.get('/usuario', (req, res) => {
    con.query('SELECT * FROM usuario', (err, result) => {
        console.log(result);
        res.send(result)
    })
})
// criando novo usuário
app.post('/usuario/create', (req, res) => {
    con.query(`insert into usuario (nome, email, senha) values ("${req.body.nome}", "${req.body.email}", "${req.body.senha}")`, (err, result) => {
        // console.log(result);
        res.send(result)
    })
})
// Selecionando a tabela do banco adminstrador
app.get('/admin', (req, res) => {
    con.query('SELECT * FROM adminstrador', (err, result) => {
        console.log(result)
        res.send(result)
    })
})

// criando novo admin
app.post('/usuario/admin/create', (req, res) => {
    con.query(`insert into adminstrador (nome, email, senha) values ("${req.body.nome}", "${req.body.email}", "${req.body.senha}")`, (err, result) => {
        res.send(result)
    })
})

// Selecionando a tabela do banco adminstrador
app.get('/video', (req, res) => {
    con.query('SELECT * FROM videos', (err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.post('/video', (req, res) => {
    con.query(`insert into videos(nome, video) values ("${req.body.nome}", "${req.body.video}")`, (err, result) => {
        // console.log(result);
        res.send(result)
    })
})

// Página de Inicio 
app.get('/inicio', (req, res) => {
    res.render('inicio')
})


//Inicializando a porta que o app irá rodar
app.listen('8080', () => {
    console.log('Aplicação rodando na porta 8080!');
})