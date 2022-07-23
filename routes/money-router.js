const moneyController = require("./../Controller/money-controller");
module.exports = (app) =>{
    app.route('/api/money/add').post(moneyController.add)
    app.route('/api/money/getmoneypermouth').get(moneyController.getMoneyPerMouth)
}
