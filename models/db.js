let mysql = require('mysql');

let keys = require('../config/keys')
let connection = mysql.createPool({
  host: keys.mysql.host,
  user: keys.mysql.user,
  password: keys.mysql.password,
  database: keys.mysql.db
});

module.exports = connection;