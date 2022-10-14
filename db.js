const config = require('config');
const {Pool} = require('pg')

const db = new Pool(config.get('db'))

module.exports = db

