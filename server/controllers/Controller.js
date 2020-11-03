const {User} = require('../models/index');
const {generateHashPassword, verifyPassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt');

class Controller {
    static async register(req, res, next) {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: generateHashPassword(req.body.password)
        }
        try {
            const user = await User.create(data, {returning: true})
            res.status(201).json({id: user.id, name: user.name, email: user.email})
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        const dataUser = req.body
        try {
            const user = await User.findOne({
                where: {
                    email: dataUser.email
                }
            })
            if(!user) {
                next({name:"Unauthorized", msg: "Email or Password wrong"})
                return
            }
            const checkPassword = verifyPassword(dataUser.password, user.password)
            if(!checkPassword) {
                next({name:"Unauthorized", msg: "Email or Password wrong"})
                return
            }
            const access_token = generateToken({
                id: user.id, name: user.name, email: user.email
            })
            res.status(200).json({access_token})
            
        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req, res) {}
}

module.exports = Controller