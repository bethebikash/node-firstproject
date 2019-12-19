const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

function validator(req, res, next) {
    if (req.body.username === '') {
        res.json({ status: 400, message: 'Username is required!' })
    } else if (req.body.password === '') {
        res.json({ status: 400, message: 'Password is required!' })
    } else {
        // next()
        User.findOne({
            where: { username: req.body.username }
        }).then(result => {
            if (result === null) {
                res.status(404)
                res.json({
                    status: 404,
                    message: 'You are not registered yet!'
                })
            } else {
                console.log(result)
                next()
            }
        })
    }
}

function passwordCheck(req, res, next) {
    User.findOne({
        where: { username: req.body.username }
    }).then(result => {
        bcrypt
            .compare(req.body.password, result.dataValues.password)
            .then(result => {
                if (result === true) {
                    next()
                    // res.json({ status: 200, message: 'Login successful' })
                } else {
                    res.json({ status: 409, message: 'Password incorrect' })
                }
            })
    })
}

function genToken(req, res, next) {
    //token for each pers
    const myPayload = {
        username: req.body.username,
        userLevel: 'superadmin'
    }

    jwt.sign(myPayload, 'key', { expiresIn: '10h' }, function(err, token) {
        // console.log(err)
        // console.log(resultToken)
        res.json({ userToken: token })
    })
}

function verifyToken(req, res, next) {

    const token = req.headers.authorization.slice(7,req.headers.authorization.length)
   
    jwt.verify(token, 'key', function(err, decoded) {
        if (err) {
            console.log(err.message)
        } else {
            next()
        }
    })
}

module.exports = {
    validator,
    passwordCheck,
    genToken,
    verifyToken
}
