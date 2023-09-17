const config = require('config');
const express = require('express')
const { Telegraf } = require('telegraf')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const bodyParser = require('body-parser')
// const passport = require('passport')
// app.use(passport.initialize())
// require('./middleware/passport')(passport)

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const routes = require('./routes/index-router')
routes(app)
const moneyRoutes = require('./routes/money-router')
moneyRoutes(app)
const favoriteRoutes = require('./routes/money-favorite-router')
favoriteRoutes(app)
const themeRoutes = require('./routes/theme-router')
themeRoutes(app)
const categoryRoutes = require('./routes/category-router')
categoryRoutes(app)
const calendarUserRoutes = require('./routes/calendar-user-router')
calendarUserRoutes(app)
const statisticRoutes = require('./routes/statistic-router')
// statisticRoutes(app)
const axios = require("axios");
const {addFileForTelegram} = require("./Controller/money-controller");
app.listen(port, () =>{
    console.log(`App listen on port: ${port}`)
})
if (process.env.NODE_ENV !== 'dev') {
    const token = config.get('TELEGRAM')
    const bot = new Telegraf(token) //сюда помещается токен, который дал botFather
    bot.start((ctx) => ctx.reply('Здарова, показывай сколько потратил')) //ответ бота на команду /start
    bot.help((ctx) => ctx.reply('Send me a sticker')) //ответ бота на команду /help
    bot.on('sticker', (ctx) => ctx.reply('')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
    bot.on('message', async (ctx) => {
        const {message} = ctx
        if (message.document) {
            const {document} = message
            axios.get(`https://api.telegram.org/bot${token}/getFile?file_id=${document.file_id}`).then((req, res) => {
                axios.get(`https://api.telegram.org/file/bot${token}/${req.data.result.file_path}`).then((req, res) => {
                    addFileForTelegram(req, res, ctx)
                }).catch(() => {
                    ctx.reply('Сервер сдох 1')
                })
            }).catch(() => {
                ctx.reply('Сервер сдох 2')
            })
        }
    }) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
    bot.launch() // запуск бота
}