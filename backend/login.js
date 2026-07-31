const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./database");

const router = express.Router();

const SECRET = "CHANGE_THIS_TO_A_LONG_RANDOM_SECRET";

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    db.get(
        "SELECT * FROM admins WHERE username=?",
        [username],

        (err, admin) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Username"
                });
            }

            bcrypt.compare(password, admin.password, (err, match) => {

                if (!match) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid Password"
                    });
                }

                const token = jwt.sign(

                    {
                        id: admin.id,
                        username: admin.username
                    },

                    SECRET,

                    {
                        expiresIn: "7d"
                    }

                );

                res.json({

                    success: true,
                    token

                });

            });

        }

    );

});

module.exports = router;