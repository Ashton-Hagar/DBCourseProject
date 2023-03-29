const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors()); // To enable CORS (Cross-Origin Resource Sharing)

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DBProject",
  database: "test1",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL server.");
});

app.get("/api/employees", (req, res) => {
  connection.query("SELECT * FROM employees", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
