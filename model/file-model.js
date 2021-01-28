const db = require('../database');
const app = {};

app.bulkInsert = (insertArr) => {
    return new Promise((resolve) => {
        const connection = db.conn();
        let statement = `INSERT INTO products(id,name,quantity,price,manufacturer)  VALUES ?`;
        connection.query(statement, [insertArr], (err, results) => {
            if (err) {
                console.error(err.message);
                resolve({ done: false });
                return;
            }
            resolve({ done: true,affecteRows:results.affectedRows })
        });
    });
}

module.exports = app;