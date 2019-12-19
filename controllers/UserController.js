const bcrypt = require('bcrypt')
const User = require('../models/User')

function validator(req, res, next) {
    if (req.body.username === '') {
        res.json({ status: 400, message: 'Username is required!' })
    } else if (req.body.password === '') {
        res.json({ status: 400, message: 'Password is required!' })
    } else {
        next()
    }
}

function checkIfUserExist(req, res, next) {
    User.findOne({
        where: { username: req.body.username }
    }).then(result => {
        if (result === null) {
            next()
        } else {
            res.json({ status: 409, message: 'Username already exist' })
        }
    })
}

function hashGen(req, res, next) {
    const saltRounds = 10
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (hash) {
            req.hash = hash
            next()
        } else if (err) {
            // res.json({status:200, message:hash})
            console.log(err)
        }
    })
}

function register(req, res, next) {
    // Note: using `force: true` will drop the table if it already exists

    
    User.sync().then(() => {
        // Now the `users` table in the database corresponds to the model definition

        return User.create({
            username: req.body.username,
            password: req.hash
        }).then((result)=>{
            res.send(result)
        })
    })
}

function deleteUser(req, res, next) {
    if (req.params.id === null || req.params.id === undefined) {
        res.json({ status: 404, message: 'user not found' })
    }

    User.destroy({
        where: { id: req.params.id }
    }).then(function(result) {
        if (result === 0) {
            res.status(500)
            res.json({ status: 500, message: 'couldnot delete' })
        } else {
            res.status(200)
            res.json({ status: 500, message: 'User deleted successfully' })
        }
    })
}

function editUser(req, res, next){
    // if (req.params.id === null || req.params.id === undefined) {
    //     res.json({ status: 404, message: 'user not found' })
    // }

    // User.update({username: 'bethebikash'}{
    //     where: {
    //       id: req.params.id
    //     }
    //   }).then(function(result) {
    //     if (result === 0) {
    //         res.status(500)
    //         res.json({ status: 500, message: 'couldnot update' })
    //     } else {
    //         res.status(200)
    //         res.json({ status: 500, message: 'User updated successfully' })
    //     }
    // })
}

module.exports = {
    validator,
    checkIfUserExist,
    hashGen,
    register,
    deleteUser,
    editUser
}
