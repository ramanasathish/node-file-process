const mysql = require('mysql');
require('dotenv').config()
let db = null;
const app = {};
app.init = () => {
    db = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port : process.env.PORT
    });
}
app.conn = () => {
    if (!db) {
        app.init();
    }

    return db;
}

module.exports = app;