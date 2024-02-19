const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const User = require('../models/user')

module.exports = {
    generateToken: (user) => {
        delete user.password
        return jwt.sign({user: user._id}, JWT_SECRET, {expiresIn: 86400})
    },
    authToken: async (req, res, next) => {
        const token = req.get('authToken')
        if (!token) return res.status(401).send({msg: "Not autorized"})
        jwt.verify(token, JWT_SECRET, async (err, payload) => {
            if (err) {
                return res.status(401).send({msg: "Token not valid"})
            }
            let dateNow = new Date()
            if (payload.exp < dateNow.getTime() / 1000) {
                return res.status(401).send({msg: "Token expired"})
            }
            req.user = await User.findById(payload.user)
            next()
        })
    },
}