const response = require('./../response')
const db = require('./../db')
const time = require("../helpers/time");
const types = require("../helpers/types");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

exports.add = (req, res) => {
    const data = req.body
    const fullDate = time.fullDateHelper()
    let addMoney = `INSERT INTO moneydb.purchaselist
                    (name, category, market, userid, summ, date) 
                    VALUES 
                    ('${data.msg}', '${types.arrayToString(data.category)}', '${data.market}', '1', '${data.summ}', 
                    '${fullDate}')`
    db.connect((err,client,done) => {
        client.query(addMoney, (error, result) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
            } else {
                response.status(200, {message: 'Добавлено', data}, res)
            }
            done()
        })
    })
}

exports.addFile = (req, res) => {
    const data = req.body
    new formidable.IncomingForm({keepExtensions: true}).parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error', err)
            throw err
        }
        for (const file of Object.entries(files)) {
            fs.readFile(file[1].filepath, {encoding: 'utf8'}, (error, result) => {
                if (err) {
                    console.error('Error', err)
                    throw err
                }
                db.connect((err,client,done) => {
                    client.query(`INSERT INTO moneydb.tickets (ticket, userid) VALUES ('${result}', '1');`, (error, result) => {
                        if (error) {
                            response.status(400, error, res)
                        } else {
                            response.status(200, {message: 'Добавлено', data}, res)
                        }
                    })
                    done()
                })
            })
        }
        if (Object.keys(files).length === 0) {
            response.status(200, {message: 'Файл не найден'}, res)
        }
    })
}

exports.getMoneyPerMouth = (req, res) => {
    const data = req.query
    const month = data.month
    let purchaseList
    db.connect((err,client,done) => {
        client.query('SELECT * FROM moneydb.purchaselist;', (error, result) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
            } else {
                purchaseList = result.rows.filter(item => item.date.split('.')[1] === month)
            }
        })
        client.query('SELECT * FROM moneydb.tickets;', (error, result) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
            } else {
                let tickets = result.rows.map(item => item.ticket)
                response.status(200, {message: 'Покупки загружены', tickets, purchaseList}, res)
            }
            done()
        })
    })
}
