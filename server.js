require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});
app.get("/test", (req, res) => {
  const q = `SELECT * FROM user`;
  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Backend server is running");
});
