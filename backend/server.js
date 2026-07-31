const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const db = require("./database");
const loginRoutes = require("./login");

const app = express();

const SECRET = require("./config");

app.use(cors());
app.use(express.json());
app.use(loginRoutes);

function verifyToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET, (err, user) => {

        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        req.user = user;

        next();

    });

}

app.get("/", (req, res) => {
    res.send("AI Workforce Backend Running 🚀");
});

// GET EMPLOYEES
app.get("/employees", verifyToken, (req, res) => {

    db.all("SELECT * FROM employees", [], (err, rows) => {

        if (err) {
            return res.status(500).json(err.message);
        }

        res.json(rows);

    });

});

// ADD EMPLOYEE
app.post("/employees", verifyToken, (req, res) => {

    const { name, price, currency, status, category } = req.body;

    db.run(

        `INSERT INTO employees
        (name, price, currency, status, category)
        VALUES (?, ?, ?, ?, ?)`,

        [name, price, currency, status, category],

        function(err){

            if(err){
                return res.status(500).json(err.message);
            }

            res.json({
                success:true,
                id:this.lastID
            });

        }

    );

});

// UPDATE EMPLOYEE
app.put("/employees/:id", verifyToken, (req, res) => {

    const { name, price, currency, status, category } = req.body;

    db.run(

        `UPDATE employees
        SET
        name=?,
        price=?,
        currency=?,
        status=?,
        category=?
        WHERE id=?`,

        [name, price, currency, status, category, req.params.id],

        function(err){

            if(err){
                return res.status(500).json(err.message);
            }

            res.json({
                success:true,
                updated:this.changes
            });

        }

    );

});

// DELETE EMPLOYEE
app.delete("/employees/:id", verifyToken, (req, res) => {

    db.run(

        "DELETE FROM employees WHERE id=?",

        [req.params.id],

        function(err){

            if(err){
                return res.status(500).json(err.message);
            }

            res.json({
                success:true,
                deleted:this.changes
            });

        }

    );

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});