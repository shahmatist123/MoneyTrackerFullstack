const db = require("../db");
const response = require("../response");
exports.baseStatistic = (req, res) => {
    const data = req.body
    const {ticketItemId, userId, favorite} = data
    db.connect((err, client, done) => {
        client.query(`update moneydb.ticketitems
                      set favorite = ${favorite}
                      where "userId" in (${userId}) and "id" in (${ticketItemId});`, (error, result) => {
            if (error) {
                response.status(400, error, res)
            } else{
                response.status(200, {message: "Добавлено в избранное"}, res)
            }
        })
        done()
    })
}
