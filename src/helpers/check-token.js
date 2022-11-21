const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split[' '](1);

    if(!token) return res.status(401).json({message: 'Acesso negado!'})

    try{
        const verify = jwt.verify(token, "nossosecret")
        req.user = verify;
        next();
    } catch(err){
        res.status(422).json({message: 'Token inválido!'})
    }
};

module.exports = checkToken;