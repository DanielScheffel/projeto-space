const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/UserModel')

const getUserById = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const createUserToken = require('../helpers/create-user-token')

module.exports = class UserController{

    static async register(req, res){
        const name = req.body.name
        const email = req.body.email
        const type = req.body.type
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        // validações
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        if(!email){
            res.status(422).json({messge: 'O email é obrigatório'})
            return
        }

        if(!type){
            res.status(422).json({message: 'Type é obrigatório'})
            return
        }

        if(!password){
            res.status(422).json({message: 'A senha é obrigatório'})
            return
        }

        if(!confirmPassword){
            res.status(422).json({message: 'A confirmação da senha é obrigatória'})
            return
        }

        if(password != confirmPassword){
            res.status(422).json({message: 'Senha e a confirmação precisam ser iguais'})
            return
        }

        // validação de usuário existente
        const UserExist = await User.findOne({email: email})

        if(!UserExist){
            res.status(422).json({message: 'Por favor, utilize outro email'})
            return
        }

        // create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create user
        const user = new User({
            name: name,
            email: email,
            type: type,
            password: passwordHash,
        })

        try{
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch(err){
            res.status(500).json({message:  err})
        }
    }

    static async login(req, res){
        const email = req.body.email
        const password = req.body.password

        if(!email){
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }

        if(!password){
            res.status(422).json({message: 'A senha é obrigatório'})
            return
        }

        const user = await User.findOne({message: email})

        if(!user){
            return res.status(422).json({message: 'Não há usuário cadastrado com este email'})
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return res.status(422).json({message: 'Senha inválida'})
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser

        console.log(req.headers.authorization)

        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        } else{
            currentUser = null
        }

        res.status(422).send(currentUser)
    }

    static async getUserById(req, res){
        const id = req.params.id

        const user = await User.findById(id)

        if(!user){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.staus(200).json({user})
    }

}

module.exports = UserController