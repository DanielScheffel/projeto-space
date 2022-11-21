const jwt = require('jsonwebtoken')

const createUSerToken = async (user, req, res) => {
    const token = jwt.sign(
    {
        name: user.name,
        id: user._id,
    },
    "nossosecret"
    );

    res.status(200).json({
        message: 'Voce está autenticado!',
        token: token,
        userId: user._id,
    });
}

module.exports = createUSerToken;