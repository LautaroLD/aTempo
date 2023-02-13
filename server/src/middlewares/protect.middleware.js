const jwt =  require('jsonwebtoken')
const { User } = require("../database/models");

const protectRouters = async (req, res, next) => {
    try {
        let token = ''

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        const secret = process.env.SECRET
        const decoded = jwt.verify(token, secret)

        const user = await User.findOne({ where: { id: decoded.user.id } })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        next()

    } catch (error) {
        res.status(400).json(({ message: (error.message) }))
    }
}

module.exports = protectRouters