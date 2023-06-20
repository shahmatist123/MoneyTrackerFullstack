const moneyController = require("./../Controller/money-controller");
module.exports = (app) =>{
    app.route('/api/money/add').post(moneyController.add)
    app.route('/api/money/add-file').post(moneyController.addFile)
    app.route('/api/money/get-money-per-mouth').get(moneyController.getMoneyPerMouth)
    app.route('/api/money/get-ticket-items').get(moneyController.getTicketItems)
    app.route('/api/money/set-favorite-ticket-items').get(moneyController.setFavorite)
    app.route('/api/money/delete-ticket').delete(moneyController.deleteTicket)
    app.route('/api/money/delete-purchase').delete(moneyController.deletePurchase)
    app.route('/api/money/set-ticket-items-for-user').post(moneyController.setTicketItemsForUser)
    app.route('/api/money/get-ticketitems-from-period').get(moneyController.getTicketItemsFromPeriod)
}
