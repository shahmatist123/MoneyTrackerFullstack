const response = require('./../response')
const db = require('./../db')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require("jsonwebtoken");
const validator = require("validator")
const nodemailer = require("nodemailer");


exports.signup = (req, res) => {

    db.query("SELECT * FROM users WHERE email = '" + req.body.email + "'", (error, rows, fields) => {
        const emailIsValid = validator.isEmail(req.body.email)
        const passwordLength = req.body.password.length
        if (error) {
            response.status(400, error, res)
        } else if (typeof rows !== 'undefined' && rows.length > 0) {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                response.status(250, {message: "Пользователь с данным email уже зарегистрирован"}, res)
                return true
            })
        } else if (!emailIsValid) {
            response.status(250, {message: "Введите корректный email"}, res)
        } else if (passwordLength < 8) {
            response.status(250, {message: "Длина пароля должна быть не менее 8 символов"}, res)
        } else {
            const sql = 'INSERT INTO users(email, password, reglink) VALUES(?, ?, ?)'

            const RefreshToken = jwt.sign({
                email: req.body.email
            }, config.get('jwtKey'), {expiresIn: '30d'})

            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(req.body.password, salt, config.get('bcriptStr'))
            const user = [req.body.email, hashedPassword,RefreshToken]


            let transporter = nodemailer.createTransport(config.get('email'));
            let message = {
                from: config.get('email').user,
                to: req.body.email,
                subject: 'Активация аккаунта',
                text: ``,
                html: `Для активации аккаунта перейдите по данной ссылке <br><br><br> ${config.get('clientUrl') + 'signup/' + RefreshToken}`
            };


            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }
            });

            db.query(sql, user, (error, results) => {
                if (error) {
                    response.status(400, error, res)
                } else {
                    response.status(201, {message: "Вы зарегистрированы! \n Зайдите на ваш email и активируйте аккаунт!", results}, res)
                }
            })
        }
    })
}

exports.signupAccept = (req, res) => {
    db.query("SELECT * FROM users WHERE reglink = '" + req.body.token + "'", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res)
        } else if ( rows.length > 0) {
                const AccessToken = jwt.sign({
                    email: req.body.email
                }, config.get('jwtKey'), {expiresIn: 14400})
                const RefreshToken = jwt.sign({
                    email: req.body.email
                }, config.get('jwtKey'), {expiresIn: '30d'})
                const user = [RefreshToken, AccessToken, null, 1]
                const sql = `UPDATE users SET token = "${AccessToken}", refreshtoken = "${RefreshToken}", resetpassword = null, isverified = 1, reglink = null WHERE reglink = "${req.body.token}"`
                db.query(sql, user, (error, results) => {
                    if (error) {
                        response.status(400, error, res)
                    } else {
                        response.status(201, {message: "Вы активировали свой аккаунт!", results, AccessToken, RefreshToken}, res)
                    }
                })
        } else {
           response.status(250, {message: 'Неверная ссылка'}, res)
        }
    })
}


exports.singin = (req, res) => {
    db.query("SELECT id,email,password, isverified FROM users WHERE email = '" + req.body.email + "'", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res)
        } else if (rows.length <= 0) {
            response.status(250, {message: 'Неверные данные для входа'}, res)
        }else if(!rows[0].isverified){
            response.status(250, {message: 'Пожалуйста активируйте аккаунт'}, res)
        } else {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                const password = bcrypt.compareSync(req.body.password, rw.password)
                if (password) {
                    const AccessToken = jwt.sign({
                        email: rw.email
                    }, config.get('jwtKey'), {expiresIn: 14400})
                    const RefreshToken = jwt.sign({
                        email: rw.email
                    }, config.get('jwtKey'), {expiresIn: '30d'})
                    let updateTokenQuery = `UPDATE users SET token = "${AccessToken}", refreshtoken = "${RefreshToken}" WHERE email = "${rw.email}"`
                    db.query(updateTokenQuery, (error,result) =>{
                        if (error) {
                            response.status(400, error, res)
                        } else {
                            response.status(200, {message: 'Успешная авторизация!', AccessToken, RefreshToken}, res)
                        }
                    })

                } else {
                    response.status(250, {message: 'Неверные данные для входа'}, res)
                }

                return true
            })
        }
    })
}
exports.logout = (req,res) =>{
    const oldToken = req.headers.authorization
    db.query("SELECT * FROM users WHERE refreshtoken = '" + oldToken + "'", (error, rows, fields) => {
        if (error){
            response.status(400, error, res)
        }
        else if (rows.length > 0){

            const AccessToken = jwt.sign({
                email: rows[0].email
            }, config.get('jwtKey'), {expiresIn: "1h"})

            const RefreshToken = jwt.sign({
                email: rows[0].email
            }, config.get('jwtKey'), {expiresIn: '30d'})


            let updateTokenQuery = `UPDATE users SET token = "${AccessToken}", refreshtoken = "${RefreshToken}" WHERE email = "${rows[0].email}"`
            db.query(updateTokenQuery, (error,result) =>{
                if (error) {
                    response.status(400, error, res)
                } else {
                    response.status(200, {message: 'Токен очищен', AccessToken, RefreshToken}, res)
                }
            })
        }
        else{
            response.status(256, {message: "Пользователь не авторизован"}, res)
        }
    })
}

exports.newPass = (req,res) =>{
    const oldToken = req.body.token
    db.query("SELECT * FROM users WHERE resetpassword = '" + oldToken + "'", (error, rows, fields) => {
        if (error){
            response.status(400, error, res)
        }
        else if (rows.length > 0){
            if (req.body.password.length < 8){
                response.status(250, {message: "Длина пароля должна быть не менее 8 символов"}, res)
            }
            else{
                const AccessToken = jwt.sign({
                    email: rows[0].email
                }, config.get('jwtKey'), {expiresIn: "1h"})

                const RefreshToken = jwt.sign({
                    email: rows[0].email
                }, config.get('jwtKey'), {expiresIn: '30d'})

                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt, config.get('bcriptStr'))
                let updateTokenQuery = `UPDATE users SET token = "${AccessToken}", refreshtoken = "${RefreshToken}", resetpassword = null, password = "${hashedPassword}" WHERE email = "${rows[0].email}"`
                db.query(updateTokenQuery, (error,result) =>{
                    if (error) {
                        response.status(400, error, res)
                    } else {
                        response.status(200, {message: 'Пароль обновлён', AccessToken, RefreshToken}, res)
                    }
                })
            }
        }
        else{
            response.status(256, {message: "Пользователь не авторизован"}, res)
        }
    })
}
