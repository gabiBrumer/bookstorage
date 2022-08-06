const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    store: async (req, res) => {
        try{
            const { name, email, senha } = req.body;

        const hash = bcrypt.hashSync(senha, 10);

        const user = await User.create({
            name,
            email,
            senha: hash
        })
        return res.status(201).json(user);
        } catch(error) {
            console.log(error)
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({where: {email}});

        if(!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({message: "Não foi possível, realizar o login"})
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, 
            process.env.JWT_KEY,
        {
            expiressIn: "1h"
        })
        
        return res.status(200).json({message: "Auth sucsess!", token})
    }
}

module.exports = authController;