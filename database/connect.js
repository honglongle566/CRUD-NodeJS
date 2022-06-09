var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'Demo',
    password:'abc12345'
});
conn.connect();
module.exports=conn;