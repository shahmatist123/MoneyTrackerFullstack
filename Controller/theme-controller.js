const db = require("../db");
const response = require("../response");
exports.getAllThemes = (req, res) => {
    const data = req.query
    const {userId} = data
    db.connect((err, client, done) => {
        client.query(`SELECT *
                      FROM moneydb.themes where
                      "userId" in (${userId}) or "isDefaultTheme" in (true);`, (error, result) => {
            if (error) {
                response.status(400, error, res)
            } else{
                response.status(200, result.rows, res)
            }
        })
        done()
    })
}