const response = require('./../response')
const db = require('./../db')
exports.add = (req, res) => {
    const data = req.body
    const arrayToString = (array) => {
        if (!array || !Array.isArray(array)) {
            return array
        }
        return array.join(" ")
    }
    const date = new Date();
    const fullDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    let addMoney = `INSERT INTO List (Name, Category, Market, userId, Summ, Date) 
                    VALUES 
                    ("${data.msg}", "${arrayToString(data.category)}", "${data.market}", "1", "${data.summ}", 
                    "${fullDate}")`
    db.query(addMoney, (error, result) => {
        if (error) {
            response.status(400, error, res)
        } else {
            response.status(200, {message: 'Добавлено', data}, res)
        }
    })
}

exports.getMoneyPerMouth = (req, res) => {
    const data = req.query
    const month = data.month
    let getMoney = "SELECT * FROM List WHERE UserId = 1"
    db.query(getMoney, (error, result) => {
        if (error) {
            response.status(400, error, res)
        } else {
            result = result.filter(item => item.Date.split('.')[1] === month)
            response.status(200, {message: 'Покупки загружены', result}, res)
        }
    })
}
