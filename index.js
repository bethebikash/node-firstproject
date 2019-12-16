const express = require('express')
const parcer = require('body-parser')
const User = require('./models/User')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')

const app = express()

app.use(parcer.urlencoded({ extended: true }))

app.post(
    '/registration',
    UserController.validator,
    UserController.checkIfUserExist,
    UserController.hashGen,
    UserController.register
)

app.post('/profile', upload.single('profileImg'), function(req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})

app.post('/login', AuthController.validator, AuthController.passwordCheck, AuthController.genToken)
app.delete('/user/:id', AuthController.varifyToken, UserController.deleteUser)



app.listen(5033)


