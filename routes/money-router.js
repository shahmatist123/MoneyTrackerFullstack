const moneyController = require("./../Controller/money-controller");
module.exports = (app) =>{
    app.route('/api/money/add').post(moneyController.add)
    app.route('/api/money/add-file').post(moneyController.addFile)
    app.route('/api/money/get-money-per-mouth').get(moneyController.getMoneyPerMouth)
    app.route('/api/money/get-ticket-items').get(moneyController.getTicketItems)
}
