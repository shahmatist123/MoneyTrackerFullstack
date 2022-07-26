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
                    VALUES ('${data.msg}', '${types.arrayToString(data.category)}', '${data.market}', '1', '${data.summ}
                            ',
                            '${fullDate}')`
    db.connect((err, client, done) => {
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
                const resultObj = result?.length && JSON.parse(result)
                const date = new Date(resultObj.localDateTime)
                const month = date.getMonth()
                const year = date.getFullYear()
                const day = date.getDate()
                const market = resultObj.user
                const summ = resultObj.totalSum


                db.connect((err, client, done) => {
                    client.query(`INSERT INTO moneydb.tickets ("userId", year, month, day, market, summ)
                                  VALUES ('1', '${year}', '${month}', ${day}, '${market}', ${summ})
                                  RETURNING id;`, (error, result) => {
                        let ticketId = result.rows[0].id;
                        if (error) {
                            response.status(400, error, res)
                            return
                        }
                        if (ticketId) {
                            let errorItems
                            resultObj?.items.forEach(ticketItem => {
                                client.query(`INSERT INTO moneydb.ticketitems (name, price, summ, quantity, "ticketId")
                                              VALUES ('${ticketItem.name}', ${ticketItem.price}, ${ticketItem.sum},
                                                      '${ticketItem.quantity}', ${ticketId});`, (error) => {
                                    if (error) {
                                        errorItems = error
                                    }
                                })
                            })
                            if (errorItems) {
                                response.status(400, errorItems, res)
                            } else {
                                response.status(200, {message: 'Добавлено', data}, res)
                            }
                        }
                    })
                    done()
                })
            })
        }
        if (Object.keys(files).length === 0) {
            response.status(400, {message: 'Файл не найден'}, res)
        }
    })
}

exports.getMoneyPerMouth = (req, res) => {
    const data = req.query
    const month = data.month
    const year = data.year + ""
    const userId = data?.userId || 1
    let purchaseList
    let tickets
    db.connect((err, client, done) => {
        client.query(`SELECT *
                      FROM moneydb.purchaselist
                      where userid in (${userId})
                        AND date LIKE '%${month}.${year}%';`, (error, result) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
            } else {
                purchaseList = result.rows
                client.query(`Select *
                      from moneydb.tickets
                      where year IN ('${year}')
                        AND month IN ('${month-1}')
                        AND "userId" IN (${userId})`, (error, result) => {
                    if (error) {
                        console.log(error)
                        response.status(400, error, res)
                    } else {
                        tickets = result.rows
                        const allDays = new Set([...tickets.map(ticket => ticket.day), ...purchaseList.map(list => list.date.split(".")[0])])
                        const moneyItems = {}
                        allDays.forEach(day => {
                            const currentPurchases = purchaseList.filter(list => list.date.split(".")[0] === day)
                            const currentTickets = tickets.filter(ticket => ticket.day === day)
                            moneyItems[day] = {purchases: currentPurchases, tickets: currentTickets}
                        })
                        response.status(200, moneyItems, res)
                    }
                    done()
                })
            }
        })
    })
}
exports.getTicketItems = (req, res) => {
    const data = req.query
    const ticketId = data.ticketId
    db.connect((err, client, done) => {
        client.query(`SELECT *
                      FROM moneydb.ticketitems
                      where "ticketId" in (${ticketId});`, (error, result) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
            } else{
                response.status(200, result.rows, res)
            }
        })
    })
}