const moneyFavoriteController = require("../Controller/money-favorite-controller")
module.exports = (app) =>{
    app.route('/api/money/favorite/ticket-items').put(moneyFavoriteController.addToFavorite)
    app.route('/api/money/favorite/edit-rating').put(moneyFavoriteController.editRating)
}