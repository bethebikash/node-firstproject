const express = require('express')
const parcer = require('body-parser')
const User = require('./models/User')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')

const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

const app = express()

app.use(parcer.urlencoded({ extended: true }))

const swaggerDefinition = {
    info: {
        title: 'myApplication',
        description: 'This is documentation of my app',
        version: '1.0.1'
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'authorization',
            in: 'header',
            schema: 'bearer'
        }
    },
    host: 'localhost:3000',
    basePath: '/'
}

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./index.js']
}

const swaggerSpecs = swaggerJSDoc(swaggerOptions)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

/**
 * @swagger
 * /registration:
 *  post:
 *   tags:
 *    - Users
 *   description: User registration testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: username
 *      in: formdata
 *      type: string
 *      required: true
 *      description: pleasae provide unique username
 *    - name: password
 *      in: formdata
 *      type: string
 *      required: true
 *      description: pleasae provide strong password
 *   responses:
 *    201:
 *     description: registered successfully
 *    409:
 *     description: user already exist
 *    500:
 *     description: internal server errors
 *
 */

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

app.post(
    '/login',
    AuthController.validator,
    AuthController.passwordCheck,
    AuthController.genToken
)

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *   tags:
 *    - Users
 *   security:
 *    - bearerAuth: []
 *   description: User deleting testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: pleasae provide id
 *   responses:
 *    204:
 *     description: user was deleted.
 *    400:
 *     description: not loginned
 *    500:
 *     description: internal server errors
 *
 */

app.delete('/user/:id', AuthController.verifyToken, UserController.deleteUser)

app.patch('/user/:id', AuthController.verifyToken, UserController.editUser)

app.listen(3000)
