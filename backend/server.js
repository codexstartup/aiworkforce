const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
// Store data once (outside routes)
const employees = [
    {
        id: 1,
        name: "AI Customer Support",
        status: "Coming Soon",
        category: "Support"
    },
    {
        id: 2,
        name: "AI Sales Manager",
        price: 199,
        currency: "USD",
        status: "Available",
        category: "Sales"
    },
    {
        id: 3,
        name: "AI Data Analyst",
        price: 149,
        currency: "USD",
        status: "Available",
        category: "Analytics"
    },
    {
        id: 4,
        name: "AI Market Researcher",
        price: 179,
        currency: "USD",
        status: "Available",
        category: "Research"
    }
];

app.get("/", (req, res) => {
    res.send("AI Workforce Backend Running 🚀");
});

app.get("/employees", (req, res) => {
    res.json(employees);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});