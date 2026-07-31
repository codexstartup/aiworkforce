const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./aiworkforce.db", (err) => {

    if (err) {
        console.error(err.message);
    } else {
        console.log("✅ Connected to AI Workforce Database");
    }

});

// EMPLOYEES TABLE
db.run(`
CREATE TABLE IF NOT EXISTS employees(

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL,

price INTEGER,

currency TEXT,

status TEXT,

category TEXT

)
`);

// ADMIN TABLE
db.run(`
CREATE TABLE IF NOT EXISTS admins(

id INTEGER PRIMARY KEY AUTOINCREMENT,

username TEXT UNIQUE,

password TEXT

)
`);

module.exports = db;