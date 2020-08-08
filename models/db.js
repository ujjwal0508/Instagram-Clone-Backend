let mysql = require('mysql');
let connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'instagram'
});

module.exports = connection;