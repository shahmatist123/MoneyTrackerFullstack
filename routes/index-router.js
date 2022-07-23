const userController = require("./../Controller/user-controller");
const tokenController = require("./../Controller/token-controller");
const mailController = require("./../Controller/mail-controller");
module.exports = (app) =>{
    app.route('/api/users/auth/signup').post(userController.signup)
    app.route('/api/users/auth/signin').post(userController.singin)
    app.route('/api/users/auth/logout').get(userController.logout)
    app.route('/api/users/auth/forget').post(mailController.forgetPassword)
    app.route('/api/forgetCheck').post(tokenController.forgetCheck)
    app.route('/api/users/auth/newPass').post(userController.newPass)
    app.route('/api/users/auth/signupAccept').post(userController.signupAccept)
}
