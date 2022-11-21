const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbprojetofinal'
})

con.connect()

module.exports = con