const db = require("../db");
const response = require("../response");
exports.addToFavorite = (req, res) => {
    const data = req.body
    console.log(data)
    const {ticketItemId, userId, favorite} = data
    db.connect((err, client, done) => {
        client.query(`update moneydb.ticketitems
                      set favorite = ${favorite}
                      where "userId" in (${userId}) and "id" in (${ticketItemId});`, (error, result) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
            } else{
                response.status(200, {message: "Добавлено в избранное"}, res)
            }
        })
        done()
    })
}

exports.editRating = (req, res) => {
    const data = req.body
    console.log(data)
    const {ticketItemId, userId, rating} = data
    db.connect((err, client, done) => {
        client.query(`update moneydb.ticketitems
                      set rating = ${rating}
                      where "userId" in (${userId}) and "id" in (${ticketItemId});`, (error, result) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
            } else{
                response.status(200, {message: "Рейтинг изменён"}, res)
            }
        })
        done()
    })
}