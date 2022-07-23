const express = require('express')
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
const moneyRoutes = require('./routes/money-router')
routes(app)
moneyRoutes(app)
app.listen(port, () =>{
    console.log(`App listen on port: ${port}`)
})
