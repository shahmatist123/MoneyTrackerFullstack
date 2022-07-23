const nodemailer = require('nodemailer')
const config = require('config')
const jwt = require("jsonwebtoken");
const db = require("./../db");
const response = require("./../response");
exports.forgetPassword  = (req, res) => {
    db.query("SELECT id,email FROM users WHERE email = '" + req.body.email + "'", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res)
        } else if (rows.length <= 0) {
            response.status(250, {message: 'Пользователь с данным email не зарегистрирован'}, res)
        } else {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                    const RefreshToken = jwt.sign({
                        email: rw.email
                    }, config.get('jwtKey'), {expiresIn: '30d'})
                    let updateTokenQuery = `UPDATE users SET resetpassword = "${RefreshToken}" WHERE email = "${rw.email}"`
                    db.query(updateTokenQuery, (error,result) =>{
                        if (error) {
                            response.status(400, error, res)
                        } else {

                            response.status(200, {message: 'На ваш email отправлено письмо для смены пароля'}, res)
                            let transporter = nodemailer.createTransport(config.get('email'));
                            let message = {
                                from: config.get('email').user,
                                to: req.body.email,
                                subject: 'Смена пароля',
                                text: ``,
                                html: `Для восстановления пароля перейдите по данной ссылке <br><br><br> ${config.get('clientUrl') + 'reset-password/' + RefreshToken}`
                            };


                            transporter.sendMail(message, (err, info) => {
                                if (err) {
                                    console.log('Error occurred. ' + err.message);
                                    return process.exit(1);
                                }
                            });
                        }
                    })
                return true
            })
        }
    })
        // Create a SMTP transporter object

}
