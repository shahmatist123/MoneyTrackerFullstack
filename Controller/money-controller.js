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
                        (name, category_id, market, userid, summ, date)
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

                console.log(year, month, day, market, summ)
                db.connect((err, client, done) => {
                    client.query(`INSERT INTO moneydb.tickets ("userId", year, month, day, market, summ)
                                  VALUES ('1', '${year}', '${month}', ${day}, '${market}', ${summ})
                                  RETURNING id;`, (error, result) => {
                        if (error) {
                            response.status(400, error, res)
                            return
                        }
                        let ticketId = result.rows[0].id;
                        if (ticketId) {
                            let errorItems
                            resultObj?.items.forEach(ticketItem => {
                                client.query(`INSERT INTO moneydb.ticketitems (name, price, summ, quantity, "ticketId", "userId")
                                              VALUES ('${ticketItem.name}', ${ticketItem.price}, ${ticketItem.sum + ticketItem.ndsSum},
                                                      '${ticketItem.quantity}', ${ticketId}, 1);`, (error) => {
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
exports.addFileForTelegram = (req, res, ctx) => {
    const data = req.data
    const resultObj = data[0].ticket.document.receipt
    const date = new Date(resultObj.dateTime)
    const month = date.getMonth()
    const year = date.getFullYear()
    const day = date.getDate()
    const market = resultObj.user
    const summ = resultObj.totalSum

    db.connect((err, client, done) => {
        client.query(`INSERT INTO moneydb.tickets ("userId", year, month, day, market, summ)
                                  VALUES ('1', '${year}', '${month}', ${day}, '${market}', ${summ})
                                  RETURNING id;`, (error, result) => {
            if (error) {
                ctx.reply('Сервер сдох' + JSON.stringify(error))
                return
            }
            let ticketId = result.rows[0].id;
            if (ticketId) {
                let errorItems
                resultObj?.items.forEach(ticketItem => {
                    client.query(`INSERT INTO moneydb.ticketitems (name, price, summ, quantity, "ticketId", "userId")
                                              VALUES ('${ticketItem.name.split("'").join(" ")}', ${ticketItem.price}, ${ticketItem.sum},
                                                      '${ticketItem.quantity}', ${ticketId}, 1);`, (error) => {
                        if (error) {
                            errorItems = error
                        }
                    })
                })
                if (errorItems) {
                    ctx.reply('Сервер сдох' + JSON.stringify(errorItems))
                } else {
                    ctx.reply('Минус бабки(я всё сохранил)')
                }
            }
        })
        done()
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
                        AND month IN ('${month - 1}')
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
    const {ticketId, userId} = data
    db.connect((err, client, done) => {
        client.query(`SELECT *
                      FROM moneydb.ticketitems
                      where "ticketId" in (${ticketId})
                      and "userId" in (${userId});`, (error, result) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
            } else {
                response.status(200, result.rows, res)
            }
        })
        done()
    })
}
exports.setFavorite = (req, res) => {
    const data = req.query
    const {ticketId, userId} = data
    db.connect((err, client, done) => {
        client.query(`SELECT *
                      FROM moneydb.ticketitems
                      where "ticketId" in (${ticketId})
                      and "userId" in (${userId});`, (error, result) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
            } else {
                response.status(200, result.rows, res)
            }
        })
        done()
    })
}
exports.deletePurchase = (req, res) => {
    const query = `
    DELETE FROM moneydb.purchaselist
    WHERE id = $1;
  `;
    const data = req.query
    const {id} = data
    const values = [id];
    db.query(query, values).then(() => {
        response.status(200, "", res)
    }).catch((err) => {
        response.status(400, err, res)
    })
};

exports.deleteTicket = (req, res) => {
    const query1 = `
    DELETE FROM moneydb.tickets
    WHERE id = $1;
  `;
    const query2 = `
    DELETE FROM moneydb.ticketitems
    WHERE "ticketId" = $1;
  `;
    const data = req.query
    const {id} = data
    const values = [id];
    db.query(query2, values).then(() => db.query(query1, values)).then(() => {
        response.status(200, "", res)
    }).catch((err) => {
        response.status(400, err, res)
    })
};

exports.setTicketItemsForUser = async (req, res) => {
    const {calendarUserId, id} = req.body

        id.map((item) => {
                db.query(
                    'UPDATE moneydb.ticketitems SET "calendarUserId" = $1 WHERE id = $2',
                    [calendarUserId, item]
                ).then((result) => {
                    res.status(200).json(result.rows[0]);
                }).catch((err) => {
                    console.error(err);
                    res.status(500).send('Internal server error');
                })
        })
}
exports.getTicketItemsFromPeriod = async (req, res) => {
    try {
        const { startYear, endYear, startMonth, endMonth, startDay, endDay, calendarUserId } = req.query;
        const query =
            'SELECT * FROM moneydb.tickets WHERE year >= $1 AND year <= $2 AND month >= $3 AND month <= $4 AND day >= $5 AND day <= $6';
        const values = [startYear, endYear, startMonth, endMonth, startDay, endDay];
        const tickets = await db.query(query, values);

        // Retrieve ticket items for each ticket
        const ticketItemsPromises = tickets.rows.map(async (ticket) => {
            const ticketId = ticket.id;
            if (calendarUserId != 0) {
                const ticketItemsQuery = 'SELECT * FROM moneydb.ticketitems WHERE "ticketId" = $1 AND "calendarUserId" = $2';
                const ticketItems = await db.query(ticketItemsQuery, [ticketId, calendarUserId]);
                return { ...ticket, ticketItems: ticketItems.rows };
            }
            const ticketItemsQuery = 'SELECT * FROM moneydb.ticketitems WHERE "ticketId" = $1';
            const ticketItems = await db.query(ticketItemsQuery, [ticketId]);
            return { ...ticket, ticketItems: ticketItems.rows };
        });

        // Wait for all ticket items to be fetched
        const ticketsWithItems = await Promise.all(ticketItemsPromises);
        res.json(ticketsWithItems);
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.updateTicketItems = async (req, res) => {
    try {
        const newTickets = req.body.newTickets;
        newTickets.forEach(({id, summ, quantity, isAdd}) => {
            client.query(`UPDATE moneydb.tickets SET summ = ${summ}, quantity = ${quantity} WHERE id = ${id};`, (error, result) => {
                if (error) {
                    res.status(500).json({ error: 'BD ERROR' });
                    return
                }
                res.status(200).json(result.rows);
            })
        })
        done()
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}