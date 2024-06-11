const mysql = require('mysql')

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reviewdb",
    port: 3307
});

conn.connect(function(err){
    if (err) throw err;
    console.log("Berhasil terkoneksi ke database");
});

module.exports = conn;