const response = require('./../response')
const db = require('./../db')
const config = require('config')
const jwt = require("jsonwebtoken");
exports.checkToken = (req, res) => {
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
                    response.status(200, {message: 'Токен обновлён', AccessToken, RefreshToken}, res)
                }
            })
        }
        else{
            response.status(256, {message: "Пользователь не авторизован"}, res)
        }
    })
}
exports.forgetCheck = (req, res) => {
    const oldToken = req.body.token
    db.query("SELECT * FROM users WHERE resetpassword = '" + oldToken + "'", (error, rows, fields) => {
        if (error){
            response.status(400, error, res)
        }
        else if (rows.length > 0){
            response.status(200, {token: true,message: ""}, res)
        }
        else{
            response.status(256, {message: "Неверная ссылка"}, res)
        }
    })
}
